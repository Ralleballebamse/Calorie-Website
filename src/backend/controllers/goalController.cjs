const Goal = require("../models/Goal.cjs");

async function saveGoal(req, res) {
    try {
        const { startWeight, targetWeight, targetDate } = req.body;

        const start = Number(startWeight);
        const target = Number(targetWeight);

        if (!start || !target || !targetDate) {
            return res.status(400).json({
                message: "Start weight, target weight, and target date are required",
            });
        }

        if (start < 30 || start > 300 || target < 30 || target > 300) {
            return res.status(400).json({
                message: "Weight values must be between 30 and 300 kg",
            });
        }

        if (start === target) {
            return res.status(400).json({
                message: "Start weight and target weight cannot be the same",
            });
        }

        const parsedTargetDate = new Date(targetDate);

        if (Number.isNaN(parsedTargetDate.getTime())) {
            return res.status(400).json({
                message: "Invalid target date",
            });
        }

        await Goal.updateMany(
            { userId: req.userId, isActive: true },
            { isActive: false }
        );

        const goal = await Goal.create({
            userId: req.userId,
            startWeight: start,
            targetWeight: target,
            targetDate: parsedTargetDate,
            isActive: true,
        });

        res.status(201).json({
            message: "Goal saved successfully",
            goal,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getActiveGoal(req, res) {
    try {
        const goal = await Goal.findOne({
            userId: req.userId,
            isActive: true,
        }).sort({ createdAt: -1 });

        res.json({ goal });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getAllGoals(req, res) {
    try {
        const goals = await Goal.find({ userId: req.userId }).sort({
            createdAt: -1,
        });

        res.json({ goals });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteGoal(req, res) {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.json({ message: "Goal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function updateGoal(req, res) {
    try {
        const { startWeight, targetWeight, targetDate } = req.body;

        const start = Number(startWeight);
        const target = Number(targetWeight);

        if (!start || !target || !targetDate) {
            return res.status(400).json({
                message: "Start weight, target weight, and target date are required",
            });
        }

        const goal = await Goal.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            {
                startWeight: start,
                targetWeight: target,
                targetDate,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.json({
            message: "Goal updated successfully",
            goal,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    saveGoal,
    getActiveGoal,
    getAllGoals,
    updateGoal,
    deleteGoal,
};