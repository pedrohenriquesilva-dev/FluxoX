import Layout from "./components/ui/Layout.jsx";
import useFinance from "./hooks/useFinance.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import AnnualPage from "./pages/AnnualPage.jsx";
import ConferencePage from "./pages/ConferencePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ExpensesPage from "./pages/ExpensesPage.jsx";
import IncomesPage from "./pages/IncomesPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SavingsPage from "./pages/SavingsPage.jsx";
import Placeholder from "./pages/Placeholder.jsx";

function App() {
  const [page, setPage] = useLocalStorage("fluxox:active-page", "dashboard");
  const [expenseTransactions, setExpenseTransactions] = useLocalStorage(
    "fluxox:transactions:expenses",
    []
  );
  const [incomeTransactions, setIncomeTransactions] = useLocalStorage(
    "fluxox:transactions:incomes",
    []
  );
  const [savingsByMonth, setSavingsByMonth] = useLocalStorage("fluxox:savings:by-month", {});
  const [settings, setSettings] = useLocalStorage("fluxox:settings", {
    expenseCategories: [],
    paymentMethods: [],
    savingLocations: []
  });
  const [monthlyGoal, setMonthlyGoal] = useLocalStorage("fluxox:goal:monthly", 1000);

  const finance = useFinance({
    expenses: expenseTransactions,
    incomes: incomeTransactions,
    monthlyGoal
  });

  return (
    <Layout currentPage={page} onNavigate={setPage}>
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
      page !== "settings" ? (
        <Placeholder page={page} />
      ) : null}
    </Layout>
  );
}

export default App;