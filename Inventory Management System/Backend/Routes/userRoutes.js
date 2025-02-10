const express = require("express");

const AuthController = require("../Controllers/authController");

const router = express.Router();

// Route: Register a new user
router.post("/register", AuthController.registerUser);

// Route: Login user
router.post("/login", AuthController.loginUser);

router.post("/forgotPassword", AuthController.forgotPassword);

router.post("/reset-password/:token", AuthController.resetPassword);

module.exports = router;
