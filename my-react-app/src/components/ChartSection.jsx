import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { COLORS } from '../constants';

export default function ChartSection({ stats }) { 
  const expenseData = Object.entries(stats?.categoryStats || {})
    .filter(([_, val]) => val.expense > 0)
    .map(([key, val]) => ({
      name: key,
      value: val.expense,
    }));

  const incomeChartData = Object.entries(stats?.categoryStats || {} )
  .filter(([_, stats]) => stats.income > 0)
  .map(([name, stats]) => ({
    name,
    value: stats.income
  }));

  const hasExpenseData = expenseData.length > 0;
  const hasIncomeData = incomeChartData.length > 0;

  const monthlyChartData = stats?.monthlyData
    ? Object.entries(stats.monthlyData).map(([month, values]) => ({
        month,
        income: values.income || 0,
        expense: values.expense || 0,
      }))
    : [];

  const hasMonthlyExpense = monthlyChartData.some(item => item.expense > 0);
  const hasMonthlyIncome = monthlyChartData.some(item => item.income > 0);  
 

  return (
    <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> 

      {hasExpenseData &&
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Expense Distribution by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`₹${value}`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      }
      
      {hasIncomeData &&
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Income Distribution by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeChartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {incomeChartData.map((entry, index) => (
                  <Cell key={`income-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      } 
      {hasMonthlyExpense && 
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Expense vs Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      }
        
      {hasMonthlyIncome && 
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Income vs Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" name="Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      }
     

    </div>
  );
}
