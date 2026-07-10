import ThemeToggle from "./ThemeToggle.jsx";
import PropTypes from "prop-types";
import MobileNav from "./MobileNav.jsx";
import Sidebar from "./Sidebar.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import "./Layout.css";

export default function Layout({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  expenses = [],
  incomes = [],
  children
}) {
  function handleSelectTransaction(transaction) {
    if (transaction.type === "expense") {
      onNavigate("expenses");
    } else if (transaction.type === "income") {
      onNavigate("incomes");
    }
  }

  return (
    <div className="layout" role="application">
      <aside className="layout__sidebar-wrap" aria-label="Navegação principal">
        <Sidebar
          currentPage={currentPage}
          onNavigate={onNavigate}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
        />
      </aside>
      <div className="layout__content">
        <header className="layout__search-header" aria-label="Busca global">
          <GlobalSearch
            expenses={expenses}
            incomes={incomes}
            onSelectTransaction={handleSelectTransaction}
          />
          <div className="layout__theme-mobile">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </header>
        <main id="main-content" className="layout__main" tabIndex={-1}>
          {children}
        </main>
        <MobileNav currentPage={currentPage} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

Layout.propTypes = {
  currentPage: PropTypes.string,
  onNavigate: PropTypes.func,
  isDark: PropTypes.bool,
  onToggleTheme: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node
};