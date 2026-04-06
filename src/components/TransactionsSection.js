"use client";

import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function TransactionsSection() {
  const { transactions, role, addTransaction, filters, updateFilter } = useFinance();

  const [newTx, setNewTx] = useState({ date: "", amount: "", category: "", type: "expense" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.date || !newTx.amount || !newTx.category) return;
    addTransaction(newTx);
    setNewTx({ date: "", amount: "", category: "", type: "expense" });
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchType = filters.type === "all" || t.type === filters.type;
    const matchSearch = t.category.toLowerCase().includes(filters.category.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Transactions</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by categories..."
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {role === "admin" && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <input
              type="date"
              required
              value={newTx.date}
              onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Amount"
              required
              value={newTx.amount}
              onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Category"
              required
              value={newTx.category}
              onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <select
              value={newTx.type}
              onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium rounded-md px-3 py-2 text-sm hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        {filteredTransactions.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3 min-w-[100px] text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{t.category}</td>
                  <td className="px-6 py-4 capitalize">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    t.type === 'income' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    Rs. {Math.abs(t.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No transactions found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
