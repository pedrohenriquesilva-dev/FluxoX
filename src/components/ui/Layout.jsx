import PropTypes from "prop-types";
import MobileNav from "./MobileNav.jsx";
import Sidebar from "./Sidebar.jsx";
import "./Layout.css";

export default function Layout({ currentPage, onNavigate, children }) {
  return (
    <div className="layout">
      <aside className="layout__sidebar-wrap">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      </aside>
      <main className="layout__main">{children}</main>
      <MobileNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}

Layout.propTypes = {
  currentPage: PropTypes.string,
  onNavigate: PropTypes.func,
  children: PropTypes.node
};
