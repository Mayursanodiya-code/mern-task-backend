import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.link}>
          🏠 Dashboard
        </Link>
        <Link to="/create" style={styles.link}>
          📝 Create Task
        </Link>
      </div>

      <div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🔓 Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
