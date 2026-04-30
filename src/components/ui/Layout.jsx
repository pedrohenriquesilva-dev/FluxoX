import PropTypes from "prop-types";
import MobileNav from "./MobileNav.jsx";
import Sidebar from "./Sidebar.jsx";
import "./Layout.css";

export default function Layout({ currentPage, onNavigate, isDark, onToggleTheme, children }) {
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
      <main className="layout__main">{children}</main>
      <MobileNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}

Layout.propTypes = {
  currentPage: PropTypes.string,
  onNavigate: PropTypes.func,
  isDark: PropTypes.bool,
  onToggleTheme: PropTypes.func,
  children: PropTypes.node
};
