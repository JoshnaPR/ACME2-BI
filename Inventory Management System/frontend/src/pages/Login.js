import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css"; // Ensure this matches the correct file path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [role, setRole] = useState(""); // Store the user's role after login
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Send login credentials (email and password) to the backend
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // If 2FA is required, show OTP input form
      if (response.data.twoFactorRequired) {
        setIsOtpSent(true); // Show OTP input form
        setSuccessMessage("OTP sent to your registered email.");
      } else if (response.data.token) {
        // If login is successful, store the token in localStorage
        setRole(response.data.role); // Set user role
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setSuccessMessage("Login successful!");
        navigate("/home"); // Redirect to Home Page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  // Handle OTP form submission after login
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Verify the OTP entered by the user
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });

      if (response.data.success && response.data.token) {
        setRole(response.data.role); // Update role after successful OTP verification
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setSuccessMessage("2FA verification successful!");
        navigate("/home"); // Redirect to Home Page
      } else {
        setError("Invalid OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error verifying OTP.");
    }
  };

  return (
    <div className="wrapper">
      <span className="bg-animate"></span>
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
            <i className="bx bxs-user"></i>
          </div>

          {!isOtpSent && (
            <div className="input-box">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
          )}

          {isOtpSent && (
            <div className="input-box">
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label>OTP</label>
              <i className="bx bxs-key"></i>
            </div>
          )}

          <button type="submit" className="btn">
            {isOtpSent ? "Verify OTP" : "Login"}
          </button>
        </form>

        <div className="logreg-link">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="register-link">
              Sign Up
            </a>
          </p>
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="info-text login">
        <h2>Welcome Back!</h2>
        <p>We're excited to see what changes you'll bring to someone's life today!</p>
      </div>
    </div>
  );
}

export default Login;
