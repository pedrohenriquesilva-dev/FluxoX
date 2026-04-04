import AccumulatedTable from "./components/ui/AccumulatedTable.jsx";
import BarChart from "./components/ui/BarChart.jsx";
import Layout from "./components/ui/Layout.jsx";
import PieChart from "./components/ui/PieChart.jsx";
import useFinance from "./hooks/useFinance.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import ExpensesPage from "./pages/ExpensesPage.jsx";
import IncomesPage from "./pages/IncomesPage.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import { fmt } from "./utils/formatters.js";

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
      {page === "dashboard" ? (
        <section className="day5">
          <header className="day5__header">
            <h1 className="day5__title">Dia 14 - Graficos base do Dashboard</h1>
            <strong className={finance.goal.reached ? "text-success" : "text-warning"}>
              Meta mensal: {fmt(finance.monthly.savings)} / {fmt(finance.goal.value)}
            </strong>
          </header>

          <div className="day5__grid">
            <PieChart
              title="Despesas: Eletronico vs Especie"
              electronic={finance.byMethod.expenses.electronic}
              cash={finance.byMethod.expenses.cash}
            />
            <PieChart
              title="Receitas: Eletronico vs Especie"
              electronic={finance.byMethod.incomes.electronic}
              cash={finance.byMethod.incomes.cash}
            />
          </div>

          <BarChart data={finance.monthly.accumulation} />
          <AccumulatedTable rows={finance.monthly.accumulation} />
        </section>
      ) : null}

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

      {page !== "dashboard" && page !== "expenses" && page !== "incomes" ? (
        <Placeholder page={page} />
      ) : null}
    </Layout>
  );
}

export default App;