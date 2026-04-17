import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fmt } from "../../utils/formatters.js";
import "./BarChart.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bar-chart__tooltip">
        <p className="bar-chart__tooltip-month">{payload[0].payload.month}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color }} className="bar-chart__tooltip-value">
            {entry.name}: <span>{fmt(entry.value)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BarChart({ data = [] }) {
  const chartData = data.map((item) => ({
    month: MONTHS[item.month] ?? "--",
    income: Number(item?.income ?? 0),
    expense: Number(item?.expense ?? 0),
  }));

  return (
    <section className="bar-chart">
      <header className="bar-chart__header">
        <h3 className="bar-chart__title">Entradas vs Saidas (Ano)</h3>
      </header>

      <div className="bar-chart__container">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            className="bar-chart__recharts"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="month"
              stroke="var(--muted)"
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis
              stroke="var(--muted)"
              style={{ fontSize: "0.75rem" }}
              tickFormatter={fmt}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "1rem" }}
              iconType="square"
            />
            <Bar
              dataKey="income"
              fill="var(--success)"
              name="Receitas"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="expense"
              fill="var(--danger)"
              name="Despesas"
              radius={[8, 8, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
