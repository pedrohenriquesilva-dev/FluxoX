import "./Placeholder.css";

const PAGE_INFO = {
  dashboard: {
    icon: "\u{1F3E0}",
    title: "Dashboard",
    sub: "Visao geral das suas financas pessoais."
  },
  expenses: {
    icon: "\u{1F4B8}",
    title: "Despesas",
    sub: "Acompanhe e organize todas as suas saidas."
  },
  incomes: {
    icon: "\u{1F4B0}",
    title: "Receitas",
    sub: "Registre entradas e fontes de renda."
  },
  annual: {
    icon: "\u{1F4C5}",
    title: "Anual",
    sub: "Visualize o desempenho financeiro do ano."
  },
  savings: {
    icon: "\u{1F4B5}",
    title: "Poupanca",
    sub: "Planeje reservas e objetivos de economia."
  },
  conference: {
    icon: "\u{1F4C8}",
    title: "Conferencia",
    sub: "Confira consistencia entre categorias e periodos."
  },
  settings: {
    icon: "\u2699",
    title: "Configuracoes",
    sub: "Ajustes gerais do aplicativo FluxoX."
  }
};

export default function Placeholder({ page }) {
  const info = PAGE_INFO[page] ?? PAGE_INFO.dashboard;

  return (
    <section className="placeholder">
      <div className="placeholder__icon" aria-hidden="true">
        {info.icon}
      </div>
      <h1 className="placeholder__title">{info.title}</h1>
      <p className="placeholder__sub text-muted">{info.sub}</p>
      <span className="placeholder__badge font-mono">em construcao</span>
    </section>
  );
}