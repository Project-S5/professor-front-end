import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_admin');
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register-professor');
  };

  const handleDashboard = () => {
    navigate('/professor-dashboard');
  };

  

  return (
<<<<<<< Updated upstream
    <header className="header">
      <div className="navbar-content">
        {location.pathname === '/dashboard' ? (
          <button onClick={onLogout} className="logout-button">Logout</button>
        ) : location.pathname === '/login' ? (
          <Link to="/" className="login-button">Home</Link>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
=======
    <nav className="navbar">
      <div className="navbar__left">
        {/* <button className="navbar__button" onClick={handleDashboard}>
          Home
        </button>
        <button className="navbar__button" onClick={handleSubjectsPerGroup}>
          Subjects Per Group
        </button> */}
        <button className="navbar__button" onClick={handleDashboard}>
          Dashboard
        </button>
>>>>>>> Stashed changes
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
