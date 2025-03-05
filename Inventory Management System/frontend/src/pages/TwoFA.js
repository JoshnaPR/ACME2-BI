import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Custom styles for the homepage
import logo from "../assets/InnerVentory Button.png";
import logo2 from "../assets/BreastIntentionsLogo.png";
import { IoIosLogOut } from "react-icons/io";
import "../styles/TwoFA.css"

const TwoFA = () => {
  const [qrImage, setQrImage] = useState("");
  const [is2FAReady, setIs2FAReady] = useState(false);

  useEffect(() => {
    handleEnable2FA();
  }, []);

  const handleEnable2FA = async () => {
    try {
      const token = localStorage.getItem("token");
      document.cookie = `token=${token}`;
      const response = await fetch("http://localhost:5000/qrImage", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setQrImage(data.image);
        setIs2FAReady(true);
      } else {
        alert("Unable to fetch the QR image.");
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      alert("An error occurred while enabling 2FA.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = e.target.code.value;

    try {
      const response = await fetch(`http://localhost:5000/set2FA?code=${code}`, {
        method: "GET",
        credentials: "include",
      });

      const { success } = await response.json();
      if (success) {
        alert("SUCCESS: 2FA enabled/updated.");
      } else {
        alert("ERROR: Unable to update/enable 2FA.");
      }

      e.target.reset();
    } catch (error) {
      console.error("Error updating 2FA:", error);
      alert("An error occurred while updating 2FA.");
    }
  };

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
          <Link to="/two-fa" className="nav-link">
            2 FA Authentication
          </Link>
          <Link to="/logout" title="Logout">
            <IoIosLogOut size={25} />
          </Link>
        </nav>
      </header>

      <div className="border-bottom border-dark pt-4 mb-4"></div>

      <div id="2FABox" className="d-flex flex-row justify-content-center align-items-center gap-3">
        {is2FAReady && (
          <div id="twoFAFormHolder" className="d-flex flex-row align-items-center gap-3 ">
            <img id="qrImage" height="150" width="150" src={qrImage} alt="QR" />
            <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                name="code"
                placeholder="2 FA Code"
                className="form-control"
              />
              <button className="btn small btn-primary" type="submit" id="set">SET</button>
            </form>
          </div>
        )}
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
