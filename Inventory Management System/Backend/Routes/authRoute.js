/* This handles the authentication and the 2FA. 
'/register' - creates a new user, generates a 2FA secret and QR code
'/login' - validates user credentials and, if enabled, verifies OTP for 2FA
'/enable-2fa' - this verifies the OTP to enable 2FA for a user
There are also role-based endpoints: 
'/admin-endpoint' & '/volunteer-endpoint' that are protected by roleMiddleware to allow only Admins or volunteers*/ 


const express = require("express");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const AuthController = require("../Controllers/authController");
const checkRole = require('../middleware/roleMiddleware');
const User = require('../Models/User'); // Path to your User model

const router = express.Router(); 

// Route for user registration
router.post('/register', async (req, res) => {
    const { email, username, password, firstName, lastName, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a secret key for 2FA using speakeasy
        const secret = speakeasy.generateSecret({ length: 20 });

        // Generate a QR code URL for Google Authenticator
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

        // Create a new user and save the 2FA secret in the database
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            role,
            twoFactorSecret: secret.base32, // Save the 2FA secret
            is2FAEnabled: false, // Set initially as false
        });

        // Hash the password
        await newUser.save();

        // Respond with the QR code URL
        res.status(200).json({ qrCodeUrl, secret: secret.base32 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    const { email, password, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If 2FA is enabled, verify OTP
        if (user.is2FAEnabled) {
            const verified = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: otp,
            });

            if (!verified) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
        }

        // If login is successful
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
    }
});

// Route to enable 2FA (after login)
router.post('/enable-2fa', async (req, res) => {
    const { otp } = req.body;
    const user = await User.findById(req.userId); // Get current user

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: otp,
    });

    if (!verified) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Enable 2FA in the user's account
    user.is2FAEnabled = true;
    await user.save();

    res.status(200).json({ message: '2FA enabled successfully' });
});

// Admin and Volunteer role-based access
router.post('/admin-endpoint', checkRole('Admin'), (req, res) => {
    res.json({ message: 'Admin endpoint accessed' });
});

router.post('/volunteer-endpoint', checkRole('Volunteer'), (req, res) => {
    res.json({ message: 'Volunteer endpoint accessed' });
});

module.exports = router;



// const express = require ("express");
// const AuthController = require("../Controllers/authController");
// const checkRole=require('../middleware/roleMiddleware');

// const router = express.Router(); 
// //this router object will allow me to create some routes
// //like router.post, router.get, etc

// router.post('/register',AuthController.registerUser);
// router.post('/login', AuthController.loginUser);

// router.post('/admin-endpoint', checkRole('Admin'),(req,res)=>{
//     res.json({message:'Admin endpoint accessed'});
// });

// router.post('/volunteer-endpoint', checkRole('Volunteer'),(req,res)=>{
//     res.json({message:'Volunteer endpoint accessed'});
// });

// module.exports = router;