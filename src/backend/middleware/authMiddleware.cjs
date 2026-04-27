const jwt = require("jsonwebtoken");

// Middleware to protect routes by verifying JWT token
function authMiddleware(req, res, next) {
    // Get Authorization header (expected format: "Bearer TOKEN")
    const authHeader = req.headers.authorization;

    // If no token or wrong format → deny access
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    try {
        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request so controllers can access it
        req.userId = decoded.id;

        // Continue to the next middleware / route handler
        next();
    } catch (error) {
        // If token is invalid or expired → deny access
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;