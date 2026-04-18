import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="top-nav">
      <div className="logo">Catalyst</div>

      <nav className="nav-links">
        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/my-habits" className={isActive("/my-habits")}>
          My Habits
        </Link>
        <a href="#">Progress</a>
        <a href="#">Calendar</a>
        <a href="#">Settings</a>
      </nav>

      <div className="profile-pill">
        <Link to="/profile">AD</Link>
      </div>
    </header>
  );
}