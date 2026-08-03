import PropTypes from "prop-types";
import Icon from "./Icon.jsx";
import "./MobileNav.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: "dashboard", label: "Início" },
  { id: "expenses", icon: "expenses", label: "Despesas" },
  { id: "incomes", icon: "incomes", label: "Receitas" },
  { id: "annual", icon: "annual", label: "Anual" },
  { id: "savings", icon: "savings", label: "Reserva" },
  { id: "conference", icon: "conference", label: "Conferência" },
  { id: "settings", icon: "settings", label: "Ajustes" }
];

export default function MobileNav({ currentPage, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Navegação mobile">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`mobile-nav__item ${currentPage === item.id ? "mobile-nav__item--active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} className="mobile-nav__icon" />
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
