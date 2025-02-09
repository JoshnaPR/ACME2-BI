const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { authenticator } = require('otplib');
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  try {
    // Check if email is already registered
    const isDuplicate = await User.findOne({ email });
    if (isDuplicate) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered!" });
    }

    // Create and save the user
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
    });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, code } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Authentication Failed!" });
    }

    // Check whether the password is valid
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Incorrect Password!" });
    }

    // Handle 2FA verification
    if (user.twoFactorAuth.enabled) {
      if (!code) {
        return res.status(400).send({
          message: "2FA code required!",
          codeRequested: true,
        });
      }

      const verified = authenticator.check(code, user.twoFactorAuth.secret);

      if (!verified) {
        return res.status(400).send({ message: "Invalid 2FA code!" });
      }
    }

    // Generate JWT token including user role
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        twoFactorAuth: user.twoFactorAuth.enabled,
      },
      secretKey,
      { expiresIn: "9h" }
    );

    // Send user data along with token
    const finalData = {
      userId: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      twoFactorAuth: user.twoFactorAuth.enabled,
      token,
    };

    res.send(finalData);
  } catch (err) {
    res.status(500).send({ message: "An error occurred during login!", error: err });
  }
};

