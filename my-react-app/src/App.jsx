import React, { useEffect,useState } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import ChartSection from './components/ChartSection';
import ExpenseTable from './components/ExpenseTable'; 
import Auth from './components/Auth';
import Form from './components/Form';
import { API_URL } from "./constants";
export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [stats,setStats] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) checkAuth();
  }, [token]);

  const checkAuth = async () => {
    try { 
      const res = await fetch(`${API_URL}/auth/me`, { headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        fetchExpenses();
        fetchStats();
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  };
  const onAuth = (userObj, tok) => { 
    setUser(userObj);
    setToken(tok); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setExpenses([]);
    setStats(null);
  }; 
  const fetchStats = async ()=>{
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/transaction/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      }); 
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      // console.log(data)
      setStats(data); 
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  }

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/transaction`, {
        headers: { Authorization: `Bearer ${token}` },
      }); 
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      setExpenses(data.transactions || []);  
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/transaction/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }); 
      if (!res.ok) throw new Error("Failed to delete transaction");
 
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
 
      fetchStats();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert("Failed to delete transaction. Please try again.");
    }
  };


  const openAddDialog = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const openEditDialog = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const closeDialog = () => setShowForm(false);
  const handleSaved = (savedExpense) => {
    setShowForm(false);  

    fetchExpenses();
    fetchStats();
  };


  if(!user){
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Auth onAuth={onAuth} />
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-gray-50"> 
      <Header user={user} logout={logout} />
      <main className={`pt-20 max-w-7xl mx-auto px-4 py-8 sm:px-6 transition-all duration-300 lg:px-8 ${
  showForm ? 'blur-sm pointer-events-none select-none' : ''
}`}>
        <div className="flex justify-center items-center mb-6">
          
          <button
            onClick={openAddDialog}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            + Add Expense
          </button>
        </div>
        
        <StatCards stats={stats} />
        <ChartSection stats={stats} />
         <ExpenseTable expenses={expenses} handleEdit={openEditDialog} handleDelete={handleDelete} />
      </main>
      {showForm && (
          <div className=" inset-0  fixed top-16 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
              <Form
                token={token}
                existing={editingExpense}
                onClose={closeDialog}
                onSaved={handleSaved}
              />
            </div>
          </div>
        )}
    </div>
  );
}
