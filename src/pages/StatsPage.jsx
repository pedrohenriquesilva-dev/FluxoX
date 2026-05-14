import { useMemo } from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/ui/PageHeader.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { fmt } from "../utils/formatters.js";
import "./StatsPage.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function StatsPage({ expenses = [], incomes = [], finance }) {
  const stats = useMemo(() => {
    // Totais gerais
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.value || 0), 0);
    const totalIncomes = incomes.reduce((sum, inc) => sum + Number(inc.value || 0), 0);
    const netBalance = totalIncomes - totalExpenses;

    // Recordes
    const highestExpense = expenses.reduce((max, exp) =>
      Number(exp.value || 0) > Number(max.value || 0) ? exp : max, {});
    const highestIncome = incomes.reduce((max, inc) =>
      Number(inc.value || 0) > Number(max.value || 0) ? inc : max, {});

    const mostExpensiveCategory = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.value || 0);
      return acc;
    }, {});
    const topCategory = Object.entries(mostExpensiveCategory)
      .sort(([,a], [,b]) => b - a)[0];

    // Médias
    const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
    const avgIncome = incomes.length > 0 ? totalIncomes / incomes.length : 0;

    // Preferências
    const paymentMethods = expenses.reduce((acc, exp) => {
      acc[exp.method] = (acc[exp.method] || 0) + 1;
      return acc;
    }, {});
    const favoriteMethod = Object.entries(paymentMethods)
      .sort(([,a], [,b]) => b - a)[0];

    const categories = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + 1;
      return acc;
    }, {});
    const favoriteCategory = Object.entries(categories)
      .sort(([,a], [,b]) => b - a)[0];

    // Dados mensais para gráfico
    const monthlyData = MONTHS.map((month, index) => {
      const monthExpenses = expenses
        .filter(exp => new Date(exp.date).getMonth() === index)
        .reduce((sum, exp) => sum + Number(exp.value || 0), 0);

      const monthIncomes = incomes
        .filter(inc => new Date(inc.date).getMonth() === index)
        .reduce((sum, inc) => sum + Number(inc.value || 0), 0);

      return {
        month,
        expenses: monthExpenses,
        incomes: monthIncomes,
        balance: monthIncomes - monthExpenses
      };
    });

    // Máximo para normalizar barras
    const maxValue = Math.max(
      ...monthlyData.map(m => m.expenses),
      ...monthlyData.map(m => m.incomes)
    );

    return {
      totalExpenses,
      totalIncomes,
      netBalance,
      highestExpense,
      highestIncome,
      topCategory,
      avgExpense,
      avgIncome,
      favoriteMethod,
      favoriteCategory,
      monthlyData,
      maxValue,
      transactionCount: expenses.length + incomes.length
    };
  }, [expenses, incomes, finance]);

  return (
    <section className="stats-page">
      <PageHeader
        title="★ Estatísticas"
        subtitle="Seu ano financeiro em números — conquistas, recordes e padrões de consumo."
      />

      {/* Overview Cards */}
      <div className="stats-page__overview">
        <StatCard
          title="Total de Receitas"
          value={fmt(stats.totalIncomes)}
          icon="💰"
          trend="positive"
        />
        <StatCard
          title="Total de Despesas"
          value={fmt(stats.totalExpenses)}
          icon="💸"
          trend="negative"
        />
        <StatCard
          title="Saldo Líquido"
          value={fmt(stats.netBalance)}
          icon={stats.netBalance >= 0 ? "📈" : "📉"}
          trend={stats.netBalance >= 0 ? "positive" : "negative"}
        />
        <StatCard
          title="Transações Totais"
          value={stats.transactionCount.toString()}
          icon="📊"
        />
      </div>

      {/* Recordes */}
      <div className="stats-page__section">
        <h2 className="stats-page__section-title">🏆 Recordes do Ano</h2>
        <div className="stats-page__records">
          <div className="stats-page__record-card">
            <span className="stats-page__record-icon">💸</span>
            <div className="stats-page__record-content">
              <h3>Maior Despesa</h3>
              <p className="stats-page__record-value text-danger">
                {stats.highestExpense.value ? fmt(stats.highestExpense.value) : "N/A"}
              </p>
              <p className="stats-page__record-detail">
                {stats.highestExpense.description || "Nenhuma despesa"}
              </p>
            </div>
          </div>

          <div className="stats-page__record-card">
            <span className="stats-page__record-icon">💰</span>
            <div className="stats-page__record-content">
              <h3>Maior Receita</h3>
              <p className="stats-page__record-value text-success">
                {stats.highestIncome.value ? fmt(stats.highestIncome.value) : "N/A"}
              </p>
              <p className="stats-page__record-detail">
                {stats.highestIncome.description || "Nenhuma receita"}
              </p>
            </div>
          </div>

          <div className="stats-page__record-card">
            <span className="stats-page__record-icon">📊</span>
            <div className="stats-page__record-content">
              <h3>Categoria Mais Cara</h3>
              <p className="stats-page__record-value text-danger">
                {stats.topCategory ? fmt(stats.topCategory[1]) : "N/A"}
              </p>
              <p className="stats-page__record-detail">
                {stats.topCategory ? stats.topCategory[0] : "Nenhuma categoria"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Médias */}
      <div className="stats-page__section">
        <h2 className="stats-page__section-title">📈 Médias</h2>
        <div className="stats-page__averages">
          <div className="stats-page__average-card">
            <span className="stats-page__average-icon">💸</span>
            <div className="stats-page__average-content">
              <h3>Média por Despesa</h3>
              <p className="stats-page__average-value text-danger">
                {fmt(stats.avgExpense)}
              </p>
            </div>
          </div>

          <div className="stats-page__average-card">
            <span className="stats-page__average-icon">💰</span>
            <div className="stats-page__average-content">
              <h3>Média por Receita</h3>
              <p className="stats-page__average-value text-success">
                {fmt(stats.avgIncome)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferências */}
      <div className="stats-page__section">
        <h2 className="stats-page__section-title">🎯 Preferências</h2>
        <div className="stats-page__preferences">
          <div className="stats-page__preference-card">
            <span className="stats-page__preference-icon">💳</span>
            <div className="stats-page__preference-content">
              <h3>Método de Pagamento Favorito</h3>
              <p className="stats-page__preference-value">
                {stats.favoriteMethod ? stats.favoriteMethod[0] : "Nenhum método"}
              </p>
            </div>
          </div>

          <div className="stats-page__preference-card">
            <span className="stats-page__preference-icon">🏷️</span>
            <div className="stats-page__preference-content">
              <h3>Categoria Mais Usada</h3>
              <p className="stats-page__preference-value">
                {stats.favoriteCategory ? stats.favoriteCategory[0] : "Nenhuma categoria"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Mensal */}
      <div className="stats-page__section">
        <h2 className="stats-page__section-title">📅 Visão Mensal</h2>
        <div className="stats-page__monthly-chart">
          <div className="stats-page__month-bars">
            {stats.monthlyData.map((month, index) => (
              <div key={month.month} className="stats-page__month-bar">
                <div className="stats-page__month-label">{month.month}</div>
                <div className="stats-page__month-bars">
                  <div
                    className="stats-page__month-expense"
                    style={{
                      height: stats.maxValue > 0 ? `${(month.expenses / stats.maxValue) * 100}%` : '2px'
                    }}
                    title={`Despesas: ${fmt(month.expenses)}`}
                  />
                  <div
                    className="stats-page__month-income"
                    style={{
                      height: stats.maxValue > 0 ? `${(month.incomes / stats.maxValue) * 100}%` : '2px'
                    }}
                    title={`Receitas: ${fmt(month.incomes)}`}
                  />
                </div>
                <div className={`stats-page__month-balance ${
                  month.balance >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {fmt(month.balance)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

StatsPage.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object),
  finance: PropTypes.object
};