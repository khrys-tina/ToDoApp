import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/tasks">To-Do</Link>
      <div className="ms-auto">
        {token ? (
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
            <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
