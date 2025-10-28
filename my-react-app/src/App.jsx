import React, { useEffect,useState } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import ChartSection from './components/ChartSection';
import ExpenseTable from './components/ExpenseTable'; 
import toast, { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';
import Form from './components/Form';
import Swal from 'sweetalert2';
import { API_URL } from "./constants"; 
import { LayoutDashboard, BarChart3, History } from 'lucide-react';
export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [stats,setStats] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
    Swal.fire({
      title: 'Delete this expense?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/transaction/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }); 
          if (!res.ok) throw new Error("Failed to delete transaction");
          toast.success("Transaction deleted!");
          setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    
          fetchStats();
        } catch (err) { 
          toast.error("Failed to delete transaction");
        }
      }
      else return 
    });
    
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

   const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'charts', label: 'Charts', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
  ];



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
      <main
        className={`w-full transition-all duration-300 ${
    showForm ? 'blur-sm pointer-events-none select-none' : ''
  }`}
      >
        <div className="w-full bg-white shadow-sm sticky top-16 z-10">
            <nav className="flex  ">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-12">
          {activeTab === 'dashboard' && (
            <div className=" mt-12 ">
              <div className="flex justify-center items-center mb-6">
                <button
                  onClick={openAddDialog}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  + Add Transaction
                </button>
              </div>
              <StatCards stats={stats} />
            </div>
          )}

          {activeTab === 'charts' && (
            <div>
              <ChartSection stats={stats} />
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <ExpenseTable
                expenses={expenses}
                handleEdit={openEditDialog}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>

        
      </main>

      {showForm && (
        <div className="inset-0 fixed top-16 backdrop-blur-md bg-white/10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Form
              token = {token}
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
