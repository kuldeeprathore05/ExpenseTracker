import React from "react";
import {DollarSign ,LogOut} from 'lucide-react'
export default function Header({user,logout}){
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-indigo-600"/>
                        <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Welcome, {user.name}</span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            <LogOut className="w-4 h-4"></LogOut>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}