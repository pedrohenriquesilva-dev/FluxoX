import { useMemo } from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/ui/PageHeader.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { fmt } from "../utils/formatters.js";
import "./ReportsPage.css";

export default function ReportsPage({ expenses = [], incomes = [] }) {
  const reports = useMemo(() => {
    // Totais gerais
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.value || 0), 0);
    const totalIncomes = incomes.reduce((sum, inc) => sum + Number(inc.value || 0), 0);
    const netBalance = totalIncomes - totalExpenses;

    // Totais por categoria (despesas)
    const expensesByCategory = expenses.reduce((acc, exp) => {
      const category = exp.category || "Outros";
      acc[category] = (acc[category] || 0) + Number(exp.value || 0);
      return acc;
    }, {});

    // Totais por categoria (receitas)
    const incomesByCategory = incomes.reduce((acc, inc) => {
      const category = inc.category || "Outros";
      acc[category] = (acc[category] || 0) + Number(inc.value || 0);
      return acc;
    }, {});

    // Totais por forma de pagamento
    const paymentsByMethod = expenses.reduce((acc, exp) => {
      const method = exp.method || "Outros";
      acc[method] = (acc[method] || 0) + Number(exp.value || 0);
      return acc;
    }, {});

    // Top categorias de despesa
    const topExpenseCategories = Object.entries(expensesByCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    // Top categorias de receita
    const topIncomeCategories = Object.entries(incomesByCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    // Top formas de pagamento
    const topPaymentMethods = Object.entries(paymentsByMethod)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      totalExpenses,
      totalIncomes,
      netBalance,
      expensesByCategory,
      incomesByCategory,
      paymentsByMethod,
      topExpenseCategories,
      topIncomeCategories,
      topPaymentMethods
    };
  }, [expenses, incomes]);

  return (
    <section className="reports-page">
      <PageHeader
        title="Relatórios"
        subtitle="Análise detalhada de receitas, despesas e padrões de consumo."
      />

      {/* Cards de resumo */}
      <div className="reports-page__summary">
        <StatCard
          title="Total de Receitas"
          value={fmt(reports.totalIncomes)}
          icon="💰"
          trend="positive"
        />
        <StatCard
          title="Total de Despesas"
          value={fmt(reports.totalExpenses)}
          icon="💸"
          trend="negative"
        />
        <StatCard
          title="Saldo Líquido"
          value={fmt(reports.netBalance)}
          icon={reports.netBalance >= 0 ? "📈" : "📉"}
          trend={reports.netBalance >= 0 ? "positive" : "negative"}
        />
        <StatCard
          title="Transações Totais"
          value={`${expenses.length + incomes.length}`}
          icon="📊"
        />
      </div>

      {/* Seção de categorias */}
      <div className="reports-page__section">
        <h2 className="reports-page__section-title">📊 Análise por Categoria</h2>

        <div className="reports-page__grid">
          {/* Top Despesas por Categoria */}
          <div className="reports-page__card">
            <h3 className="reports-page__card-title">💸 Top Despesas por Categoria</h3>
            <div className="reports-page__list">
              {reports.topExpenseCategories.map(([category, value], index) => (
                <div key={category} className="reports-page__list-item">
                  <div className="reports-page__list-header">
                    <span className="reports-page__list-rank">#{index + 1}</span>
                    <span className="reports-page__list-label">{category}</span>
                    <span className="reports-page__list-value text-danger">{fmt(value)}</span>
                  </div>
                  <div className="reports-page__progress-bar">
                    <div
                      className="reports-page__progress-fill"
                      style={{
                        width: `${(value / reports.totalExpenses) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Receitas por Categoria */}
          <div className="reports-page__card">
            <h3 className="reports-page__card-title">💰 Top Receitas por Categoria</h3>
            <div className="reports-page__list">
              {reports.topIncomeCategories.map(([category, value], index) => (
                <div key={category} className="reports-page__list-item">
                  <div className="reports-page__list-header">
                    <span className="reports-page__list-rank">#{index + 1}</span>
                    <span className="reports-page__list-label">{category}</span>
                    <span className="reports-page__list-value text-success">{fmt(value)}</span>
                  </div>
                  <div className="reports-page__progress-bar">
                    <div
                      className="reports-page__progress-fill reports-page__progress-fill--income"
                      style={{
                        width: `${(value / reports.totalIncomes) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seção de formas de pagamento */}
      <div className="reports-page__section">
        <h2 className="reports-page__section-title">💳 Formas de Pagamento</h2>

        <div className="reports-page__card">
          <h3 className="reports-page__card-title">Distribuição por Método</h3>
          <div className="reports-page__list">
            {reports.topPaymentMethods.map(([method, value], index) => (
              <div key={method} className="reports-page__list-item">
                <div className="reports-page__list-header">
                  <span className="reports-page__list-rank">#{index + 1}</span>
                  <span className="reports-page__list-label">{method}</span>
                  <span className="reports-page__list-value text-muted">{fmt(value)}</span>
                </div>
                <div className="reports-page__progress-bar">
                  <div
                    className="reports-page__progress-fill reports-page__progress-fill--payment"
                    style={{
                      width: `${(value / reports.totalExpenses) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela detalhada de categorias */}
      <div className="reports-page__section">
        <h2 className="reports-page__section-title">📋 Detalhamento Completo</h2>

        <div className="reports-page__table-wrap">
          <table className="reports-page__table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
                <th>% do Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys({...reports.expensesByCategory, ...reports.incomesByCategory}).map(category => {
                const income = reports.incomesByCategory[category] || 0;
                const expense = reports.expensesByCategory[category] || 0;
                const balance = income - expense;
                const total = income + expense;
                const percentage = reports.totalIncomes + reports.totalExpenses > 0
                  ? (total / (reports.totalIncomes + reports.totalExpenses)) * 100
                  : 0;

                return (
                  <tr key={category}>
                    <td className="reports-page__category">{category}</td>
                    <td className="text-success">{fmt(income)}</td>
                    <td className="text-danger">{fmt(expense)}</td>
                    <td className={balance >= 0 ? "text-success" : "text-danger"}>
                      {fmt(balance)}
                    </td>
                    <td>{percentage.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

ReportsPage.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object)
};