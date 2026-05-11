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
    // Navegar para a página apropriada
    if (transaction.type === "expense") {
      onNavigate("expenses");
    } else if (transaction.type === "income") {
      onNavigate("incomes");
    }
  }

  return (
    <div className="layout">
      <aside className="layout__sidebar-wrap">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={onNavigate} 
          isDark={isDark}
          onToggleTheme={onToggleTheme}
        />
      </aside>
      <div className="layout__content">
        <header className="layout__search-header">
          <GlobalSearch 
            expenses={expenses}
            incomes={incomes}
            onSelectTransaction={handleSelectTransaction}
          />
        </header>
        <main className="layout__main">{children}</main>
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
