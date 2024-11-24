import React, { useState } from 'react';
import axios from 'axios';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle OTP verification submission
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      
      // If the response indicates success, show success message
      if (response.data.success) {
        setSuccess('OTP verified successfully! You can now access the page.');
        setError('');
        // Optionally, redirect or show protected content
      } else {
        setError('Invalid OTP. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('Error verifying OTP. Please try again later.');
      setSuccess('');
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>

      {/* OTP Verification Form */}
      <form onSubmit={handleVerifyOTP}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="otp">Enter OTP from Google Authenticator</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>

        <button type="submit">Verify OTP</button>
      </form>

      {/* Display Success or Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default VerifyOTP;
