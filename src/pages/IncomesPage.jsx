import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TransactionForm from "../components/transactions/TransactionForm.jsx";
import TransactionList from "../components/transactions/TransactionList.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { transactionShape } from "../utils/propTypes.js";
import { TRANSACTION_TYPES } from "../utils/constants.js";
import { filterByMethod, fmt, sortByValue } from "../utils/formatters.js";
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

export default function IncomesPage({
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
    <section className="incomes-page">
      <PageHeader
        title="Receitas"
        subtitle="Registre entradas, acompanhe fontes de renda e mantenha o fluxo positivo."
      />
      <div className="incomes-page__controls">
        <label className="incomes-page__control" htmlFor="incomes-method-filter">
          <span>Forma de recebimento</span>
          <select
            id="incomes-method-filter"
            value={methodFilter}
            onChange={(event) => setMethodFilter(event.target.value)}
          >
            <option value="">Todas</option>
            {RECEIPT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>

        <label className="incomes-page__control" htmlFor="incomes-sort-value">
          <span>Ordenar por valor</span>
          <select
            id="incomes-sort-value"
            value={valueOrder}
            onChange={(event) => setValueOrder(event.target.value)}
          >
            <option value="desc">Maior para menor</option>
            <option value="asc">Menor para maior</option>
          </select>
        </label>

        <button
          className="incomes-page__clear"
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
        <p className="incomes-page__badge">Filtro ativo: {methodFilter}</p>
      ) : null}

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
        <StatCard title="Total recebido" value={fmt(totalValue)} trend={visibleTransactions.length ? 6.3 : 0} icon="incomes" />
        <StatCard title="Quantidade" value={String(visibleTransactions.length)} trend={visibleTransactions.length ? 4.7 : 0} icon="conference" />
        <StatCard title="Ticket medio" value={fmt(averageValue)} trend={visibleTransactions.length ? 2.4 : 0} icon="annual" />
      </div>

      <TransactionList
        items={visibleTransactions}
        onEdit={setEditingTransaction}
        onDelete={deleteTransaction}
      />
    </section>
  );
}

IncomesPage.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape),
  onTransactionsChange: PropTypes.func
};
