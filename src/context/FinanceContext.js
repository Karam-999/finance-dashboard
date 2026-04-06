"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { initialTransactions } from "../data/transactions";

const STORAGE_KEY = "finance_transactions";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [hydrated, setHydrated] = useState(false);

  const [role, setRole] = useState("viewer");
  const [filters, setFilters] = useState({
    type: "all",
    category: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTransactions(JSON.parse(saved));
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);


  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions, hydrated]);

  const addTransaction = (newTx) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...newTx,
        id: Date.now(), 
        amount: newTx.type === "expense" ? -Math.abs(Number(newTx.amount)) : Math.abs(Number(newTx.amount)),
      },
    ]);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        role,
        setRole,
        filters,
        updateFilter,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance should be used within a FinanceProvider");
  }
  return context;
}
