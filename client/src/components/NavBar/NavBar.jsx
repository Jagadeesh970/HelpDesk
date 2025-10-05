import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Store/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser({ token: null, role: null, userId: null, username: null });
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="logo" onClick={() => navigate("/")}>HelpDesk</div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      <div className={`navbar-list ${menuOpen ? "show" : ""}`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
          Tickets
        </NavLink>

        {user.role === "user" && (
          <NavLink to="/createticket" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
            Create Ticket
          </NavLink>
        )}

        {user.role === "agent" && (
          <NavLink to="/agent" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
            Agent Dashboard
          </NavLink>
        )}

        {user.role === "admin" && (
          <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
            Admin Dashboard
          </NavLink>
        )}

        {!user.token ? (
          <NavLink to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</NavLink>
        ) : (
          <div className="user-info">
            <span className="username">Hi, {user.username || user.role}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
