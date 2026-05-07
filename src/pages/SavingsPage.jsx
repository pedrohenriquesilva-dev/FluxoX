import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/ui/PageHeader.jsx";
import { financeShape } from "../utils/propTypes.js";
import { fmt } from "../utils/formatters.js";
import useToast from "../hooks/useToast.js";
import "./SavingsPage.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const LOCATIONS = [
  { key: "wallet", label: "Carteira" },
  { key: "bank", label: "Conta bancaria" },
  { key: "reserve", label: "Reserva" },
  { key: "investments", label: "Investimentos" }
];

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function SavingsPage({
  finance,
  savingsByMonth = {},
  onSavingsByMonthChange
}) {
  const [monthIndex, setMonthIndex] = useState(finance?.monthly?.index ?? new Date().getMonth());
  const toast = useToast();

  const monthRecord = savingsByMonth[monthIndex] ?? {};
  const savedTotal = LOCATIONS.reduce((acc, item) => acc + toNumber(monthRecord[item.key]), 0);

  const calculatedAccumulated = useMemo(() => {
    const rows = finance?.monthly?.accumulation ?? [];
    return rows
      .filter((row) => row.month <= monthIndex)
      .reduce((acc, row) => acc + Number(row.balance || 0), 0);
  }, [finance, monthIndex]);

  const difference = savedTotal - calculatedAccumulated;

  function updateValue(locationKey, value) {
    onSavingsByMonthChange?.((prev) => ({
      ...prev,
      [monthIndex]: {
        ...(prev[monthIndex] ?? {}),
        [locationKey]: toNumber(value)
      }
    }));
    toast.success(`Valor atualizado em ${LOCATIONS.find(loc => loc.key === locationKey)?.label || locationKey}!`);
  }

  return (
    <section className="savings-page">
      <PageHeader
        title="Savings"
        subtitle="Informe quanto voce possui em cada local e compare com o acumulado calculado."
      />

      <label className="savings-page__month" htmlFor="savings-month">
        <span>Mes de referencia</span>
        <select
          id="savings-month"
          value={monthIndex}
          onChange={(event) => setMonthIndex(Number(event.target.value))}
        >
          {MONTHS.map((label, index) => (
            <option key={label} value={index}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <div className="savings-page__inputs">
        {LOCATIONS.map((location) => (
          <label className="savings-page__field" htmlFor={`savings-${location.key}`} key={location.key}>
            <span>{location.label}</span>
            <input
              id={`savings-${location.key}`}
              type="number"
              min="0"
              step="0.01"
              value={monthRecord[location.key] ?? 0}
              onChange={(event) => updateValue(location.key, event.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="savings-page__cards">
        <article className="savings-page__card">
          <span className="text-muted">Total informado ({MONTHS[monthIndex]})</span>
          <strong>{fmt(savedTotal)}</strong>
        </article>
        <article className="savings-page__card">
          <span className="text-muted">Acumulado calculado</span>
          <strong>{fmt(calculatedAccumulated)}</strong>
        </article>
        <article className="savings-page__card">
          <span className="text-muted">Diferenca</span>
          <strong className={difference >= 0 ? "text-success" : "text-danger"}>{fmt(difference)}</strong>
        </article>
      </div>
    </section>
  );
}

SavingsPage.propTypes = {
  finance: financeShape,
  savingsByMonth: PropTypes.object,
  onSavingsByMonthChange: PropTypes.func
};
