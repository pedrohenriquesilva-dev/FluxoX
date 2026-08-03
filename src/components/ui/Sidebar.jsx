import ThemeToggle from "./ThemeToggle.jsx";
import Icon from "./Icon.jsx";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: "dashboard", label: "Dashboard" },
  { id: "expenses", icon: "expenses", label: "Despesas" },
  { id: "incomes", icon: "incomes", label: "Receitas" },
  { id: "annual", icon: "annual", label: "Anual" },
  { id: "savings", icon: "savings", label: "Poupança" },
  { id: "conference", icon: "conference", label: "Conferência" },
  { id: "reports", icon: "annual", label: "Relatórios" },
  { id: "stats", icon: "trendUp", label: "Estatísticas" },
  { id: "settings", icon: "settings", label: "Configura\u00e7\u00f5es" }
];

export default function Sidebar({ currentPage, onNavigate, isDark, onToggleTheme }) {
  const today = new Date().toLocaleDateString("pt-BR");

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <div className="sidebar__logo-mark">
            <Icon name="incomes" />
          </div>
          <div>
            <div className="sidebar__logo-name">FluxoX</div>
            <div className="sidebar__logo-sub">Controle financeiro</div>
          </div>
        </div>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>

      <nav className="sidebar__nav" aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar__item ${currentPage === item.id ? "sidebar__item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} className="sidebar__item-icon" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className="sidebar__footer">Hoje: {today}</footer>
    </aside>
  );
}