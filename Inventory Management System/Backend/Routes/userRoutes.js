/*This handles basic user management. 
'/register' = registers new users without 2FA setup
'/login' - authenticates users and issues a JWT
'/protected' - a test route to show how authentication works using authMiddleware */

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User"); // Ensure this path matches your project structure
const verifyToken = require("../middleware/authMiddleware"); // Middleware for protected routes
const AuthController = require("../Controllers/authController");

const router = express.Router();

// Route: Register a new user
router.post("/register", AuthController.registerUser);

// Route: Login user
router.post("/login", AuthController.loginUser);

// Route: Example of a protected route
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the protected route!",
    user: req.user,
  });
});

module.exports = router;
