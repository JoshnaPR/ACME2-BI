import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css";
axios.defaults.withCredentials = true;

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!newPassword || !confirmPassword) {
            setError("Both fields are required.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords must match.");
            return;
        }

        setError(""); // Clear any previous errors

        const token = window.location.pathname.split("/").pop();

        axios
            .post(`https://breastintentionsdb.com/api/users/reset-password/${token}`, { newPassword })
            .then((response) => {
                setSuccessMessage(response.data.message);
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
            })
            .catch(() => {
                setError("Your link has expired");
            });
    };
    return (
        <div className="wrapper">
            <span className="bg-animate"></span>
            <div className="form-box login">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label>New Password</label>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label>Confirm Password</label>
                        <i className="bx bxs-user"></i>
                    </div>

                    <button type="submit" className="btn" id="loginForm">
                        Reset Password
                    </button>
                </form>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
