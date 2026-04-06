import { FinanceProvider } from "../context/FinanceContext";
import Header from "../components/Header";
import DashboardOverview from "../components/DashboardOverview";
import InsightsSection from "../components/InsightsSection";
import TransactionsSection from "../components/TransactionsSection";

export default function Home() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <DashboardOverview />
          <InsightsSection />
          <TransactionsSection />
        </main>
      </div>
    </FinanceProvider>
  );
}
