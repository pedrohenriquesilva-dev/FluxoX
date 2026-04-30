import ThemeToggle from "./ThemeToggle.jsx";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: "\u{1F3E0}", label: "Dashboard" },
  { id: "expenses", icon: "\u{1F4B8}", label: "Despesas" },
  { id: "incomes", icon: "\u{1F4B0}", label: "Receitas" },
  { id: "annual", icon: "\u{1F4C5}", label: "Anual" },
  { id: "savings", icon: "\u{1F4B5}", label: "Poupanca" },
  { id: "conference", icon: "\u{1F4C8}", label: "Conferencia" },
  { id: "settings", icon: "\u2699", label: "Configuracoes" }
];

export default function Sidebar({ currentPage, onNavigate, isDark, onToggleTheme }) {
  const today = new Date().toLocaleDateString("pt-BR");

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <div className="sidebar__logo-mark">{"\u{1F4B0}"}</div>
          <div>
            <div className="sidebar__logo-name">FluxoX</div>
            <div className="sidebar__logo-sub">Controle financeiro</div>
          </div>
        </div>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>

      <nav className="sidebar__nav" aria-label="Navegacao principal">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar__item ${currentPage === item.id ? "sidebar__item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar__item-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className="sidebar__footer">Hoje: {today}</footer>
    </aside>
  );
}