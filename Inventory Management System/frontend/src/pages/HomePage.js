// HomePage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Custom styles for the homepage
import logo from "../assets/InnerVentory Button.png";
import logo2 from "../assets/BreastIntentionsLogo.png";
import { IoIosLogOut } from "react-icons/io";
import { fetchLogs } from "../services/logService";

const HomePage = () => {

  const [logs, setLogs] = useState([]);
  const [showLogsModal, setShowLogsModal] = useState(false);

  useEffect(() => {
    console.log("Logs modal state changed: ", showLogsModal);
    if (showLogsModal) {
      const getLogs = async () => {
        try {
          const logData = await fetchLogs();
          console.log("Fetched logs:", logData);
          setLogs(logData || []);
        } catch (error) {
          console.error("Failed to fetch logs:", error);
        }
      };
      getLogs();
    }
  }, [showLogsModal]);  

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo-container">
          <img src={logo} alt="Breast Intentions Logo" className="logo" />
          <img src={logo2} alt="Breast Intentions Logo" className="logo" />
        </div>
        <nav className="navbar">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/bra-inventory" className="nav-link">
            Bra Inventory
          </Link>
          <Link to="/event-inventory" className="nav-link">
            Event Inventory
          </Link>
          <Link to="/logout" title="Logout">
            <IoIosLogOut size={25} />
          </Link>
        </nav>
      </header>

      <main className="content">
        <h1>Welcome to the Breast Intentions Inventory Management System</h1>

        <div className="features-section">
          <h2>Features:</h2>
          <ul>
            <li>
              <span>📦</span> Add, edit, and delete bras in the inventory.
            </li>
            <li>
              <span>🗓️</span> Manage event details and attendee information.
            </li>
            <li>
              <span>🔍</span> Search for specific bras, events, or attendees
              easily.
            </li>
          </ul>
        </div>

        <div className="cta-buttons">
          <Link to="/bra-inventory" className="cta-button">
            Go to Bra Inventory
          </Link>
          <Link to="/event-inventory" className="cta-button">
            Go to Event Inventory
          </Link>
        </div>

        <button onClick={() => setShowLogsModal(true)} className="cta-button">
          Show Logs
        </button>

        {showLogsModal && (
          <div className="modal-overlay" onClick={() => setShowLogsModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Breast Intentions Logs</h2>
              <div className="log-container">
                {logs.length > 0 ? (
                  <ul>
                    {logs.map((log, index) => (
                      <li key={index}>
                        <strong>{new Date(log.timestamp).toLocaleString()}</strong>
                        <span> User - {log.username} </span><br />
                        <span>{log.action}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Logs Found</p>
                )}
              </div>
              <button className="close-button" onClick={() => setShowLogsModal(false)}>Close</button>
            </div>
          </div>
        )}
      </main>

      <footer className="homepage-footer">
        <div className="footer-content">
          <p>&copy; 2024 Breast Intentions. All rights reserved.</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/breastintentionswa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/breastintentionsofwa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;