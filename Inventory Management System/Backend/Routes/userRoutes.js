const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User"); // Ensure this path matches your project structure
const verifyToken = require("../middleware/authMiddleware"); // Middleware for protected routes

const router = express.Router();

// Route: Register a new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user in the database
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ success: false, message: "Registration failed. Please try again." });
  }
});

// Route: Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "yourSecretKey", // Replace with an environment variable in production
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token, message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
});

// Route: Example of a protected route
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the protected route!", user: req.user });
});

module.exports = router;
