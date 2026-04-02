import { useMemo, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm.jsx";
import TransactionList from "../components/transactions/TransactionList.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { TRANSACTION_TYPES } from "../utils/constants.js";
import { fmt } from "../utils/formatters.js";
import "./IncomesPage.css";

const INCOME_CATEGORIES = [
  "salario",
  "freelance",
  "investimentos",
  "comissoes",
  "bonus",
  "reembolso",
  "outros"
];

const RECEIPT_METHODS = [
  "pix",
  "transferencia",
  "deposito",
  "dinheiro",
  "boleto"
];

export default function IncomesPage() {
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
    <section className="incomes-page">
      <header className="incomes-page__header">
        <h1 className="incomes-page__title">Receitas</h1>
        <p className="incomes-page__subtitle text-muted">
          Registre entradas, acompanhe fontes de renda e mantenha o fluxo positivo.
        </p>
      </header>

      <TransactionForm
        mode={TRANSACTION_TYPES.INCOME}
        initial={editingTransaction}
        categoryOptions={INCOME_CATEGORIES}
        methodOptions={RECEIPT_METHODS}
        submitButtonClassName="incomes-page__submit"
        onCancelEdit={() => setEditingTransaction(null)}
        onSubmit={saveTransaction}
      />

      <div className="incomes-page__stats">
        <StatCard title="Total recebido" value={fmt(totalValue)} trend={transactions.length ? 6.3 : 0} icon="incomes" />
        <StatCard title="Quantidade" value={String(transactions.length)} trend={transactions.length ? 4.7 : 0} icon="conference" />
        <StatCard title="Ticket medio" value={fmt(averageValue)} trend={transactions.length ? 2.4 : 0} icon="annual" />
      </div>

      <TransactionList
        items={transactions}
        onEdit={setEditingTransaction}
        onDelete={deleteTransaction}
      />
    </section>
  );
}
