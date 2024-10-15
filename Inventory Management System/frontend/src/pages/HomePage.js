// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css'; // Custom styles for the homepage
import logo from '../assets/InnerVentory Button.png'; // Placeholder for your logo

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src={logo} alt="Breast Intentions Logo" className="logo" />
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/bra-inventory" className="nav-link">Bra Inventory</Link>
          <Link to="/event-inventory" className="nav-link">Event Inventory</Link>
        </nav>
      </header>

      <main className="content">
        <h1>Welcome to the Breast Intentions Inventory Management System</h1>
        <p>This application helps manage bras and events efficiently.</p>

        <div className="features-section">
          <h2>Features:</h2>
          <ul>
            Add, edit, and delete bras in the inventory.
            Manage event details and attendee information.
            Search for specific bras and events easily.
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
