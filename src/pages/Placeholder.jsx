import Icon from "../components/ui/Icon.jsx";
import "./Placeholder.css";

const PAGE_INFO = {
  dashboard: {
    icon: "dashboard",
    title: "Dashboard",
    sub: "Visão geral das suas finanças pessoais."
  },
  expenses: {
    icon: "expenses",
    title: "Despesas",
    sub: "Acompanhe e organize todas as suas saídas."
  },
  incomes: {
    icon: "incomes",
    title: "Receitas",
    sub: "Registre entradas e fontes de renda."
  },
  annual: {
    icon: "annual",
    title: "Anual",
    sub: "Visualize o desempenho financeiro do ano."
  },
  savings: {
    icon: "savings",
    title: "Poupança",
    sub: "Planeje reservas e objetivos de economia."
  },
  conference: {
    icon: "conference",
    title: "Conferência",
    sub: "Confira consistência entre categorias e períodos."
  },
  settings: {
    icon: "settings",
    title: "Configurações",
    sub: "Ajustes gerais do aplicativo FluxoX."
  }
};

export default function Placeholder({ page }) {
  const info = PAGE_INFO[page] ?? PAGE_INFO.dashboard;

  return (
    <section className="placeholder">
      <Icon name={info.icon} className="placeholder__icon" />
      <h1 className="placeholder__title">{info.title}</h1>
      <p className="placeholder__sub text-muted">{info.sub}</p>
      <span className="placeholder__badge font-mono">em construção</span>
    </section>
  );
}