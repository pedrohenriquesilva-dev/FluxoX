import Sidebar from "./Sidebar.jsx";
import "./Layout.css";

export default function Layout({ currentPage, onNavigate, children }) {
  return (
    <div className="layout">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="layout__main">{children}</main>
    </div>
  );
}