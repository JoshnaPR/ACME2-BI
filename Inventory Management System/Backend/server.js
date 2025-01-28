const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken"); // Ensure jwt is imported
const qrcode = require("qrcode");
const { authenticator } = require("otplib"); // For 2FA functionality
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend domain
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Import Models
const User = require("./Models/User"); // Ensure this model exists

const Event = require("./Models/Events"); // Ensure this model exists
const Bra = require("./Models/Bra"); // Ensure this model exists

// Import Routes
const eventRoutes = require("./Routes/eventRoutes"); // Create this file
const braRoutes = require("./Routes/braRoutes"); // Create this file
const userRoutes = require("./Routes/userRoutes");
// Use Routes
app.use("/api/events", eventRoutes);
app.use("/api/bras", braRoutes);
app.use("/api/users", userRoutes);

// Routes
app.get("/qrImage", async (req, res) => {

  try {
    // Extract the token from cookies
    const token = req.cookies.token;

    if (!token) {
      console.error("Token not found.");
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    // Decode the token to extract the userId
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Token verification failed:", error.message);
    }

    const userId = decoded.userId; // Extract `userId` from token payload

    if (!userId) {
      console.error("userId not found in token payload.");
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // Fetch the user from MongoDB using userId
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found for userId:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 2FA secret and QR code
    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(user.username, "BI", secret);
    const image = await qrcode.toDataURL(uri);

    // Update user's tempSecret
    user.twoFactorAuth.tempSecret = secret;
    await user.save();

    // Send the response with the QR code image
    res.json({ success: true, image });
  } catch (error) {
    console.error("Error in /qrImage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// set the 2 FA
app.get("/set2FA", async (req, res) => {
  try {
    // Extract the token from cookies
    const token = req.cookies.token;

    if (!token) {
      console.error("Token not found.");
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    // Decode the token to extract userId
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId; // Extract `userId` from token payload

    if (!userId) {
      console.error("userId not found in token payload.");
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // Fetch the user from the database using the userId
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for userId:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the 2FA tempSecret from the user
    const { tempSecret } = user.twoFactorAuth;

    if (!tempSecret) {
      console.error("Temp secret not found.");
      return res.status(400).json({ message: "Temp secret is missing" });
    }

    // Verify the 2FA code
    const { code } = req.query;

    const verified = authenticator.check(code, tempSecret);

    if (!verified) {
      console.error("Invalid 2FA code.");
      return res.status(400).json({ message: "Invalid 2FA code" });
    }

    // Enable 2FA for the user and save the updated data
    user.twoFactorAuth.enabled = true;
    user.twoFactorAuth.secret = tempSecret;
    console.log("Updated user:", user);
    await user.save();
    console.log("After saving data in db");

    const newToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        twoFactorAuth: user.twoFactorAuth.enabled, // Updated value
      },
      process.env.JWT_SECRET,
      { expiresIn: "9h" } // Same expiration time as login
    );

    console.log("newToken", newToken);

    // Reset the cookie with the new token
    res.cookie("newToken", newToken);
    console.log(req.cookies);
    // Send success response
    return res.json({
      success: true,
      message: "2FA enabled successfully",
    });
  } catch (error) {
    console.error("Error in /set2FA:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
