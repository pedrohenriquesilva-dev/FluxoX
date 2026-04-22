import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fmt } from "../../utils/formatters.js";
import "./PieChart.css";

const COLORS = ["var(--accent)", "var(--warning)"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="pie-chart__tooltip">
        <p className="pie-chart__tooltip-label">{data.name}</p>
        <p className="pie-chart__tooltip-value">{fmt(data.value)}</p>
        <p className="pie-chart__tooltip-percent">{data.percent}%</p>
      </div>
    );
  }
  return null;
};

export default function PieChart({ electronic = 0, cash = 0, title = "Composicao" }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const numElectronic = Number(electronic);
  const numCash = Number(cash);
  const total = numElectronic + numCash;

  const data = [
    {
      name: "Eletrônico",
      value: numElectronic,
      percent: total > 0 ? Math.round((numElectronic / total) * 100) : 0,
    },
    {
      name: "Espécie",
      value: numCash,
      percent: total > 0 ? Math.round((numCash / total) * 100) : 0,
    },
  ];

  return (
    <section className="pie-chart">
      <header className="pie-chart__header">
        <h3 className="pie-chart__title">{title}</h3>
      </header>

      <div className="pie-chart__container">
        <ResponsiveContainer width="100%" height={280}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent }) => `${percent}%`}
              outerRadius={80}
              innerRadius={50}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[idx]}
                  className={`pie-chart__slice ${activeIndex === idx ? "active" : ""}`}
                  style={{
                    opacity: activeIndex === null || activeIndex === idx ? 1 : 0.6,
                    transition: "opacity 0.2s ease",
                    filter: activeIndex === idx ? "brightness(1.2)" : "brightness(1)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => `${entry.payload.name}: ${fmt(entry.payload.value)}`}
              wrapperStyle={{ paddingTop: "1rem" }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
