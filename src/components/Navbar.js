// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="navbar-content">
        {(location.pathname === '/dashboard' || location.pathname === '/admin') ? (
          <button onClick={onLogout} className="logout-button">Logout</button>
        ) : location.pathname === '/login' ? (
          <Link to="/" className="login-button">Home</Link>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
