import React from "react";
import {DollarSign ,LogOut} from 'lucide-react'
export default function Header({user,logout}){
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user.name}</span>
                        <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                        <LogOut size={18} />
                        Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}