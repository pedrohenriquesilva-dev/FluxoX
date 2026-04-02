import { useMemo, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm.jsx";
import TransactionList from "../components/transactions/TransactionList.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { TRANSACTION_TYPES } from "../utils/constants.js";
import { fmt } from "../utils/formatters.js";
import "./ExpensesPage.css";

export default function ExpensesPage() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totalValue = useMemo(
    () => transactions.reduce((acc, item) => acc + Number(item.value || 0), 0),
    [transactions]
  );

  const averageValue = useMemo(() => {
    if (transactions.length === 0) return 0;
    return totalValue / transactions.length;
  }, [totalValue, transactions.length]);

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
    <section className="expenses-page">
      <header className="expenses-page__header">
        <h1 className="expenses-page__title">Despesas</h1>
        <p className="expenses-page__subtitle text-muted">
          Cadastre, edite e exclua despesas em um fluxo unico de CRUD.
        </p>
      </header>

      <TransactionForm
        mode={TRANSACTION_TYPES.EXPENSE}
        initial={editingTransaction}
        onCancelEdit={() => setEditingTransaction(null)}
        onSubmit={saveTransaction}
      />

      <div className="expenses-page__stats">
        <StatCard title="Total gasto" value={fmt(totalValue)} trend={transactions.length ? -4.1 : 0} icon="expenses" />
        <StatCard title="Quantidade" value={String(transactions.length)} trend={transactions.length ? 7.8 : 0} icon="conference" />
        <StatCard title="Ticket medio" value={fmt(averageValue)} trend={transactions.length ? -1.2 : 0} icon="annual" />
      </div>

      <TransactionList
        items={transactions}
        onEdit={setEditingTransaction}
        onDelete={deleteTransaction}
      />
    </section>
  );
}
