// HomePage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Custom styles for the homepage
import logo from "../assets/InnerVentory Button.png";
import logo2 from "../assets/BreastIntentionsLogo.png";
import { IoIosLogOut } from "react-icons/io";
import "./TwoFA.css"

const TwoFA = () => {
  useEffect(() => {
    // Ensure your custom script initializes after component is mounted
    const script = document.createElement("script");
    script.src = "/scripts.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo-container">
          <img src={logo} alt="Breast Intentions Logo" className="logo" />
          <img src={logo2} alt="Breast Intentions Logo" className="logo" />
        </div>
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/bra-inventory" className="nav-link">
            Bra Inventory
          </Link>
          <Link to="/event-inventory" className="nav-link">
            Event Inventory
          </Link>
          <Link to="/two-fa" className="nav-link" id="enable2FAButton">
            2 FA Authentication
          </Link>
          <Link to="/logout" title="Logout">
            <IoIosLogOut size={25} />
          </Link>
        </nav>
      </header>

      <div className="border-bottom border-dark pt-4 mb-4"></div>

      <div id="2FABox" className="d-flex flex-row justify-content-center align-items-center gap-3">
        {/* <button id="enable2FAButton" className="btn small btn-success">
          UPDATE/ENABLE 2FA
        </button> */}
        <div id="twoFAFormHolder" className="d-flex flex-row align-items-center gap-3">
          <img id="qrImage" height="150" width="150" alt="QR Image" />
          <form id="twoFAUpdateForm" className="d-flex flex-column gap-2">
            <input
              type="text"
              name="code"
              placeholder="2 FA Code"
              className="form-control"
            />
            <button className="btn small btn-primary" type="submit" id="set">SET</button>
          </form>
        </div>
      </div>

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

export default TwoFA;
