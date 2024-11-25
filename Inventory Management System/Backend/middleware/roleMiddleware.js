// roleMiddleware.js - this is to check if the authenticated user has the required role

// Middleware to check if the user has the required role
const checkRole = (role) => {
    return (req, res, next) => {
        const userRole = req.user.role;  // Assuming 'role' is stored in the user object from JWT or session

        if (!userRole) {
            return res.status(401).json({ message: "User role is required" });
        }

        if (userRole !== role) {
            return res.status(403).json({ message: "Access denied" });
        }

        next(); // If role matches, proceed to the next middleware or route handler
    };
};

module.exports = checkRole;
