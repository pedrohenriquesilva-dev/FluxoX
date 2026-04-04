import { fmt } from "../../utils/formatters.js";
import "./PieChart.css";

export default function PieChart({ electronic = 0, cash = 0, title = "Composicao" }) {
  const total = Number(electronic) + Number(cash);
  const safeTotal = total > 0 ? total : 1;
  const electronicPct = (Number(electronic) / safeTotal) * 100;

  return (
    <section className="pie-chart">
      <header className="pie-chart__header">
        <h3 className="pie-chart__title">{title}</h3>
      </header>

      <div className="pie-chart__content">
        <div
          className="pie-chart__circle"
          style={{
            background: `conic-gradient(var(--accent) 0 ${electronicPct}%, var(--warning) ${electronicPct}% 100%)`
          }}
        >
          <span className="pie-chart__center">{Math.round(electronicPct)}%</span>
        </div>

        <ul className="pie-chart__legend">
          <li>
            <span className="pie-chart__dot pie-chart__dot--electronic" />
            Eletronico: {fmt(electronic)}
          </li>
          <li>
            <span className="pie-chart__dot pie-chart__dot--cash" />
            Especie: {fmt(cash)}
          </li>
        </ul>
      </div>
    </section>
  );
}
