import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Create a LandingPage component
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./components/VerifyOTP";
import HomePage from "./pages/HomePage";
import BraInventory from "./pages/BraInventory";
import EventInventory from "./pages/EventInventory";
import "./styles/BraInventory.css";
import "./styles/EventInventory.css";
import "./styles/HomePage.css";
import "./styles/LandingPage.css";
import "./styles/style.css";

function App() {
  // Check if the user is authenticated and OTP is verified
  const isAuthenticated = localStorage.getItem("token");

  const isOtpVerified = localStorage.getItem("otpVerified") === "true";

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/bra-inventory"
            element={isAuthenticated ? <BraInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/event-inventory"
            element={isAuthenticated ? <EventInventory /> : <Navigate to="/" />}
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
