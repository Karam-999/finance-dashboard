# Finance Dashboard

A personal finance tracking dashboard built with **Next.js 16**, **Chart.js**, and **Tailwind CSS**.

## Features

- **Live charts** : Balance trend (line) and expense breakdown (pie) that update instantly when transactions change
- **Persistent storage** : Transactions saved to `localStorage`; survive page refreshes
- **Role-based access** : Switch between **Admin** (can add transactions) and **Viewer** (read-only)
- **Filter & search** : Filter transactions by type (income/expense) and search by category
- **Quick Insights** : Highest spending category, expense-to-income ratio, and net savings rate

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| Charts | Chart.js + react-chartjs-2 |
| State | React Context API |
| Persistence | localStorage |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router (layout, page, globals.css)
├── components/
│   ├── DashboardOverview.js   # Summary cards + charts
│   ├── InsightsSection.js     # Quick financial insights
│   ├── TransactionsSection.js # Transaction table + add form
│   └── Header.js              # Nav with role switcher
├── context/
│   └── FinanceContext.js      # Global state + localStorage sync
└── data/
    └── transactions.js        # Seed/initial transaction data
```

## Adding Transactions

Switch the role to **Admin** using the toggle in the header, then use the form above the transaction table to add a new entry. All changes reflect immediately in the charts and persist across refreshes.
