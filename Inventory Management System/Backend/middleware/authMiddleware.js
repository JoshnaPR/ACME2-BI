//  this is to ensure that the user is authenticated
// So the token is extracted from the request header, it is decoded using the secret key. 
// If valid, the 'req.user' object is populated with user details and passed to the next middleware or route

const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>" format

    if (!token) {
        return res.status(401).json({ message: "Access token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using your secret key
        req.user = decoded; // Attach the decoded payload (e.g., user data) to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticateToken;


