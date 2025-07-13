import React, { useState } from 'react';
import './Profile.css';
import illustration from '../assets/profileresetillu.jpg'; // Make sure this image exists

const Profile = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-form">
          <h2>Edit Profile</h2>
          <form>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset Profile
            </button>
          </form>
        </div>
        <div className="profile-illustration">
          <img src={illustration} alt="Profile Reset Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
