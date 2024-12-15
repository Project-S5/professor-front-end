import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_admin');
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/professor-dashboard');
  };

  return (

    <nav className="navbar">
      <div className="navbar__left">
        <button className="navbar__button" onClick={handleDashboard}>
          Dashboard
        </button>
      </div>
      <div className="navbar__right">
        <button className="navbar__button navbar__button--logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
