import { useMemo, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm.jsx";
import TransactionList from "../components/transactions/TransactionList.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../utils/constants.js";
import { filterByMethod, fmt, sortByValue } from "../utils/formatters.js";
import "./ExpensesPage.css";

export default function ExpensesPage({
  transactions = [],
  onTransactionsChange
}) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [methodFilter, setMethodFilter] = useState("");
  const [valueOrder, setValueOrder] = useState("desc");

  const visibleTransactions = useMemo(() => {
    const filtered = filterByMethod(transactions, methodFilter);
    return sortByValue(filtered, valueOrder);
  }, [transactions, methodFilter, valueOrder]);

  const totalValue = useMemo(
    () => visibleTransactions.reduce((acc, item) => acc + Number(item.value || 0), 0),
    [visibleTransactions]
  );

  const averageValue = useMemo(() => {
    if (visibleTransactions.length === 0) return 0;
    return totalValue / visibleTransactions.length;
  }, [totalValue, visibleTransactions.length]);

  function saveTransaction(transaction) {
    onTransactionsChange?.((prev) => {
      const exists = prev.some((item) => item.id === transaction.id);
      if (exists) return prev.map((item) => (item.id === transaction.id ? transaction : item));
      return [transaction, ...prev];
    });
    setEditingTransaction(null);
  }

  function deleteTransaction(id) {
    onTransactionsChange?.((prev) => prev.filter((item) => item.id !== id));
    setEditingTransaction((prev) => (prev?.id === id ? null : prev));
  }

  return (
    <section className="expenses-page">
      <header className="expenses-page__header">
        <h1 className="expenses-page__title">Despesas</h1>
        <p className="expenses-page__subtitle text-muted">
          Cadastre, edite e exclua despesas em um fluxo unico de CRUD.
        </p>
        <div className="expenses-page__controls">
          <label className="expenses-page__control" htmlFor="expenses-method-filter">
            <span>Forma de pagamento</span>
            <select
              id="expenses-method-filter"
              value={methodFilter}
              onChange={(event) => setMethodFilter(event.target.value)}
            >
              <option value="">Todas</option>
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>

          <label className="expenses-page__control" htmlFor="expenses-sort-value">
            <span>Ordenar por valor</span>
            <select
              id="expenses-sort-value"
              value={valueOrder}
              onChange={(event) => setValueOrder(event.target.value)}
            >
              <option value="desc">Maior para menor</option>
              <option value="asc">Menor para maior</option>
            </select>
          </label>

          <button
            className="expenses-page__clear"
            type="button"
            onClick={() => {
              setMethodFilter("");
              setValueOrder("desc");
            }}
          >
            Limpar
          </button>
        </div>
        {methodFilter ? (
          <p className="expenses-page__badge">Filtro ativo: {methodFilter}</p>
        ) : null}
      </header>

      <TransactionForm
        mode={TRANSACTION_TYPES.EXPENSE}
        initial={editingTransaction}
        onCancelEdit={() => setEditingTransaction(null)}
        onSubmit={saveTransaction}
      />

      <div className="expenses-page__stats">
        <StatCard title="Total gasto" value={fmt(totalValue)} trend={visibleTransactions.length ? -4.1 : 0} icon="expenses" />
        <StatCard title="Quantidade" value={String(visibleTransactions.length)} trend={visibleTransactions.length ? 7.8 : 0} icon="conference" />
        <StatCard title="Ticket medio" value={fmt(averageValue)} trend={visibleTransactions.length ? -1.2 : 0} icon="annual" />
      </div>

      <TransactionList
        items={visibleTransactions}
        onEdit={setEditingTransaction}
        onDelete={deleteTransaction}
      />
    </section>
  );
}
