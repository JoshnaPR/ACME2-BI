const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Models
const Event = require('./Models/Events'); // Ensure this model exists
const Bra = require('./Models/Bra'); // Ensure this model exists

// Import Routes
const eventRoutes = require('./Routes/eventRoutes'); // Create this file
const braRoutes = require('./Routes/braRoutes'); // Create this file
const verifyOtpRoutes = require('./Routes/verifyOtpRoutes');
const userRoutes=require("./Routes/userRoutes")

// Use Routes
app.use('/api/events', eventRoutes);
app.use('/api/bras', braRoutes);
app.use('/api', verifyOtpRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.log(error));

// Simulating a user database for demo purposes
const users = [
    { email: 'user@example.com', password: 'password123', twoFactorEnabled: false, secret: null }
];

// Route to enable 2FA
app.post('/enable-2fa', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a secret key for Google Authenticator
    const secret = speakeasy.generateSecret({ length: 20 });

    // Store the secret in the user database
    user.secret = secret.base32;
    user.twoFactorEnabled = true;

    // Generate a QR code URL for Google Authenticator
    const qrCodeUrl = `otpauth://totp/YourApp:${email}?secret=${secret.base32}&issuer=YourApp`;

    // Generate QR code image
    qrcode.toDataURL(qrCodeUrl, (err, dataUrl) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating QR code' });
        }

        res.json({ qrCodeUrl: dataUrl });
    });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Verify the OTP
    const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token: otp,
        window: 1 // allows 1 minute before and after OTP expiration
    });

    if (verified) {
        res.json({ success: true });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

// Route to disable 2FA (if needed)
app.post('/disable-2fa', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.twoFactorEnabled = false;
    user.secret = null;

    res.json({ success: true });
});



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// // Create an Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Import Models
// const Event = require('./Models/Events'); // Ensure this model exists
// const Bra = require('./Models/Bra'); // Ensure this model exists

// // Import Routes
// const eventRoutes = require('./Routes/eventRoutes'); // Create this file
// const braRoutes = require('./Routes/braRoutes'); // Create this file

// // Use Routes
// app.use('/api/events', eventRoutes);
// app.use('/api/bras', braRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch((error) => console.log(error));
