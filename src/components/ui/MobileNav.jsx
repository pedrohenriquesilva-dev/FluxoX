import PropTypes from "prop-types";
import "./MobileNav.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: "\u{1F3E0}", label: "Inicio" },
  { id: "expenses", icon: "\u{1F4B8}", label: "Despesas" },
  { id: "incomes", icon: "\u{1F4B0}", label: "Receitas" },
  { id: "annual", icon: "\u{1F4C5}", label: "Anual" },
  { id: "savings", icon: "\u{1F4B5}", label: "Reserva" },
  { id: "conference", icon: "\u{1F4C8}", label: "Conferencia" },
  { id: "settings", icon: "\u2699", label: "Ajustes" }
];

export default function MobileNav({ currentPage, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Navegacao mobile">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`mobile-nav__item ${currentPage === item.id ? "mobile-nav__item--active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="mobile-nav__icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="mobile-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

MobileNav.propTypes = {
  currentPage: PropTypes.string,
  onNavigate: PropTypes.func
};
