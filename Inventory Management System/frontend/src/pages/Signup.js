import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css"; // Ensure this matches the correct file path

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send registration data to backend
    axios
      .post("http://localhost:5000/register", {
        firstName,
        lastName,
        username,
        email,
        password,
        role,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Registration successful!");
          // Redirect to login page or show success message
        }
      })
      .catch((err) => {
        setError("Registration failed. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="wrapper">
      <span className="bg-animate"></span>
      <span className="bg-animate2"></span>

      <div className="form-box register step1">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>First Name</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Last Name</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
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

          <div className="input-box">
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Volunteer">Volunteer</option>
            </select>

            <label>Role</label>
            <i className="bx bxs-id-card"></i>
          </div>

          <button type="submit" className="btn">
            Register
          </button>

          <div className="logreg-link">
            <p>
              Have an account already?{" "}
              <a href="/login" className="login-link">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2>Welcome!</h2>
        <p>We're excited to see what changes you'll bring to someone's life today!</p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Register;
