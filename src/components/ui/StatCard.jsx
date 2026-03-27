import Icon from "./Icon.jsx";
import "./StatCard.css";

export default function StatCard({ title, value, trend = 0, icon = "dashboard" }) {
  const trendUp = trend >= 0;

  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <p className="stat-card__title">{title}</p>
        <span className="stat-card__icon">
          <Icon name={icon} />
        </span>
      </div>
      <p className="stat-card__value">{value}</p>
      <p className={`stat-card__trend ${trendUp ? "stat-card__trend--up" : "stat-card__trend--down"}`}>
        <Icon name={trendUp ? "trendUp" : "trendDown"} /> {Math.abs(trend)}%
      </p>
    </article>
  );
}
