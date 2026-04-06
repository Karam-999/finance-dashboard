"use client";

import { useFinance } from "../context/FinanceContext";

export default function InsightsSection() {
  const { transactions } = useFinance();


  const incomeTxs = transactions.filter((t) => t.type === "income");
  const expenseTxs = transactions.filter((t) => t.type === "expense");

  const totalIncome = incomeTxs.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(expenseTxs.reduce((sum, t) => sum + t.amount, 0));

  const expenseByCategory = expenseTxs.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});

  let highestCategory = "N/A";
  let highestAmount = 0;

  for (const [category, amount] of Object.entries(expenseByCategory)) {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  }

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Insights:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-1">Highest Spending Category</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-900">{highestCategory}</span>
            <span className="text-sm text-blue-700">(Rs. {highestAmount.toLocaleString()})</span>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-800 mb-1">Expenses vs Income</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-900">
              {totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(1) : 0}%
            </span>
            <span className="text-sm text-green-700">of income spent</span>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm font-medium text-purple-800 mb-1">Net Savings Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-900">{savingsRate.toFixed(1)}%</span>
            <span className="text-sm text-purple-700">saved overall</span>
          </div>
        </div>
      </div>
    </div>
  );
}
