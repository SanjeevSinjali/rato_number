// src/components/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import ProfilePic from '../assets/profile.jpg'; // ✅ Adjust this if needed

const Dashboard = () => {
  return (
    <>
      <header className="header container">
        <div className="logo">RatoNumber</div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vehicles">Vehicles</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li>
              <img
                src={ProfilePic}
                alt="Profile"
                className="profile-image"
              />
            </li>
          </ul>
        </nav>
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/logout">Sign Out</Link></li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <h2>Welcome to your Dashboard!</h2>
          <p>This is where you can manage your bookings and profile.</p>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
