import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <h1>Attendance Tracker</h1>
        <p className="tagline">Effortless attendance management for universities</p>
      </section>

      {/* Feature Cards */}
      <div className="container my-5">
        <div className="row text-center justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="feature-card">
              <h5>Secure Login</h5>
              <p>Role-based access for professors and admins.</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="feature-card">
              <h5>Attendance</h5>
              <p>Quickly mark and review attendance records.</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="feature-card">
              <h5>Admin Tools</h5>
              <p>Manage users and view attendance insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
