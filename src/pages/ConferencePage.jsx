import { fmt } from "../utils/formatters.js";
import "./ConferencePage.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function sumObjectValues(record = {}) {
  return Object.values(record).reduce((acc, value) => acc + Number(value || 0), 0);
}

export default function ConferencePage({ finance, savingsByMonth = {} }) {
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

  const matchedMonths = comparisonRows.filter((row) => Math.abs(row.difference) < 0.01).length;
  const totalDifference = comparisonRows.reduce((acc, row) => acc + row.difference, 0);

  return (
    <section className="conference-page">
      <header className="conference-page__header">
        <h1 className="conference-page__title">Conferencia</h1>
        <p className="conference-page__subtitle text-muted">
          Comparacao mes a mes entre acumulado calculado e guardado real.
        </p>
      </header>

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
              return (
                <tr key={row.month}>
                  <td>{MONTHS[row.month] ?? "--"}</td>
                  <td>{fmt(row.calculated)}</td>
                  <td>{fmt(row.real)}</td>
                  <td className={row.difference >= 0 ? "text-success" : "text-danger"}>
                    {fmt(row.difference)}
                  </td>
                  <td>
                    <span className={`conference-page__badge ${isMatch ? "is-ok" : "is-warn"}`}>
                      {isMatch ? "Bateu" : "Divergente"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
