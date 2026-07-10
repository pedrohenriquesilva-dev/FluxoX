import { useEffect } from 'react'
import Layout from "./components/ui/Layout.jsx";
import useFinance from "./hooks/useFinance.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import useTheme from "./hooks/useTheme.js";
import AnnualPage from "./pages/AnnualPage.jsx";
import ConferencePage from "./pages/ConferencePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ExpensesPage from "./pages/ExpensesPage.jsx";
import IncomesPage from "./pages/IncomesPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SavingsPage from "./pages/SavingsPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import { STORAGE_KEYS } from "./utils/storage.js";

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [page, setPage] = useLocalStorage(STORAGE_KEYS.ACTIVE_PAGE, "dashboard");
  const [expenseTransactions, setExpenseTransactions] = useLocalStorage(
    STORAGE_KEYS.EXPENSE_TRANSACTIONS,
    []
  );
  const [incomeTransactions, setIncomeTransactions] = useLocalStorage(
    STORAGE_KEYS.INCOME_TRANSACTIONS,
    []
  );
  const [savingsByMonth, setSavingsByMonth] = useLocalStorage(STORAGE_KEYS.SAVINGS_BY_MONTH, {});
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, {
    expenseCategories: [],
    paymentMethods: [],
    savingLocations: []
  });
  const [monthlyGoal, setMonthlyGoal] = useLocalStorage(STORAGE_KEYS.MONTHLY_GOAL, 1000);

  const finance = useFinance({
    expenses: expenseTransactions,
    incomes: incomeTransactions,
    monthlyGoal
  });

  // ── Scroll para o topo ao trocar de página ────────────────────
  // Tenta todos os elementos que podem estar com scroll ativo
  useEffect(() => {
    // Estratégia 1: elemento com classe layout__main
    const main = document.querySelector('.layout__main')
    if (main) {
      main.scrollTop = 0
    }

    // Estratégia 2: body e html (caso o scroll seja da página inteira)
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

    // Estratégia 3: qualquer elemento com scrollTop > 0
    document.querySelectorAll('*').forEach(el => {
      if (el.scrollTop > 0) {
        el.scrollTop = 0
      }
    })
  }, [page])

  return (
    <Layout 
      currentPage={page} 
      onNavigate={setPage} 
      isDark={isDark} 
      onToggleTheme={toggleTheme}
      expenses={expenseTransactions}
      incomes={incomeTransactions}
    >
      {page === "dashboard" ? <DashboardPage finance={finance} /> : null}
      {page === "annual" ? <AnnualPage finance={finance} /> : null}

      {page === "expenses" ? (
        <ExpensesPage
          transactions={expenseTransactions}
          onTransactionsChange={setExpenseTransactions}
        />
      ) : null}

      {page === "incomes" ? (
        <IncomesPage
          transactions={incomeTransactions}
          onTransactionsChange={setIncomeTransactions}
        />
      ) : null}

      {page === "savings" ? (
        <SavingsPage
          finance={finance}
          savingsByMonth={savingsByMonth}
          onSavingsByMonthChange={setSavingsByMonth}
        />
      ) : null}

      {page === "conference" ? (
        <ConferencePage
          finance={finance}
          savingsByMonth={savingsByMonth}
          expenses={expenseTransactions}
          incomes={incomeTransactions}
        />
      ) : null}

      {page === "reports" ? (
        <ReportsPage
          expenses={expenseTransactions}
          incomes={incomeTransactions}
        />
      ) : null}

      {page === "stats" ? (
        <StatsPage
          expenses={expenseTransactions}
          incomes={incomeTransactions}
          finance={finance}
        />
      ) : null}

      {page === "settings" ? (
        <SettingsPage
          settings={settings}
          onSettingsChange={setSettings}
          monthlyGoal={monthlyGoal}
          onMonthlyGoalChange={setMonthlyGoal}
        />
      ) : null}

      {page !== "dashboard" &&
      page !== "annual" &&
      page !== "expenses" &&
      page !== "incomes" &&
      page !== "savings" &&
      page !== "conference" &&
      page !== "reports" &&
      page !== "stats" &&
      page !== "settings" ? (
        <Placeholder page={page} />
      ) : null}
    </Layout>
  );
}

export default App;
