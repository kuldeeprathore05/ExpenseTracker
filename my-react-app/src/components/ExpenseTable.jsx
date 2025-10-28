import React, { useState } from 'react';
import { Edit2, Trash2, DollarSign, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { COLORS, expenseCategories, incomeCategories } from '../constants';

const getCategoryColor = (category, type) => {
    let index;
    if (type === 'income') {
        index = incomeCategories.indexOf(category);
    } else {
        index = expenseCategories.indexOf(category);
    }
    return COLORS[index >= 0 ? index % COLORS.length : 0];
};

export default function ExpenseTable({ expenses, handleEdit, handleDelete }) {
    const [searchTerm, setSearchTerm] = useState('');
 
    const filteredExpenses = expenses.filter(exp =>
        exp?.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden"> 
            <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-b border-gray-200 gap-3">
                <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
 
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
 
            <div className="overflow-x-auto">
                {filteredExpenses.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>No matching transactions found.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredExpenses.map((expense, index) => (
                                <tr key={expense?._id || index} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{expense?.title}</div>
                                        {expense?.description && (
                                            <div className="text-sm text-gray-500">{expense?.description}</div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {expense?.type === 'income' ? (
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-600" />
                                            )}
                                            <span
                                                className={`text-sm font-semibold ${
                                                    expense?.type === 'income'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                ₹{expense?.amount.toFixed(2)}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                        <span
                                            className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white"
                                            style={{ backgroundColor: getCategoryColor(expense?.category) }}
                                        >
                                            {expense?.category}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                        {new Date(expense?.date).toLocaleDateString('en-IN')}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(expense?._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
