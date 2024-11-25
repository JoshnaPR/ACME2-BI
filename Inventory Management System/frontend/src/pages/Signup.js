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
  const [googleAuthSetup, setGoogleAuthSetup] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Step 1: Send registration data to backend
      const response = await axios.post("http://localhost:5000/api/users/register", {
        firstName,
        lastName,
        username,
        email,
        password,
        role,
      });

      if (response.data.success) {
        setSuccessMessage("Registration successful! Setting up Google Authenticator...");
        
        // Step 2: Setup Google Authenticator
        const googleAuthResponse = await axios.post("http://localhost:5000/api/users/setup-google-auth", {
          email,
        });

        if (googleAuthResponse.data.qrCode) {
          setQrCode(googleAuthResponse.data.qrCode); // Set QR code for display
          setGoogleAuthSetup(true);
        } else {
          setError("Failed to set up Google Authenticator.");
        }
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
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
        <h2>Register</h2>
        {!googleAuthSetup ? (
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
                <option value="" disabled>
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
        ) : (
          <div className="google-auth-setup">
            <h3>Setup Google Authenticator</h3>
            <p>
              Scan the QR code below with your Google Authenticator app to
              complete registration.
            </p>
            {qrCode && <img src={qrCode} alt="Google Authenticator QR Code" />}
            <p>
              Once scanned, you can log in using the generated 2FA codes along
              with your password.
            </p>
            <a href="/login" className="btn">
              Proceed to Login
            </a>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      <div className="info-text register">
        <h2>Welcome!</h2>
        <p>We're excited to see what changes you'll bring to someone's life today!</p>
      </div>
    </div>
  );
}

export default Register;
