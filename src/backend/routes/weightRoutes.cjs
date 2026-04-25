const express = require("express");
const WeightEntry = require("../models/WeightEntry.cjs");
const authMiddleware = require("../middleware/authMiddleware.cjs");

const router = express.Router();

// Create weight entry
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { weight, date, notes } = req.body;

        if (!weight || !date) {
            return res.status(400).json({ message: "Weight and date are required" });
        }

        const entry = await WeightEntry.create({
            userId: req.userId,
            weight,
            date,
            notes,
        });

        res.status(201).json(entry);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all weight entries + stats
router.get("/", authMiddleware, async (req, res) => {
    try {
        const entries = await WeightEntry.find({ userId: req.userId }).sort({
            date: -1,
        });

        const currentWeight = entries.length > 0 ? entries[0].weight : 0;

        const latestEntry = entries[0];

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weekOldEntry = entries.find(
            (entry) => new Date(entry.date) <= sevenDaysAgo
        );

        const weeklyChange = weekOldEntry
            ? Number((currentWeight - weekOldEntry.weight).toFixed(1))
            : 0;

        res.json({
            currentWeight,
            weeklyChange,
            goalProgress: 82, // temporary until you add user goals
            entries,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;