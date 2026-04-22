import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fmt } from "../../utils/formatters.js";
import "./LineChart.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="line-chart__tooltip">
        <p className="line-chart__tooltip-month">{payload[0].payload.month}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color }} className="line-chart__tooltip-value">
            {entry.name}: <span>{fmt(entry.value)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function LineChart({ data = [], monthlyGoal = 0 }) {
  const chartData = data.map((item, idx) => ({
    month: MONTHS[idx] ?? "--",
    accumulated: item.accumulated ?? 0,
    goal: monthlyGoal,
  }));

  return (
    <section className="line-chart">
      <header className="line-chart__header">
        <h3 className="line-chart__title">Acumulado vs Meta (Ano)</h3>
        <p className="line-chart__subtitle">Progresso rumo à meta mensal desejada</p>
      </header>

      <div className="line-chart__container">
        <ResponsiveContainer width="100%" height={320}>
          <RechartsLineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            className="line-chart__recharts"
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
            />
            <Line
              type="monotone"
              dataKey="accumulated"
              stroke="var(--success)"
              name="Acumulado Real"
              strokeWidth={3}
              dot={{ fill: "var(--success)", r: 5 }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="goal"
              stroke="var(--warning)"
              name="Meta Desejada"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
