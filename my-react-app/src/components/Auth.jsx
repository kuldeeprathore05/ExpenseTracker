import React, { useState } from "react";
import { API_URL } from "../constants";
import { DollarSign } from "lucide-react";
export default function Auth({ onAuth }) {
  const [mode, setMode] = useState("signin"); 
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "signin" ? "signin" : "signup";
      const res = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "signin" ? { email: form.email, password: form.password } : form),
      });
      const data = await res.json(); 
      if (!res.ok) {
        setError(data.message || "Auth failed");
      } else {
        localStorage.setItem("token", data.token);
        onAuth(data.user, data.token);
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <DollarSign className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
            <p className="text-gray-600 mt-2">Manage your finances effectively</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                mode === 'signin'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sign In 
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                mode === 'signup'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
              minLength={6}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
 
  );
}
