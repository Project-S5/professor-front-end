import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom'; // Import Navigate
import LessonsPage from './pages/LessonsPage';
import LessonDetails from './pages/LessonDetails';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      
        <Route path="/professor-dashboard" element={isAuthenticated ? <Dashboard />: <Navigate to="/" />} />
        <Route path="/lessons/:subjectId/" element={isAuthenticated ? <LessonsPage />: <Navigate to="/" />} />
        <Route path="/lesson/:lessonId/students" element={isAuthenticated ? <LessonDetails />: <Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;
