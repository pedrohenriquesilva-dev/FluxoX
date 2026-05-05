import { useState } from "react";
import AccumulatedTable from "../components/ui/AccumulatedTable.jsx";
import BarChart from "../components/ui/BarChart.jsx";
import DashboardSkeleton from "../components/ui/DashboardSkeleton.jsx";
import LineChart from "../components/ui/LineChart.jsx";
import MonthlySummaryModal from "../components/ui/MonthlySummaryModal.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import PieChart from "../components/ui/PieChart.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import PropTypes from "prop-types";
import { financeShape } from "../utils/propTypes.js";
import { fmt } from "../utils/formatters.js";
import useLoading from "../hooks/useLoading.js";
import "./DashboardPage.css";

export default function DashboardPage({ finance }) {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const isLoading = useLoading(1200); // 1.2 segundos de loading

  if (!finance) return null;

  // Mostra skeleton durante loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="dashboard-page">
      <PageHeader
        title="Dashboard"
        subtitle="Visao consolidada das financas com foco em saldo, meta e acumulado anual."
        rightSlot={(
          <div className="dashboard-page__header-actions">
            <button
              className="dashboard-page__share-button"
              onClick={() => setShowSummaryModal(true)}
              type="button"
            >
              📤 Compartilhar resumo
            </button>
            <p className={`dashboard-page__goal ${finance.goal.reached ? "text-success" : "text-warning"}`}>
              Meta do mes: {fmt(finance.monthly.savings)} / {fmt(finance.goal.value)}
            </p>
          </div>
        )}
      />

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
      <LineChart data={finance.monthly.lineChartData} monthlyGoal={finance.goal.value} />
      <AccumulatedTable rows={finance.monthly.accumulation} />

      {showSummaryModal && (
        <MonthlySummaryModal
          monthlyData={finance.monthly}
          goal={finance.goal.value}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
    </section>
  );
}

DashboardPage.propTypes = {
  finance: financeShape
};
