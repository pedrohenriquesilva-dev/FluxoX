import Layout from "./components/ui/Layout.jsx";
import useFinance from "./hooks/useFinance.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import AnnualPage from "./pages/AnnualPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ExpensesPage from "./pages/ExpensesPage.jsx";
import IncomesPage from "./pages/IncomesPage.jsx";
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
  const [monthlyGoal] = useLocalStorage("fluxox:goal:monthly", 1000);

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

      {page !== "dashboard" && page !== "annual" && page !== "expenses" && page !== "incomes" ? (
        <Placeholder page={page} />
      ) : null}
    </Layout>
  );
}

export default App;