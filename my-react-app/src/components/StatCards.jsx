import React from 'react'
import { DollarSign,TrendingUp,Calendar } from 'lucide-react'

export default function StatCards({stats}){
    console.log(stats)
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Expenses</p>
                        <p className="text-3xl font-bold text-gray-900">{stats?.expenseTotal?.toFixed(2)||'0.00' }</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-indigo-600 opacity-20"></DollarSign>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Income</p>
                        <p className="text-3xl font-bold text-gray-900">{stats?.incomeTotal?.toFixed(2)||'0.00' }</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-indigo-600 opacity-20"></DollarSign>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        < p className="text-gray-500 text-sm">Total Transaction</p>
                        <p className="text-3xl font-bold text-gray-900">{stats?.count||'0' }</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-indigo-600 opacity-20"></TrendingUp>
                </div>
            </div>

           <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Net Balance</p>
                        <p
                            className={`text-3xl font-bold ${
                            stats?.balance < 0 ? 'text-red-600' : 'text-green-600'
                            }`}
                        >
                            ₹{Math.abs(stats?.balance ?? 0).toFixed(2)}
                        </p>
                    </div>
                    <Calendar className="w-12 h-12 text-indigo-600 opacity-20" />
                </div>
            </div>

        </div>

    )
}