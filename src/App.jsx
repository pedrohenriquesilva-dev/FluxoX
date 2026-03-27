import { useState } from "react";
import TransactionForm from "./components/transactions/TransactionForm.jsx";
import Layout from "./components/ui/Layout.jsx";
import StatCard from "./components/ui/StatCard.jsx";
import { TRANSACTION_TYPES } from "./utils/constants.js";
import { fmt } from "./utils/formatters.js";

function App() {
  const [page, setPage] = useState("dashboard");
  const [formMode, setFormMode] = useState(TRANSACTION_TYPES.EXPENSE);
  const [transactions, setTransactions] = useState([]);

  const totalExpenses = transactions
    .filter((item) => item.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((acc, item) => acc + item.value, 0);

  const totalIncomes = transactions
    .filter((item) => item.type === TRANSACTION_TYPES.INCOME)
    .reduce((acc, item) => acc + item.value, 0);

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      <section className="day5">
        <header className="day5__header">
          <h1 className="day5__title">Dia 6 - TransactionForm</h1>
          <button
            className="day5__button"
            type="button"
            onClick={() =>
              setFormMode((current) =>
                current === TRANSACTION_TYPES.EXPENSE
                  ? TRANSACTION_TYPES.INCOME
                  : TRANSACTION_TYPES.EXPENSE
              )
            }
          >
            Alternar para {formMode === TRANSACTION_TYPES.EXPENSE ? "Receita" : "Despesa"}
          </button>
        </header>

        <TransactionForm
          mode={formMode}
          onSubmit={(transaction) => setTransactions((prev) => [transaction, ...prev])}
        />

        <div className="day5__grid">
          <StatCard
            title="Total de receitas"
            value={fmt(totalIncomes)}
            trend={transactions.length ? 8.2 : 0}
            icon="incomes"
          />
          <StatCard
            title="Total de despesas"
            value={fmt(totalExpenses)}
            trend={transactions.length ? -4.3 : 0}
            icon="expenses"
          />
          <StatCard
            title="Lancamentos hoje"
            value={String(transactions.length)}
            trend={transactions.length ? 14.1 : 0}
            icon="conference"
          />
        </div>

        <div className="day6__list">
          <h3 className="day6__list-title">Ultimos lancamentos</h3>
          {transactions.length === 0 ? (
            <p className="text-muted">Nenhum lancamento salvo ainda.</p>
          ) : (
            <ul className="day6__items">
              {transactions.slice(0, 5).map((item) => (
                <li key={item.id} className="day6__item">
                  <span>{item.description}</span>
                  <strong>{fmt(item.value)}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default App;