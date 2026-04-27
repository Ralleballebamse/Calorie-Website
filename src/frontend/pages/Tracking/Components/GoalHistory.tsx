

// Props needed to display and manage the goal history table
type GoalHistoryProps = {
    goals: any[];
    visibleGoals: any[];
    showAllGoals: boolean;
    setShowAllGoals: (value: boolean) => void;
    goalEditMode: boolean;
    setGoalEditMode: (value: boolean) => void;
    pendingGoalAction: string | null;
    startDeleteGoal: (id: string) => void;
    cancelGoalAction: () => void;
    confirmGoalAction: (goal: any) => void;
};

function GoalHistory({
    goals,
    visibleGoals,
    showAllGoals,
    setShowAllGoals,
    goalEditMode,
    setGoalEditMode,
    pendingGoalAction,
    startDeleteGoal,
    cancelGoalAction,
    confirmGoalAction,
}: GoalHistoryProps) {
    return (
        <div className="bg-white rounded-2xl pb-0 p-5">
            {/* Header with manage/done toggle */}
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold py-5">Goal History</h2>
                <button
                    onClick={() => setGoalEditMode(!goalEditMode)}
                    className="text-[#116a2aca] font-bold hover:underline"
                >
                    {goalEditMode ? "Done" : "Manage"}
                </button>
            </div>

            <section>
                {/* Table headings change when manage mode is active */}
                <div
                    className={`grid ${goalEditMode
                        ? "grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
                        : "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
                        } text-xl mb-5`}
                >
                    {goalEditMode && <h2>ACTIONS</h2>}
                    <h2>START</h2>
                    <h2>TARGET</h2>
                    <h2>TARGET DATE</h2>
                    <h2>STATUS</h2>
                </div>

                <div className="flex flex-col gap-8">
                    {visibleGoals.map((goal) => (
                        <div
                            key={goal._id}
                            className={`grid ${goalEditMode
                                ? "grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
                                : "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
                                } items-center`}
                        >
                            {/* Delete controls only show in manage mode */}
                            {goalEditMode && (
                                <div className="flex gap-2 items-center">
                                    {pendingGoalAction === goal._id ? (
                                        <>
                                            {/* Confirm/cancel step prevents accidental deletion */}
                                            <button
                                                onClick={() => confirmGoalAction(goal)}
                                                className="text-green-600 font-bold hover:underline"
                                            >Confirm</button>

                                            <button
                                                onClick={cancelGoalAction}
                                                className="text-red-500 font-bold hover:underline"
                                            >Cancel</button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startDeleteGoal(goal._id)}
                                            className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                        >
                                            <i className="fa-solid fa-xmark text-lg"></i>
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Goal values */}
                            <h3>{goal.startWeight} kg</h3>
                            <h3>{goal.targetWeight} kg</h3>
                            <h3>{new Date(goal.targetDate).toISOString().split("T")[0]}</h3>

                            {/* Shows whether this goal is currently active */}
                            <h3
                                className={
                                    goal.isActive
                                        ? "text-[#116a2aca] font-bold"
                                        : "text-gray-500"
                                }
                            >
                                {goal.isActive ? "Active" : "Old goal"}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Show more/less button for long goal history */}
                {goals.length >= 3 && (
                    <button
                        onClick={() => setShowAllGoals(!showAllGoals)}
                        className="w-[calc(100%+2.5rem)] -mx-5 border-t-2 mt-10 py-2 border-[#bad7c3] hover:bg-[#bad7c3] hover:rounded-b-2xl"
                    >
                        {showAllGoals ? "Show Less" : "View Full Goal History"}
                    </button>
                )}
            </section>
        </div>
    );
}

export default GoalHistory;