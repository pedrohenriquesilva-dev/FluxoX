import AccumulatedTable from "../components/ui/AccumulatedTable.jsx";
import BarChart from "../components/ui/BarChart.jsx";
import PieChart from "../components/ui/PieChart.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { fmt } from "../utils/formatters.js";
import "./DashboardPage.css";

export default function DashboardPage({ finance }) {
  if (!finance) return null;

  return (
    <section className="dashboard-page">
      <header className="dashboard-page__header">
        <div>
          <h1 className="dashboard-page__title">Dashboard</h1>
          <p className="dashboard-page__subtitle text-muted">
            Visao consolidada das financas com foco em saldo, meta e acumulado anual.
          </p>
        </div>
        <p className={`dashboard-page__goal ${finance.goal.reached ? "text-success" : "text-warning"}`}>
          Meta do mes: {fmt(finance.monthly.savings)} / {fmt(finance.goal.value)}
        </p>
      </header>

      <div className="dashboard-page__stats">
        <StatCard title="Receitas (total)" value={fmt(finance.totals.incomes)} trend={6.1} icon="incomes" />
        <StatCard title="Despesas (total)" value={fmt(finance.totals.expenses)} trend={-3.2} icon="expenses" />
        <StatCard title="Economia real" value={fmt(finance.totals.realSavings)} trend={4.8} icon="savings" />
        <StatCard title="Saldo do mes" value={fmt(finance.monthly.savings)} trend={finance.goal.reached ? 8.4 : -1.7} icon="annual" />
      </div>

      <div className="dashboard-page__charts">
        <PieChart
          title="Despesas: Eletronico vs Especie"
          electronic={finance.byMethod.expenses.electronic}
          cash={finance.byMethod.expenses.cash}
        />
        <PieChart
          title="Receitas: Eletronico vs Especie"
          electronic={finance.byMethod.incomes.electronic}
          cash={finance.byMethod.incomes.cash}
        />
      </div>

      <BarChart data={finance.monthly.accumulation} />
      <AccumulatedTable rows={finance.monthly.accumulation} />
    </section>
  );
}
