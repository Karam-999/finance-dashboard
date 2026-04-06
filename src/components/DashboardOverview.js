"use client";

import { useFinance } from "../context/FinanceContext";
import { toast } from "sonner"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  scales,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register( // this will register all the components of chart.js. this registering is necessary for the charts to work.
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function DashboardOverview() {
  const { transactions } = useFinance();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: [
          "#ef4444", 
          "#f97316", 
          "#f59e0b", 
          "#84cc16", 
          "#10b981", 
          "#06b6d4", 
          "#3b82f6", 
          "#8b5cf6", 
          "#d946ef", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
    },
  };

  const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;
  const balanceHistory = sortedTx.map((t) => {
    runningBalance += t.amount;
    return runningBalance;
  });

  const lineData = {
    labels: sortedTx.map((t) => t.date),
    datasets: [
      {
        label: "Balance",
        data: balanceHistory,
        borderColor: "#3b82f6", 
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  const option = {
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        ticks: {
          beginAtZero: true,
        },
        max:totalIncome
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="text-3xl font-bold text-gray-900">Welcome, Karam</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500">Total Balance</span>
          <span className={`text-3xl font-bold mt-2 ${totalBalance >= 0 ? "text-gray-900" : "text-red-600"}`}>
            Rs. {totalBalance.toLocaleString()}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500">Total Income</span>
          <span className="text-3xl font-bold mt-2 text-green-600">
            Rs. {totalIncome.toLocaleString()}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500">Total Expenses</span>
          <span className="text-3xl font-bold mt-2 text-red-600">
            Rs. {totalExpense.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 self-start">Balance Expenditure</h3>
          <div className="w-full h-90">
            <Line data={lineData} backgroundcolor="#3b82f6" options={option} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 self-start">Expenses by Category</h3>
          <div className="w-full h-90 flex justify-center">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
