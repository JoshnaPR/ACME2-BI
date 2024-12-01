import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle OTP verification submission
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    // Retrieve the email from localStorage
    const email = localStorage.getItem('tempUserEmail');

    if (!email) {
      setError('Email not found. Please login or sign up again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });

      // If the response indicates success, proceed
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store JWT for authentication
        localStorage.removeItem('tempUserEmail'); // Clear temporary email
        setError('');
        setSuccess('OTP verified successfully!');
        setTimeout(() => {
          navigate('/home'); // Redirect to Home Page after success
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('Error verifying OTP. Please try again later.');
      setSuccess('');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="verify-otp-container">
      <h2>Two-Factor Authentication</h2>
      <p>Please enter the OTP sent to your email or authenticator app.</p>

      {/* OTP Verification Form */}
      <form onSubmit={handleVerifyOTP} className="otp-form">
        <div className="form-group">
          <label htmlFor="otp" aria-label="Enter OTP">
            OTP:
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="otp-input"
          />
        </div>

        <button type="submit" className="verify-button">
          Verify OTP
        </button>
      </form>

      {/* Display Success or Error Messages */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default VerifyOTP;
