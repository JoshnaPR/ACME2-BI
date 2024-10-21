// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Custom styles for the homepage
import logo from '../assets/InnerVentory Button.png';
import logo2 from '../assets/BreastIntentionsLogo.png';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo-container">
          <img src={logo} alt="Breast Intentions Logo" className="logo" />
          <img src={logo2} alt="Breast Intentions Logo" className="logo" />
        </div>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/bra-inventory" className="nav-link">Bra Inventory</Link>
          <Link to="/event-inventory" className="nav-link">Event Inventory</Link>
        </nav>
      </header>

      <main className="content">
        <h1>Welcome to the Breast Intentions Inventory Management System</h1>

        <div className="features-section">
          <h2>Features:</h2>
          <ul>
            <li><span>📦</span> Add, edit, and delete bras in the inventory.</li>
            <li><span>🗓️</span> Manage event details and attendee information.</li>
            <li><span>🔍</span> Search for specific bras, events, or attendees easily.</li>
          </ul>
        </div>

        <div className="cta-buttons">
          <Link to="/bra-inventory" className="cta-button">Go to Bra Inventory</Link>
          <Link to="/event-inventory" className="cta-button">Go to Event Inventory</Link>
        </div>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2024 Breast Intentions of Washington. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
