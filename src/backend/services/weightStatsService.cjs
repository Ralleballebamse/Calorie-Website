// Calculate summary stats for the tracking page
function calculateWeightStats(entries) {
    if (entries.length === 0) {
        return {
            currentWeight: 0,
            weeklyChange: 0,
            goalProgress: 0,
        };
    }

    // Sort entries newest first to find the latest weight
    const sortedNewestFirst = [...entries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const latestEntry = sortedNewestFirst[0];
    const currentWeight = latestEntry.weight;

    // Find an entry from at least 7 days before the latest entry
    const sevenDaysBeforeLatest = new Date(latestEntry.date);
    sevenDaysBeforeLatest.setDate(sevenDaysBeforeLatest.getDate() - 7);

    const weekOldEntry = sortedNewestFirst.find(
        (entry) => new Date(entry.date) <= sevenDaysBeforeLatest
    );

    // Calculate weight difference compared to roughly one week ago
    const weeklyChange = weekOldEntry
        ? Number((currentWeight - weekOldEntry.weight).toFixed(1))
        : 0;

    return {
        currentWeight,
        weeklyChange,
        goalProgress: 0,
    };
}

// Add a change value to every weight entry for the history table
function addChangePerEntry(entries) {
    // Sort oldest first so each entry can compare against the previous one
    const sortedOldestFirst = [...entries].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const withChanges = sortedOldestFirst.map((entry, index) => {
        const previousEntry = sortedOldestFirst[index - 1];

        const change = previousEntry
            ? Number((entry.weight - previousEntry.weight).toFixed(1))
            : 0;

        return {
            _id: entry._id,
            weight: entry.weight,
            date: entry.date,
            notes: entry.notes,
            change,
        };
    });

    // Return newest first for display in the frontend
    return withChanges.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Calculate how far the user has progressed toward their active goal
function calculateGoalProgress(currentWeight, goal) {
    if (!goal || !currentWeight) return 0;

    const start = goal.startWeight;
    const target = goal.targetWeight;

    if (start === target) return 0;

    const progress =
        ((start - currentWeight) / (start - target)) * 100;

    // Keep progress between 0% and 100%
    return Math.max(0, Math.min(100, Math.round(progress)));
}

module.exports = {
    calculateWeightStats,
    addChangePerEntry,
    calculateGoalProgress,
};