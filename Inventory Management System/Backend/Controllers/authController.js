const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  try {
    // Check if username is already registered
    const isDuplicate = await User.findOne({ username });
    if (isDuplicate) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already registered!" });
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
    const { username, password } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "Authentication Failed!" });
    }

    // Check whether the password is valid
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Incorrect Password!" });
    }

    // Generate JWT token including user role
    let token = jwt.sign(
      {
        userId: user?._id,
        username: user?.username,
        role: user?.role,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    // Send user data along with token
    let finalData = {
      userId: user?._id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      role: user?.role,
      token,
    };

    res.send(finalData);
  } catch (err) {
    res.status(400).send(err);
  }
};
