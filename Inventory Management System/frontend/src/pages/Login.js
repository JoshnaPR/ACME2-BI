import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css"; // Ensure this matches the correct file path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send login credentials (email, password) to backend
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((response) => {
        if (response.data.twoFactorRequired) {
          setIsOtpSent(true); // Show OTP input
        } else {
          console.log("Login successful!");
          // Proceed with post-login actions
        }
      })
      .catch((err) => {
        setError("Invalid email or password");
        console.error(err);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    // Send OTP for verification
    axios
      .post("http://localhost:5000/verify-otp", { email, otp })
      .then((response) => {
        if (response.data.success) {
          console.log("2FA successful!");
          // Redirect or perform action post 2FA
        } else {
          setError("Invalid OTP");
        }
      })
      .catch((err) => {
        setError("Error verifying OTP");
        console.error(err);
      });
  };

  return (
    <div className="wrapper">
      <span className="bg-animate"></span>

      <div className="form-box login">
        <h2 className="animation">Login</h2>
        <form onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit}>
          <div className="input-box animation">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>

          {!isOtpSent && (
            <div className="input-box animation">
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
            <div className="input-box animation">
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

          <button type="submit" className="btn animation">
            {isOtpSent ? "Verify OTP" : "Login"}
          </button>

          <div className="logreg-link animation">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="register-link">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text login">
        <h2>Welcome Back!</h2>
        <p>We're excited to see what changes you'll bring to someone's life today!</p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;






// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/style.css';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isOtpRequired, setIsOtpRequired] = useState(false);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 username,
//                 password,
//             });
//             if (response.data.token) {
//                 // Successful login without 2FA
//                 setSuccessMessage('Login successful!');
//                 // Save token to localStorage (or cookies) and redirect
//                 localStorage.setItem('token', response.data.token);
//                 window.location.href = '/dashboard';
//             } else if (response.data.twoFactorRequired) {
//                 // 2FA required
//                 setIsOtpRequired(true);
//                 setSuccessMessage('Enter your 2FA code to complete login.');
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'Login failed. Please try again.');
//         }
//     };

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 username,
//                 password,
//                 twoFactorCode: otp,
//             });
//             if (response.data.token) {
//                 // Successful 2FA verification
//                 setSuccessMessage('2FA successful! You are now logged in.');
//                 localStorage.setItem('token', response.data.token);
//                 window.location.href = '/dashboard';
//             } else {
//                 setError('Invalid 2FA code. Please try again.');
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || '2FA verification failed.');
//         }
//     };

//     return (
//         <section className="login-section">
//             <div className="login-box">
//                 <form onSubmit={isOtpRequired ? handleOtpSubmit : handleLoginSubmit}>
//                     <h2>{isOtpRequired ? 'Enter 2FA Code' : 'Login'}</h2>
//                     {!isOtpRequired && (
//                         <>
//                             <div className="input-box">
//                                 <span className="icon"><ion-icon name="person"></ion-icon></span>
//                                 <input
//                                     type="text"
//                                     required
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     placeholder="Enter your username"
//                                 />
//                                 <label htmlFor="username">Username</label>
//                             </div>
//                             <div className="input-box">
//                                 <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
//                                 <input
//                                     type="password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="Enter your password"
//                                 />
//                                 <label htmlFor="password">Password</label>
//                             </div>
//                         </>
//                     )}
//                     {isOtpRequired && (
//                         <div className="input-box">
//                             <input
//                                 type="text"
//                                 required
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 placeholder="Enter your 2FA code"
//                             />
//                         </div>
//                     )}
//                     <button type="submit" className="login-btn">
//                         {isOtpRequired ? 'Verify OTP' : 'Login'}
//                     </button>
//                     {error && <p className="error">{error}</p>}
//                     {successMessage && <p className="success">{successMessage}</p>}
//                 </form>
//             </div>
//         </section>
//     );
// }

// export default Login;




// // import React, { useState } from 'react'; 
// // import axios from 'axios';
// // import '../styles/style.css';

// // function Login() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [rememberMe, setRememberMe] = useState(false);
// //     const [otp, setOtp] = useState('');
// //     const [isOtpSent, setIsOtpSent] = useState(false);
// //     const [error, setError] = useState('');

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         // Send login credentials (email, password) to backend
// //         axios.post('http://localhost:5000/login', { email, password })
// //             .then(response => {
// //                 // Check if 2FA is required
// //                 if (response.data.twoFactorRequired) {
// //                     setIsOtpSent(true);  // Show OTP input form
// //                 } else {
// //                     // Proceed with normal login (Redirect to dashboard, etc.)
// //                     console.log('Login successful!');
// //                 }
// //             })
// //             .catch(err => {
// //                 setError('Invalid email or password');
// //                 console.error(err);
// //             });
// //     };

// //     const handleOtpSubmit = (e) => {
// //         e.preventDefault();
// //         // Send OTP to backend for verification
// //         axios.post('http://localhost:5000/verify-otp', { email, otp })
// //             .then(response => {
// //                 if (response.data.success) {
// //                     // Redirect or do something after successful 2FA
// //                     console.log('2FA successful!');
// //                 } else {
// //                     setError('Invalid OTP');
// //                 }
// //             })
// //             .catch(err => {
// //                 console.error(err);
// //             });
// //     };

// //     return (
// //         <section className="login-section">
// //             <div className="login-box">
// //                 <form onSubmit={handleSubmit}>
// //                     <h2>Login</h2>
// //                     <div className="input-box">
// //                         <span className="icon"><ion-icon name="mail"></ion-icon></span>
// //                         <input 
// //                             type="email" 
// //                             required
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                             placeholder="Enter your email" 
// //                         />
// //                         <label htmlFor="email">Email</label>
// //                     </div>
// //                     <div className="input-box">
// //                         <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
// //                         <input 
// //                             type="password" 
// //                             required
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                             placeholder="Enter your password" 
// //                         />
// //                         <label htmlFor="password">Password</label>
// //                     </div>
// //                     <div className="remember-forgot">
// //                         <label>
// //                             <input 
// //                                 type="checkbox"
// //                                 checked={rememberMe}
// //                                 onChange={() => setRememberMe(!rememberMe)} 
// //                             />
// //                             Remember Me
// //                         </label>
// //                         <a href="#">Forgot Password?</a>
// //                     </div>
// //                     <button type="submit" className="login-btn">Login</button>
// //                     <div className="register-link">
// //                         <p>Don't have an account? <a href="/signup">Register</a></p>
// //                     </div>
// //                 </form>
// //             </div>
// //             {isOtpSent && (
// //                 <div className="otp-box">
// //                     <form onSubmit={handleOtpSubmit}>
// //                         <h2>Enter the OTP</h2>
// //                         <div className="input-box">
// //                             <input 
// //                                 type="text" 
// //                                 required 
// //                                 value={otp}
// //                                 onChange={(e) => setOtp(e.target.value)}
// //                                 placeholder="Enter OTP" 
// //                             />
// //                         </div>
// //                         <button type="submit" className="otp-btn">Verify OTP</button>
// //                         {error && <p className="error">{error}</p>}
// //                     </form>
// //                 </div>
// //             )}
// //         </section>
// //     );
// // }

// // export default Login;



// // import React from 'react';
// // import '../styles/style.css';

// // function Login() {
// //     return (
// //         <section>
// //             <div className="login-box">
// //                 <form action="">
// //                     <h2>Login</h2>
// //                     <div className="input-box">
// //                         <span class="icon"><ion-icon name="mail"></ion-icon></span>
// //                         <input type="email" required/>
// //                         <label>Email</label>
// //                     </div>
// //                     <div className="input-box">
// //                         <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
// //                         <input type="password" required/>
// //                         <label>Password</label>
// //                     </div>
// //                     <div className="remember-forgot">
// //                         <label><input type="checkbox"/>Remember Me</label>
// //                         <a href="#">Forgot Password?</a>
// //                     </div>
// //                     <button type="submit">Login</button>
// //                     <div className="register-link">
// //                         <p> Don't have an account? <a href="#">Register</a></p>
// //                     </div>
// //                 </form>
// //             </div>
// //         </section>
// //     );
// // }

// // export default Login;
