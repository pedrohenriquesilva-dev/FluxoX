import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/ui/PageHeader.jsx";
import PeriodFilter from "../components/ui/PeriodFilter.jsx";
import { financeShape } from "../utils/propTypes.js";
import { fmt } from "../utils/formatters.js";
import { filterByPeriod } from "../utils/filterByPeriod.js";
import "./ConferencePage.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function sumObjectValues(record = {}) {
  return Object.values(record).reduce((acc, value) => acc + Number(value || 0), 0);
}

export default function ConferencePage({ finance, savingsByMonth = {}, expenses = [], incomes = [] }) {
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [period, setPeriod] = useState("month");
  const [customDates, setCustomDates] = useState(null);

  const rows = finance?.monthly?.accumulation ?? [];
  let runningCalculated = 0;

  const comparisonRows = rows.map((row) => {
    runningCalculated += Number(row.balance || 0);
    const savedReal = sumObjectValues(savingsByMonth[row.month] ?? {});
    const difference = savedReal - runningCalculated;

    return {
      month: row.month,
      calculated: runningCalculated,
      real: savedReal,
      difference
    };
  });

  const allTransactions = [...expenses, ...incomes];
  const filteredTransactions = useMemo(
    () => filterByPeriod(allTransactions, period, customDates),
    [allTransactions, period, customDates]
  );

  const monthTransactions = useMemo(() => {
    if (expandedMonth === null) return [];
    return filteredTransactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === expandedMonth;
    });
  }, [filteredTransactions, expandedMonth]);

  const matchedMonths = comparisonRows.filter((row) => Math.abs(row.difference) < 0.01).length;
  const totalDifference = comparisonRows.reduce((acc, row) => acc + row.difference, 0);

  const handlePeriodChange = (newPeriod, dates) => {
    setPeriod(newPeriod);
    setCustomDates(dates);
  };

  return (
    <section className="conference-page">
      <PageHeader
        title="Conferencia"
        subtitle="Comparacao mes a mes entre acumulado calculado e guardado real."
      />

      <PeriodFilter onPeriodChange={handlePeriodChange} currentPeriod={period} />

      <div className="conference-page__stats">
        <article className="conference-page__stat">
          <span className="text-muted">Meses conferidos</span>
          <strong>{comparisonRows.length}</strong>
        </article>
        <article className="conference-page__stat">
          <span className="text-muted">Meses com saldo batendo</span>
          <strong className="text-success">{matchedMonths}</strong>
        </article>
        <article className="conference-page__stat">
          <span className="text-muted">Diferenca acumulada</span>
          <strong className={totalDifference >= 0 ? "text-success" : "text-danger"}>
            {fmt(totalDifference)}
          </strong>
        </article>
      </div>

      <div className="conference-page__table-wrap">
        <table className="conference-page__table">
          <thead>
            <tr>
              <th></th>
              <th>Mes</th>
              <th>Acumulado calculado</th>
              <th>Guardado real</th>
              <th>Diferenca</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => {
              const isMatch = Math.abs(row.difference) < 0.01;
              const isExpanded = expandedMonth === row.month;

              return (
                <tr key={row.month}>
                  <td className="conference-page__expand-cell">
                    <button
                      className={`conference-page__expand-button ${isExpanded ? "is-open" : ""}`}
                      onClick={() => setExpandedMonth(isExpanded ? null : row.month)}
                      type="button"
                      aria-label={`${isExpanded ? "Fechar" : "Abrir"} detalhes de ${MONTHS[row.month]}`}
                    >
                      ▶
                    </button>
                  </td>
                  <td className="conference-page__month">{MONTHS[row.month] ?? "--"}</td>
                  <td>{fmt(row.calculated)}</td>
                  <td>{fmt(row.real)}</td>
                  <td className={row.difference >= 0 ? "text-success" : "text-danger"}>
                    {fmt(row.difference)}
                  </td>
                  <td>
                    <span className={`conference-page__badge ${isMatch ? "is-ok" : "is-warn"}`}>
                      {isMatch ? "✓ Bateu" : "⚠ Divergente"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {expandedMonth !== null && monthTransactions.length > 0 && (
        <div className="conference-page__details">
          <h3 className="conference-page__details-title">
            Transações de {MONTHS[expandedMonth]}
          </h3>
          <div className="conference-page__details-list">
            {monthTransactions.map((transaction, idx) => (
              <div key={`${transaction.id}-${idx}`} className="conference-page__detail-item">
                <div className="conference-page__detail-header">
                  <span className="conference-page__detail-type">
                    {transaction.type === "expense" ? "💸" : "💰"}
                  </span>
                  <span className="conference-page__detail-description">
                    {transaction.description}
                  </span>
                  <span className={`conference-page__detail-value ${
                    transaction.type === "expense" ? "text-danger" : "text-success"
                  }`}>
                    {transaction.type === "expense" ? "-" : "+"} {fmt(transaction.value)}
                  </span>
                </div>
                <div className="conference-page__detail-meta">
                  <span>{transaction.category}</span>
                  <span>{transaction.method}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

ConferencePage.propTypes = {
  finance: financeShape,
  savingsByMonth: PropTypes.object,
  expenses: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object)
};
