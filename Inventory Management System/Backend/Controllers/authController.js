const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { authenticator } = require('otplib');
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const SibApiV3Sdk = require("sib-api-v3-sdk");
// Initialize Brevo API
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

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

exports.forgotPassword = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });


    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "10m" });

    // Brevo (Sendinblue) email setup
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: user.email, name: `${user.firstName} ${user.lastName}` }];
    sendSmtpEmail.sender = { email: "joshna2507@gmail.com", name: "Christine Weaver" };
    sendSmtpEmail.subject = "Reset Your Password";
    sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
          <p>Hi <b>${user.firstName} ${user.lastName}</b>,</p>
          <p>You requested a password reset for <b>Breast Intentions</b>.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="http://localhost:3000/reset-password/${token}" 
              style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
              Reset Your Password
            </a>
          </div>
          <p><b>Note:</b> This link will expire in <b>10 minutes.</b></p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; font-size: 12px; color: #777;">&copy; 2025 Breast Intentions. All rights reserved.</p>
        </div>
    `;

    // Send the email using Brevo API
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(200).send({ message: "Password reset email sent successfully" });

  } catch (err) {
    console.error("Error sending password reset email:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      secretKey
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(404).send({ message: "no user found" });
    }

    // Update user's password, clear reset token and expiration time
    user.password = req.body.newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated successfully" });

  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err.message });
  }
};

