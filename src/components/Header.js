"use client";
import { toast } from "sonner"

import { useFinance } from "../context/FinanceContext";

export default function Header() {
  const { role, setRole } = useFinance();

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-500 mr-2 ml-2 whitespace-nowrap">View as:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => toast.error("This Functionality will be added in some time") } className='text-sm font-semibold text-white ml-6 mr-2 bg-blue-900 px-3 py-2 rounded-lg cursor-pointer ml-2 whitespace-nowrap'>Export Transactions 📤</button>
        </div>
      </div>
    </header>
  );
}
