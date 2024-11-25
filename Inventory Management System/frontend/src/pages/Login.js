import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.twoFactorRequired) {
        setIsOtpSent(true); // Show OTP input form
        setSuccessMessage("OTP sent to your registered email.");
      } else if (response.data.token) {
        // Check if the role is provided in the response
        setRole(response.data.role); 
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("Login successful!");
        window.location.href = role === "Admin" ? "/admin-dashboard" : "/dashboard"; // Redirect based on role
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });

      if (response.data.success && response.data.token) {
        setRole(response.data.role); // Update role after successful OTP verification
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("2FA verification successful!");
        window.location.href = role === "Admin" ? "/admin-dashboard" : "/dashboard"; // Redirect based on role
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
