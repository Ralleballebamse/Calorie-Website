const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.cjs");

const router = express.Router();

// Register a new user account
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Make sure all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Send back safe user data, not the password
        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Log in an existing user
router.post("/login", async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Identifier can be either email or username
        if (!identifier || !password) {
            return res.status(400).json({ message: "Email/username and password required" });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        });

        // Use a generic error message for security
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare entered password with hashed password
        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create token that identifies the logged-in user
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Send token and safe user data to frontend
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;