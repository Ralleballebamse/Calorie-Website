

// Props needed to control the goal form from the parent Tracking component
type GoalFormProps = {
    startWeight: string;
    targetWeight: string;
    targetDate: string;
    setStartWeight: (value: string) => void;
    setTargetWeight: (value: string) => void;
    setTargetDate: (value: string) => void;
    handleSaveGoal: () => void;
};

function GoalForm({
    startWeight,
    targetWeight,
    targetDate,
    setStartWeight,
    setTargetWeight,
    setTargetDate,
    handleSaveGoal,
}: GoalFormProps) {
    return (
        <div className="bg-white flex flex-col gap-5 p-5 rounded-xl mt-5">
            <h2 className="text-xl font-bold">Set Goal</h2>

            {/* Starting weight for the goal */}
            <section>
                <h3>Start Weight</h3>
                <input
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    placeholder="Example: 80"
                    value={startWeight}
                    onChange={(e) => setStartWeight(e.target.value)}
                    className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                />
            </section>

            {/* Target weight the user wants to reach */}
            <section>
                <h3>Target Weight</h3>
                <input
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    placeholder="Example: 70"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                />
            </section>

            {/* Date by which the user wants to reach the goal */}
            <section>
                <h3>Target Date</h3>
                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                />
            </section>

            {/* Saves the goal through the parent handler */}
            <button
                onClick={handleSaveGoal}
                className="bg-[#1B3022] rounded-2xl text-white h-10 hover:bg-[#3b674a]"
            >
                Save Goal
            </button>
        </div>
    );
}

export default GoalForm;