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
    ? Object.entries(stats.monthlyData).map(([name, value]) => ({ name, value }))
    : [];

//   if (categoryChartData.length === 0) return null;

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

        

      {/* <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" name="Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}
