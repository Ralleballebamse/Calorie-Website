const Goal = require("../models/Goal.cjs");

const WeightEntry = require("../models/WeightEntry.cjs");
const {
    calculateWeightStats,
    addChangePerEntry,
    calculateGoalProgress,
} = require("../services/weightStatsService.cjs");

// Create a new weight entry for the logged-in user
async function createWeightEntry(req, res) {
    try {
        const { weight, date, notes } = req.body;

        // Weight and date are required for every entry
        if (!weight || !date) {
            return res.status(400).json({ message: "Weight and date are required" });
        }

        const weightNumber = Number(weight);

        // Validate that the weight is realistic
        if (!weightNumber || weightNumber < 30 || weightNumber > 300) {
            return res.status(400).json({
                message: "Weight must be between 30 and 300 kg",
            });
        }

        // Save the entry and connect it to the current user
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

// Get stats and history for the tracking page
const getWeightDashboard = async (req, res) => {
    try {
        // Get all weight entries for this user, newest first
        const entries = await WeightEntry.find({
            userId: req.userId,
        }).sort({ date: -1 });

        // Get the user's currently active goal
        const goal = await Goal.findOne({
            userId: req.userId,
            isActive: true,
        }).sort({ createdAt: -1 });

        // Calculate current weight and weekly change
        const stats = calculateWeightStats(entries);

        // Add goal progress percentage to the stats
        stats.goalProgress = calculateGoalProgress(
            stats.currentWeight,
            goal
        );

        // Add change values to each history row
        const history = addChangePerEntry(entries);

        res.json({
            stats,
            history,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update one weight entry, only if it belongs to the logged-in user
async function updateWeightEntry(req, res) {
    try {
        const { weight, date, notes } = req.body;

        const weightNumber = Number(weight);

        // Validate updated weight value
        if (!weightNumber || weightNumber < 30 || weightNumber > 300) {
            return res.status(400).json({
                message: "Weight must be between 30 and 300 kg",
            });
        }

        // Date is required because it affects sorting and chart data
        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        // Match by both entry ID and userId so users cannot update other users' entries
        const entry = await WeightEntry.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            {
                weight: weightNumber,
                date,
                notes,
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!entry) {
            return res.status(404).json({ message: "Weight entry not found" });
        }

        res.json({
            message: "Weight entry updated",
            entry,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// Delete one weight entry, only if it belongs to the logged-in user
async function deleteWeightEntry(req, res) {
    try {
        const entry = await WeightEntry.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!entry) {
            return res.status(404).json({ message: "Weight entry not found" });
        }

        res.json({ message: "Weight entry deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createWeightEntry,
    getWeightDashboard,
    updateWeightEntry,
    deleteWeightEntry,
};