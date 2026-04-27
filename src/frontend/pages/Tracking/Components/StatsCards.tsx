

// Props for displaying calculated statistics from the backend
type StatsCardsProps = {
    stats: {
        currentWeight: number;
        weeklyChange: number;
        goalProgress: number;
    };
};

function StatsCards({ stats }: StatsCardsProps) {
    return (
        // Grid layout with 3 cards
        <div className="grid grid-cols-3 gap-30">

            {/* Current Weight Card */}
            <div className="bg-white p-5 rounded-2xl flex flex-col gap-4">
                <h3 className="text-2xl">Current Weight</h3>
                
                <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold">{stats.currentWeight}</span>
                    <span className="text-sm self-end">kg</span>
                </div>
            </div>

            {/* Weekly Change Card */}
            <div className="bg-white p-5 rounded-2xl flex flex-col gap-4">
                <h3 className="text-2xl">Weekly Change</h3>
                <div className="flex items-end gap-1">

                    {/* Adds "+" for positive changes */}
                    <span className="text-2xl font-bold">
                        {stats.weeklyChange > 0 ? "+" : ""}
                        {stats.weeklyChange}
                    </span>
                    <span className="text-sm self-end">kg</span>
                </div>
            </div>

            {/* Goal Progress Card */}
            <div className="bg-white p-5 rounded-2xl flex flex-col gap-4">
                <h3 className="text-2xl">Goal Progress</h3>
                <h3 className="text-2xl font-bold">{stats.goalProgress}%</h3>

                {/* Progress bar */}
                <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#3e5d48] rounded-full"
                        style={{ width: `${stats.goalProgress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default StatsCards;