import PropTypes from "prop-types";
import PageHeader from "../components/ui/PageHeader.jsx";
import ExportButton from "../components/ui/ExportButton.jsx";
import { financeShape } from "../utils/propTypes.js";
import { exportAnnualToCSV } from "../utils/exportCsv.js";
import { fmt } from "../utils/formatters.js";
import "./AnnualPage.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function AnnualPage({ finance }) {
  const rows = finance?.monthly?.accumulation ?? [];
  const monthlyGoal = Number(finance?.goal?.value ?? 0);

  let runningBalance = 0;
  const tableRows = rows.map((row) => {
    runningBalance += Number(row.balance ?? 0);
    const goalDelta = Number(row.balance ?? 0) - monthlyGoal;
    return {
      ...row,
      runningBalance,
      goalDelta
    };
  });

  const yearIncome = tableRows.reduce((acc, row) => acc + Number(row.income || 0), 0);
  const yearExpense = tableRows.reduce((acc, row) => acc + Number(row.expense || 0), 0);
  const yearBalance = yearIncome - yearExpense;

  return (
    <section className="annual-page">
      <PageHeader
        title="Visao Anual"
        subtitle="Tabela estrategica de janeiro a dezembro com consolidado financeiro completo."
        rightSlot={(
          <ExportButton
            onExport={() => exportAnnualToCSV(tableRows)}
            label="Exportar Resumo"
          />
        )}
      />

      <div className="annual-page__stats">
        <article className="annual-page__stat">
          <span className="text-muted">Receitas no ano</span>
          <strong className="text-success">{fmt(yearIncome)}</strong>
        </article>
        <article className="annual-page__stat">
          <span className="text-muted">Despesas no ano</span>
          <strong className="text-danger">{fmt(yearExpense)}</strong>
        </article>
        <article className="annual-page__stat">
          <span className="text-muted">Saldo anual</span>
          <strong className={yearBalance >= 0 ? "text-success" : "text-danger"}>
            {fmt(yearBalance)}
          </strong>
        </article>
      </div>

      <div className="annual-page__table-wrap">
        <table className="annual-page__table">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
              <th>Acumulado</th>
              <th>Meta</th>
              <th>Diferenca</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <tr key={row.month}>
                <td>{MONTHS[row.month] ?? "--"}</td>
                <td>{fmt(row.income)}</td>
                <td>{fmt(row.expense)}</td>
                <td className={row.balance >= 0 ? "text-success" : "text-danger"}>
                  {fmt(row.balance)}
                </td>
                <td className={row.runningBalance >= 0 ? "text-success" : "text-danger"}>
                  {fmt(row.runningBalance)}
                </td>
                <td>{fmt(monthlyGoal)}</td>
                <td className={row.goalDelta >= 0 ? "text-success" : "text-danger"}>
                  {fmt(row.goalDelta)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

AnnualPage.propTypes = {
  finance: financeShape
};
