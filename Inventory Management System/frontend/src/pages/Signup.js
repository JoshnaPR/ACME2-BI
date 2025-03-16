import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css"; // Ensure this matches the correct file path

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Step 1: Register new user
      const response = await axios.post(
        "http://breastintentionsdb.com/api/users/register",
        formData
      );

      if (response.data.success) {
        setSuccessMessage("Registration successful! You can now log in.");
      } else {
        setError(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      <span className="bg-animate2"></span>
      <div className="form-box register">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <label>First Name</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
            <label>Last Name</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <label>Role</label>
          <div className="input-box ">
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Volunteer">Volunteer</option>
            </select>
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

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      <div className="info-text register">
        <h2>Welcome!</h2>
        <p>
          We're excited to see what changes you'll bring to someone's life
          today!
        </p>
      </div>
    </div>
  );
}

export default Register;
