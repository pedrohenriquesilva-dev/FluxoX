import { fmt } from "../../utils/formatters.js";
import "./BarChart.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function BarChart({ data = [] }) {
  const maxAbs = Math.max(
    1,
    ...data.map((item) => Math.max(Math.abs(item?.income ?? 0), Math.abs(item?.expense ?? 0)))
  );

  return (
    <section className="bar-chart">
      <header className="bar-chart__header">
        <h3 className="bar-chart__title">Entradas vs Saidas (Ano)</h3>
      </header>

      <div className="bar-chart__rows">
        {data.map((item) => {
          const income = Number(item?.income ?? 0);
          const expense = Number(item?.expense ?? 0);
          const incomePct = (income / maxAbs) * 100;
          const expensePct = (expense / maxAbs) * 100;

          return (
            <div className="bar-chart__row" key={item.month}>
              <span className="bar-chart__month">{MONTHS[item.month] ?? "--"}</span>
              <div className="bar-chart__bars">
                <div
                  className="bar-chart__bar bar-chart__bar--income"
                  style={{ width: `${incomePct}%` }}
                  title={`Receitas: ${fmt(income)}`}
                />
                <div
                  className="bar-chart__bar bar-chart__bar--expense"
                  style={{ width: `${expensePct}%` }}
                  title={`Despesas: ${fmt(expense)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
