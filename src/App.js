<<<<<<< Updated upstream
// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom'; // Import Navigate
import LessonsPage from './pages/LessonsPage';
import LessonDetails from './pages/LessonDetails';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');
>>>>>>> Stashed changes


<<<<<<< Updated upstream
  return (
    <Router>  {/* Wrap your app in Router */}
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <HomePage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
=======

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      
        <Route path="/professor-dashboard" element={isAuthenticated ? <Dashboard />: <Navigate to="/" />} />
        <Route path="/lessons/:subjectId/" element={isAuthenticated ? <LessonsPage />: <Navigate to="/" />} />
        <Route path="/lesson/:lessonId/students" element={isAuthenticated ? <LessonDetails />: <Navigate to="/" />} />
>>>>>>> Stashed changes

       
      </Routes>
    </Router>
  );
};

export default App;
