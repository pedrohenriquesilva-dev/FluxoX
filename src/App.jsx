import { useState } from "react";
import TransactionForm from "./components/transactions/TransactionForm.jsx";
import TransactionList from "./components/transactions/TransactionList.jsx";
import Layout from "./components/ui/Layout.jsx";
import StatCard from "./components/ui/StatCard.jsx";
import { TRANSACTION_TYPES } from "./utils/constants.js";
import { fmt } from "./utils/formatters.js";

function App() {
  const [page, setPage] = useState("dashboard");
  const [formMode, setFormMode] = useState(TRANSACTION_TYPES.EXPENSE);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totalExpenses = transactions
    .filter((item) => item.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((acc, item) => acc + item.value, 0);

  const totalIncomes = transactions
    .filter((item) => item.type === TRANSACTION_TYPES.INCOME)
    .reduce((acc, item) => acc + item.value, 0);

  function saveTransaction(transaction) {
    setTransactions((prev) => {
      const exists = prev.some((item) => item.id === transaction.id);
      if (exists) return prev.map((item) => (item.id === transaction.id ? transaction : item));
      return [transaction, ...prev];
    });
    setEditingTransaction(null);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
    setEditingTransaction((prev) => (prev?.id === id ? null : prev));
  }

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      <section className="day5">
        <header className="day5__header">
          <h1 className="day5__title">Dia 7 - CRUD completo</h1>
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
          initial={editingTransaction}
          onCancelEdit={() => setEditingTransaction(null)}
          onSubmit={saveTransaction}
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
            title="Lancamentos"
            value={String(transactions.length)}
            trend={transactions.length ? 14.1 : 0}
            icon="conference"
          />
        </div>

        <TransactionList
          items={transactions}
          onEdit={(transaction) => {
            setEditingTransaction(transaction);
            setFormMode(transaction.type);
          }}
          onDelete={deleteTransaction}
        />
      </section>
    </Layout>
  );
}

export default App;