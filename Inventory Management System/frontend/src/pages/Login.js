import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css"; // Ensure this matches the correct file path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    if (successMessage) {
      navigate("/home"); // Redirect to Home Page after login success
    }
  }, [successMessage, navigate]);

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Send login credentials (email and password) to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      if (response.data) {
        // If login is successful, store the token in localStorage
        localStorage.setItem("role", response.data.role);
        
        //AR Added
        localStorage.setItem("userId", response.data.userId);
        //End of Code Added

        if (response.data.token) {
          localStorage.setItem("token", response.data.token); // Store token in localStorage
        }
        setSuccessMessage("Login successful!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="wrapper">
      <span className="bg-animate"></span>
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn">
            {"Login"}
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
        <p>
          We're excited to see what changes you'll bring to someone's life
          today!
        </p>
      </div>
    </div>
  );
}

export default Login;
