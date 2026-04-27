const WeightEntry = require("../models/WeightEntry.cjs");
const Goal = require("../models/Goal.cjs");

// Returns the Monday date for the week that the given date belongs to
function startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // Sunday = 0
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

// Formats a date into YYYY-MM-DD format
function formatDate(date) {
    return new Date(date).toISOString().split("T")[0];
}

// Converts an entry creation date into a user-friendly activity time
function formatActivityTime(date) {
    const now = new Date();
    const entryDate = new Date(date);

    const diffMs = now - entryDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return entryDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return "1 week ago";
}

// Builds all dashboard data for the logged-in user
async function getDashboardData(req, res) {
    try {
        // Get all weight entries for this user, oldest first
        const entries = await WeightEntry.find({ userId: req.userId }).sort({
            date: 1,
        });

        // Return empty dashboard values if the user has no entries yet
        if (entries.length === 0) {
            return res.json({
                currentWeight: 0,
                yesterdayChange: 0,
                totalProgress: 0,
                goalProgress: 0,
                weeklyTrend: "No Data",
                weeklyTrendText: "Start logging your weight to see trends.",
                weeklyChart: [],
                monthlyChart: [],
                recentActivity: [],
            });
        }

        // Latest and previous entries are used for current stats
        const latest = entries[entries.length - 1];
        const previous = entries[entries.length - 2];

        const currentWeight = latest.weight;

        // Difference between latest entry and previous entry
        const yesterdayChange = previous
            ? Number((latest.weight - previous.weight).toFixed(1))
            : 0;

        // Difference between first entry and latest entry
        const totalProgress = Number(
            (latest.weight - entries[0].weight).toFixed(1)
        );

        // Get the user's active goal for goal progress calculation
        const goal = await Goal.findOne({
            userId: req.userId,
            isActive: true,
        }).sort({ createdAt: -1 });

        let goalProgress = 0;

        // Calculate goal progress as a percentage and clamp it between 0 and 100
        if (goal && currentWeight) {
            const progress =
                ((goal.startWeight - currentWeight) /
                    (goal.startWeight - goal.targetWeight)) *
                100;

            goalProgress = Math.max(0, Math.min(100, Math.round(progress)));
        }

        // Create a simple trend label based on the latest weight change
        const trend =
            yesterdayChange < 0
                ? "Steady Decrease"
                : yesterdayChange > 0
                    ? "Increasing"
                    : "Stable";

        // Create the text shown under the weekly trend card
        const weeklyTrendText =
            yesterdayChange < 0
                ? `Your weight dropped by ${Math.abs(yesterdayChange)} kg compared to your last log.`
                : yesterdayChange > 0
                    ? `Your weight increased by ${yesterdayChange} kg compared to your last log.`
                    : "Your weight stayed stable compared to your last log.";

        // Find the start and end date of the current week
        const weekStart = startOfWeek(new Date());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        // Build chart data for entries from the current week
        const weeklyChart = entries
            .filter((entry) => {
                const d = new Date(entry.date);
                return d >= weekStart && d <= weekEnd;
            })
            .map((entry) => ({
                date: new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "short",
                }),
                weight: entry.weight,
            }));

        // Build chart data for the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const monthlyChart = entries
            .filter((entry) => {
                const entryDate = new Date(entry.date);
                return entryDate >= thirtyDaysAgo;
            })
            .map((entry) => ({
                date: new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                }),
                weight: entry.weight,
            }));

        // Get the 4 most recently created entries for the recent activity list
        const recentActivity = [...entries]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4)
            .map((entry, index, arr) => {
                const nextEntry = arr[index + 1];

                const change = nextEntry
                    ? Number((entry.weight - nextEntry.weight).toFixed(1))
                    : 0;

                return {
                    _id: entry._id,
                    weight: entry.weight,
                    change,
                    time: formatActivityTime(entry.createdAt),
                };
            });

        // Send all calculated dashboard values to the frontend
        res.json({
            currentWeight,
            yesterdayChange,
            totalProgress,
            goalProgress,
            weeklyTrend: trend,
            weeklyTrendText,
            weeklyChart,
            monthlyChart,
            recentActivity,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { getDashboardData };