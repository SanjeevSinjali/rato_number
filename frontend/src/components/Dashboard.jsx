// src/components/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePic from '../assets/profile.jpg'; // ✅ Ensure this path is correct

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignOutClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSignOut = () => {
    setShowModal(false);
    navigate('/'); // 👈 Redirect to HomePage
  };

  const cancelSignOut = () => {
    setShowModal(false); // 👈 Close modal
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3 className="site-name">RatoNumber</h3>
          <img src={ProfilePic} alt="Profile" className="profile-image" />
        </div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/vehicles">Vehicles</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><a href="#signout" onClick={handleSignOutClick}>Sign Out</a></li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
          />
        </div>

        <div className="dashboard-content">
          <h2>Welcome to your Dashboard!</h2>
          <p>This is where you can manage your bookings and profile.</p>
        </div>
      </main>

      {/* 🔽 Sign Out Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Do you want to sign out?</p>
            <div className="modal-buttons">
              <button onClick={confirmSignOut} className="yes-button">Yes</button>
              <button onClick={cancelSignOut} className="no-button">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
