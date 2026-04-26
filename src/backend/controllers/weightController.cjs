const Goal = require("../models/Goal.cjs");

const WeightEntry = require("../models/WeightEntry.cjs");
const {
    calculateWeightStats,
    addChangePerEntry,
    calculateGoalProgress,
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

const getWeightDashboard = async (req, res) => {
    try {
        // 1. Get weight entries
        const entries = await WeightEntry.find({
            userId: req.userId,
        }).sort({ date: -1 });

        // 2. Get active goal
        const goal = await Goal.findOne({
            userId: req.userId,
            isActive: true,
        }).sort({ createdAt: -1 });

        // 3. Calculate stats
        const stats = calculateWeightStats(entries);

        stats.goalProgress = calculateGoalProgress(
            stats.currentWeight,
            goal
        );

        // 4. Add change per entry (for history table)
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

async function updateWeightEntry(req, res) {
    try {
        const { weight, date, notes } = req.body;

        const weightNumber = Number(weight);

        if (!weightNumber || weightNumber < 30 || weightNumber > 300) {
            return res.status(400).json({
                message: "Weight must be between 30 and 300 kg",
            });
        }

        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

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
                new: true,
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