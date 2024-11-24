const express = require('express');
const speakeasy = require('speakeasy');
const User = require('../Models/User'); // Assuming User model has a 'secret' field for 2FA

const router = express.Router();

// POST route to verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use the stored secret key to verify the OTP
        const isValid = speakeasy.totp.verify({
            secret: user.twoFactorSecret, // Assuming user has a field called 'twoFactorSecret' that stores their secret
            encoding: 'base32',
            token: otp,
        });

        if (isValid) {
            return res.json({ success: true, message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
