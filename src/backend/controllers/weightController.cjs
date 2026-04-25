const WeightEntry = require("../models/WeightEntry.cjs");
const {
    calculateWeightStats,
    addChangePerEntry,
} = require("../services/weightStatsService.cjs");

async function createWeightEntry(req, res) {
    try {
        const { weight, date, notes } = req.body;

        if (!weight || !date) {
            return res.status(400).json({ message: "Weight and date are required" });
        }

        const weightNumber = Number(weight);

        if (!weightNumber || weightNumber < 30 || weightNumber > 300) {
            return res.status(400).json({
                message: "Weight must be between 30 and 300 kg",
            });
        }

        const entry = await WeightEntry.create({
            userId: req.userId,
            weight,
            date,
            notes,
        });

        res.status(201).json({
            message: "Weight entry saved",
            entry,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getWeightDashboard(req, res) {
    try {
        const entries = await WeightEntry.find({ userId: req.userId });

        const stats = calculateWeightStats(entries);
        const history = addChangePerEntry(entries);

        res.json({
            stats,
            history,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createWeightEntry,
    getWeightDashboard,
};