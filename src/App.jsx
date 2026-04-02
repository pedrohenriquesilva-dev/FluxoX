import Layout from "./components/ui/Layout.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
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

  return (
    <Layout currentPage={page} onNavigate={setPage}>
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

      {page !== "expenses" && page !== "incomes" ? <Placeholder page={page} /> : null}
    </Layout>
  );
}

export default App;