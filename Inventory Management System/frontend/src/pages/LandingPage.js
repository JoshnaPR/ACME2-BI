import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"; // Ensure the CSS is imported

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header>
        <h1>Welcome to Breast Intentions - InnerVentory </h1>
        <p>Empowering confidence, one bra at a time.</p>
      </header>

      <div className="cta-buttons">
        <Link to="/login" className="cta-button">
          Login
        </Link>
        <Link to="/signup" className="cta-button">
          Sign Up
        </Link>
      </div>

      {/* <footer>
        <p>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </footer> */}
    </div>
  );
};

export default LandingPage;
