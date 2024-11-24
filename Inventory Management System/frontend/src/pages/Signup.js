import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Volunteer', // Default role
  });

  const [qrCodeUrl, setQrCodeUrl]=useState('');
  const [message, setMessage]=useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the backend API to register the user
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.qrCodeUrl){
        setQrCodeUrl(data.qrCodeUrl);
        setMessage('Registration successful. Please scan the QR code with Google Authenticator to complete the registration.');
      } else{
        setMessage('Registration failed. Unable to get QR code. Please try again.');
      }
      } catch (error) {
        console.error('Error during signup!',error);
        setMessage("Error during registration");
      }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Volunteer">Volunteer</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>

      {/* This is to display success or error message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* This is to display QR code for 2FA setup if available */}
      {qrCodeUrl && (
        <div>
          <h3>Scan this QR code with Google Authenticator</h3>
          <img src={qrCodeUrl} alt="QR Code"/>
        </div>
      )}
    </div>
  );
};

export default Signup;
