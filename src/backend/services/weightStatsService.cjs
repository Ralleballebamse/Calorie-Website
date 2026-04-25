function calculateWeightStats(entries) {
    if (entries.length === 0) {
        return {
            currentWeight: 0,
            weeklyChange: 0,
            goalProgress: 0,
        };
    }

    const sortedNewestFirst = [...entries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const latestEntry = sortedNewestFirst[0];
    const currentWeight = latestEntry.weight;

    const sevenDaysBeforeLatest = new Date(latestEntry.date);
    sevenDaysBeforeLatest.setDate(sevenDaysBeforeLatest.getDate() - 7);

    const weekOldEntry = sortedNewestFirst.find(
        (entry) => new Date(entry.date) <= sevenDaysBeforeLatest
    );

    const weeklyChange = weekOldEntry
        ? Number((currentWeight - weekOldEntry.weight).toFixed(1))
        : 0;

    return {
        currentWeight,
        weeklyChange,
        goalProgress: 82, // temporary until you add goal weight
    };
}

function addChangePerEntry(entries) {
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

    return withChanges.sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = {
    calculateWeightStats,
    addChangePerEntry,
};