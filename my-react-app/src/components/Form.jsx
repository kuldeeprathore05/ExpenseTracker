import React, { useState, useEffect } from "react";
import { API_URL, incomeCategories,expenseCategories } from "../constants";
import toast,{Toaster} from "react-hot-toast";
export default function Form({ token, existing, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    description: "",
    type: "expense",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || "",
        amount: existing.amount || "",
        category: existing.category || "Food",
        date: existing.date
          ? new Date(existing.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0], 
        type: existing.type || "expense",
      });
    }
  }, [existing]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.amount || !form.category) {
      setError("Please fill required fields");
      return;
    }
    setLoading(true);
    try {
        
      const url = existing
        ? `${API_URL}/transaction/${existing._id}`
        : `${API_URL}/transaction`;
        console.log(url);
      const method = existing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data)
      if (!res.ok) setError(data.message || "Failed");
      else onSaved();
      if(existing) toast.success("Transaction updated!");
      else toast.success("Transaction added!");
    } catch {
      setError("Server error");
      toast.error("Transaction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inset-0 bg-opacity-40 flex items-center justify-center p-3 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {existing ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <p className="text-xs text-gray-500">
            {existing ? "Update transaction details" : "Track your income or expense"}
          </p>
        </div>
 
        <form onSubmit={submit} className="px-4 py-4 space-y-3 text-sm">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              placeholder="e.g., Grocery"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-sm"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {(form.type === "income" ? incomeCategories : expenseCategories).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {["expense", "income"].map((t) => (
                <label
                  key={t}
                  className={`flex-1 text-center py-2 border-2 rounded-md cursor-pointer text-sm font-medium transition-all ${
                    form.type === t
                      ? t === "expense"
                        ? "border-red-400 bg-red-50 text-red-700"
                        : "border-green-400 bg-green-50 text-green-700"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={form.type === t}
                    onChange={() => setForm({ ...form, type: t })}
                    className="hidden"
                  />
                  {t === "expense" ? "💸 Expense" : "💰 Income"}
                </label>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>

           
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-xl flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 text-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 text-sm disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : existing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
