import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import CarHomePage from '../assets/CarHomePage.jpg';

const Homepage = () => {
  return (
    <>
      {/* Header Navigation */}
      <header className="header container">
        <div className="logo">RatoNumber</div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vehicles">Vehicles</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li>
              <Link to="/login" className="login-button">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${CarHomePage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-content container">
          <h1>Your ride, Your rules</h1>
          <p>Rent premium cars with ease—reliable, affordable and ready when you are.</p>
          <button className="btn">Explore</button>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container">
        <div className="booking-section">
          <h2 className="section-title">Book your car</h2>
          <form className="booking-form">
            <div className="form-group">
              <label htmlFor="carType">Car type</label>
              <select id="carType" required>
                <option value="">Select car type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pickup">Pick-up location</label>
              <input
                type="text"
                id="pickup"
                placeholder="Enter location"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dropoff">Drop-off location</label>
              <input
                type="text"
                id="dropoff"
                placeholder="Enter location"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rentalDate">Rental date</label>
              <input
                type="date"
                id="rentalDate"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="returnDate">Return date</label>
              <input
                type="date"
                id="returnDate"
                required
              />
            </div>

            <button
              type="submit"
              className="btn"
              style={{ width: '80%' }}
            >
              Find Cars
            </button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="feature-card">
          <div className="feature-icon">🚗</div>
          <h3>Availability</h3>
          <p>Our cars are available whenever you need them.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛋️</div>
          <h3>Comfort</h3>
          <p>Our rentals come with optional security detail upon request for your peace of mind.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Savings</h3>
          <p>Enjoy transparent pricing with no hidden charges.</p>
        </div>
      </section>
    </>
  );
};

export default Homepage;
