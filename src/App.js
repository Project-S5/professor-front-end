import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/attendance')
  //     .then(response => response.json())
  //     .then(data => {
  //       setAttendanceData(data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard attendanceData={attendanceData} />} />

      </Routes>
    </Router>
  );
}

export default App;
