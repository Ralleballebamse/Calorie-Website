

// Props needed to display and manage the weight history table
type WeightHistoryProps = {
    history: any[];
    visibleHistory: any[];
    showAll: boolean;
    setShowAll: (value: boolean) => void;
    weightEditMode: boolean;
    setWeightEditMode: (value: boolean) => void;
    pendingWeightAction: {
        id: string;
        type: "edit" | "delete";
    } | null;
    editingWeightId: string | null;
    editWeight: string;
    editDate: string;
    editNotes: string;
    setEditWeight: (value: string) => void;
    setEditDate: (value: string) => void;
    setEditNotes: (value: string) => void;
    startEditWeightConfirm: (entry: any) => void;
    startDeleteWeight: (id: string) => void;
    cancelWeightAction: () => void;
    confirmWeightAction: (entry: any) => void;
};

function WeightHistory({
    history,
    visibleHistory,
    showAll,
    setShowAll,
    weightEditMode,
    setWeightEditMode,
    pendingWeightAction,
    editingWeightId,
    editWeight,
    editDate,
    editNotes,
    setEditWeight,
    setEditDate,
    setEditNotes,
    startEditWeightConfirm,
    startDeleteWeight,
    cancelWeightAction,
    confirmWeightAction,
}: WeightHistoryProps) {
    return (
        <div className="bg-white rounded-2xl pb-0 p-5">
            <div>
                {/* Header with manage/done toggle */}
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold py-5">Weight History</h2>

                    <button
                        onClick={() => setWeightEditMode(!weightEditMode)}
                        className="text-[#116a2aca] font-bold hover:underline"
                    >
                        {weightEditMode ? "Done" : "Manage"}
                    </button>
                </div>

                <section>
                    {/* Table headings change when manage mode is active */}
                    <div
                        className={`grid ${weightEditMode
                            ? "grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)]"
                            : "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)]"
                            } text-xl mb-5`}
                    >
                        {weightEditMode && <h2>ACTIONS</h2>}
                        <h2>DATE</h2>
                        <h2>WEIGHT</h2>
                        <h2>CHANGE</h2>
                        <h2>NOTES</h2>
                    </div>

                    <div className="flex flex-col gap-8">
                        {visibleHistory.map((entry) => (
                            <div
                                key={entry._id}
                                className={`grid ${weightEditMode
                                    ? "grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)]"
                                    : "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)]"
                                    } items-center`}
                            >
                                {/* Edit/delete controls only show in manage mode */}
                                {weightEditMode && (
                                    <div className="flex gap-2 items-center">
                                        {pendingWeightAction?.id === entry._id ? (
                                            <>
                                                <button
                                                    onClick={() => confirmWeightAction(entry)}
                                                    className="text-green-600 font-bold hover:underline"
                                                >Confirm</button>

                                                <button
                                                    onClick={cancelWeightAction}
                                                    className="text-red-500 font-bold hover:underline"
                                                >Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => startEditWeightConfirm(entry)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#116a2aca] text-white hover:bg-[#0d5422]"
                                                >
                                                    <i className="fa-solid fa-pen text-sm"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => startDeleteWeight(entry._id)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <i className="fa-solid fa-xmark text-lg"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Show editable inputs for the selected entry */}
                                {editingWeightId === entry._id ? (
                                    <>
                                        <input
                                            type="date"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                            className="bg-blue-100 rounded-lg p-2 outline-none"
                                        />

                                        <input
                                            type="number"
                                            value={editWeight}
                                            onChange={(e) => setEditWeight(e.target.value)}
                                            className="bg-blue-100 rounded-lg p-2 outline-none"
                                        />

                                        <h3 className="text-gray-500">Editing</h3>

                                        <input
                                            value={editNotes}
                                            onChange={(e) => setEditNotes(e.target.value)}
                                            className="bg-blue-100 rounded-lg p-2 outline-none"
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* Default read-only row */}
                                        <h3>{new Date(entry.date).toISOString().split("T")[0]}</h3>
                                        <h3>{entry.weight} kg</h3>

                                        {/* Color and icon show whether weight went up/down */}
                                        <h3
                                            className={
                                                entry.change < 0
                                                    ? "text-red-500"
                                                    : entry.change > 0
                                                        ? "text-[#116a2aca]"
                                                        : ""
                                            }
                                        >
                                            {entry.change < 0
                                                ? `↓ ${entry.change} kg`
                                                : entry.change > 0
                                                    ? `↑ +${entry.change} kg`
                                                    : "– 0.0 kg"}
                                        </h3>

                                        <h3>{entry.notes || "–"}</h3>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Show more/less button for long history */}
                {history.length >= 8 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-[calc(100%+2.5rem)] -mx-5 border-t-2 mt-10 py-2 border-[#bad7c3] hover:bg-[#bad7c3] hover:rounded-b-2xl"
                    >
                        {showAll ? "Show Less" : "View Full History"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default WeightHistory;