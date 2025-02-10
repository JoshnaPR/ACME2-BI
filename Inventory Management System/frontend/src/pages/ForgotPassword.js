import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css";
axios.defaults.withCredentials = true;

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");

        if (!email) {
            setError("Email Field is Required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        setError(""); // Clear errors if validation passes

        try {
            await axios.post(
                "http://localhost:5000/api/users/forgotPassword",
                {
                    email,
                }
            );
            setSuccessMessage("Email sent successfully!");
            setEmail("");
        } catch (error) {
            console.log(error.response);
            if (error.response?.status === 404) {
                setError("Invalid email address");
            } else {
                setError("Server error");
            }
        }
    };
    return (
        <div className="wrapper">
            <span className="bg-animate"></span>
            <div className="form-box login">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                        <i className="bx bxs-user"></i>
                    </div>

                    <button type="submit" className="btn" id="loginForm">
                        Send Email
                    </button>
                </form>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
