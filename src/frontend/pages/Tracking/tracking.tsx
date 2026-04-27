import "../../App.css"
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import WeightHistory from "./Components/WeightHistory";
import GoalHistory from "./Components/GoalHistory";
import WeightForm from "./Components/WeightForm";
import GoalForm from "./Components/GoalForm";
import StatsCards from "./Components/StatsCards";
import { useEffect, useState } from "react";

// Tracking page: handles weight logs, goals, stats, editing, and deletion
function Tracking() {

    // Fetch initial tracking data when the page loads
    useEffect(() => {
        fetchDashboardData();
        fetchGoals();
    }, []);

    // Summary statistics displayed in the stats cards (top section)
    const [stats, setStats] = useState({
        currentWeight: 0,
        weeklyChange: 0,
        goalProgress: 0,
    });

    // Goal form inputs
    const [startWeight, setStartWeight] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const [targetDate, setTargetDate] = useState("");

    // Weight form inputs
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");

    // Weight history and goal history data from backend
    const [history, setHistory] = useState<any[]>([]);
    const [goals, setGoals] = useState<any[]>([]);

    // Toggle showing full history vs limited preview
    const [showAllHistory, setShowAll] = useState(false);
    const [showAllGoals, setShowAllGoals] = useState(false);

    // Controls how many history rows are visible
    const visibleHistory = showAllHistory ? history : history.slice(0, 8);
    const visibleGoals = showAllGoals ? goals : goals.slice(0, 3);

    // Toggle edit/manage modes for tables
    const [weightEditMode, setWeightEditMode] = useState(false);
    const [goalEditMode, setGoalEditMode] = useState(false);

    // Stores temporary edit values for a selected weight entry
    const [editingWeightId, setEditingWeightId] = useState<string | null>(null);
    const [editWeight, setEditWeight] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editNotes, setEditNotes] = useState("");

    // Toast message shown for success/error feedback
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");

    // Tracks which goal is waiting for delete confirmation
    const [pendingGoalAction, setPendingGoalAction] = useState<string | null>(null);

    // Tracks whether a weight entry is waiting for edit or delete confirmation
    const [pendingWeightAction, setPendingWeightAction] = useState<{
        id: string;
        type: "edit" | "delete";
    } | null>(null);

    // Fetch stats and weight history for the tracking page
    const fetchDashboardData = async () => {
        const response = await fetch("http://localhost:5000/api/weights/dashboard", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            setStats(data.stats);
            setHistory(data.history);
        }
    };

    // Save a new weight entry
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            const weightNumber = Number(weight);

            if (!weight || weightNumber < 30 || weightNumber > 300) {
                showMessage("Please enter a realistic weight between 30 and 300 kg.", "error");
                return;
            }

            const response = await fetch("http://localhost:5000/api/weights", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    weight: Number(weight),
                    date,
                    notes,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(data.message, "error");
                return;
            }

            setWeight("");
            setDate("");
            setNotes("");

            fetchDashboardData();

        } catch (error) {
            console.error(error);
        }
    };

    // Save a new goal and refresh dashboard/goals
    const handleSaveGoal = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/goals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    startWeight: Number(startWeight),
                    targetWeight: Number(targetWeight),
                    targetDate,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(data.message, "error");
                return;
            }

            setStartWeight("");
            setTargetWeight("");
            setTargetDate("");

            fetchDashboardData();
            fetchGoals();

            showMessage("Goal saved!", "success");
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch all goals for the user
    const fetchGoals = async () => {
        const response = await fetch("http://localhost:5000/api/goals", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            setGoals(data.goals);
        }
    };

    // Delete selected weight entry
    const handleDeleteWeight = async (id: string) => {
        const response = await fetch(`http://localhost:5000/api/weights/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message, "error");
            return;
        }

        setPendingWeightAction(null);
        fetchDashboardData();
    };

    // Delete selected goal
    const handleDeleteGoal = async (id: string) => {
        const response = await fetch(`http://localhost:5000/api/goals/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message, "error");
            return;
        }

        setPendingGoalAction(null);
        fetchGoals();
        fetchDashboardData();
    };

    // Prepare selected weight entry for editing
    const startEditWeight = (entry: any) => {
        setEditingWeightId(entry._id);
        setEditWeight(String(entry.weight));
        setEditDate(new Date(entry.date).toISOString().split("T")[0]);
        setEditNotes(entry.notes || "");
    };

    // Update selected weight entry
    const handleUpdateWeight = async (id: string) => {
        const response = await fetch(`http://localhost:5000/api/weights/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                weight: Number(editWeight),
                date: editDate,
                notes: editNotes,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message, "error");
            return;
        }

        setEditingWeightId(null);
        fetchDashboardData();
    };

    // Show temporary success/error message
    const showMessage = (text: string, type: "success" | "error" = "success") => {
        setMessage(text);
        setMessageType(type);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    // Start delete confirmation for a weight entry
    const startDeleteWeight = (id: string) => {
        setEditingWeightId(null);
        setPendingWeightAction({ id, type: "delete" });
    };

    // Start edit confirmation for a weight entry
    const startEditWeightConfirm = (entry: any) => {
        setPendingWeightAction({ id: entry._id, type: "edit" });
        startEditWeight(entry);
    };

    // Cancel current weight edit/delete action
    const cancelWeightAction = () => {
        setPendingWeightAction(null);
        setEditingWeightId(null);
    };

    // Confirm either edit or delete action for weight entry
    const confirmWeightAction = (entry: any) => {
        if (!pendingWeightAction) return;

        if (pendingWeightAction.type === "edit") {
            handleUpdateWeight(entry._id);
            setPendingWeightAction(null);
        }

        if (pendingWeightAction.type === "delete") {
            handleDeleteWeight(entry._id);
        }
    };

    // Start delete confirmation for a goal
    const startDeleteGoal = (id: string) => {
        setPendingGoalAction(id);
    };

    // Cancel goal delete confirmation
    const cancelGoalAction = () => {
        setPendingGoalAction(null);
    };

    // Confirm goal deletion
    const confirmGoalAction = (goal: any) => {
        if (!pendingGoalAction) return;
        handleDeleteGoal(goal._id);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">

            {message && (
                <div
                    className={`fixed top-24 self-center z-50 px-5 py-3 rounded-xl shadow-lg text-white ${messageType === "success" ? "bg-[#1B3022]" : "bg-red-500"
                        }`}
                >{message}</div>
            )}

            <Header />

            <div className="p-10 flex justify-between">
                <div className="w-5/20">
                    <div className="flex flex-col gap-5 mb-5">
                        <h1 className="text-4xl font-bold">
                            Precision <br /> Tracking
                        </h1>
                        <p className="text-[#116a2aca]">
                            Document your journey with medical grade precision.
                            Consistent monitoring its the foundation of long-term wellness.
                        </p>
                    </div>

                    <WeightForm
                        weight={weight}
                        date={date}
                        notes={notes}
                        setWeight={setWeight}
                        setDate={setDate}
                        setNotes={setNotes}
                        handleSave={handleSave}
                    />

                    <GoalForm
                        startWeight={startWeight}
                        targetWeight={targetWeight}
                        targetDate={targetDate}
                        setStartWeight={setStartWeight}
                        setTargetWeight={setTargetWeight}
                        setTargetDate={setTargetDate}
                        handleSaveGoal={handleSaveGoal}
                    />

                    <div className="bg-[#e2ece2] flex flex-col p-5 mt-5 rounded-2xl">
                        <div className="flex pb-3 gap-2">
                            <section className="bg-[#3e5d48] text-white w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                <i className="fa-regular fa-star"></i>
                            </section>
                            <h2 className="text-[#52795e] text-xl font-bold self-center">Steady Progress!</h2>
                        </div>
                        <p>You've logged 12 days in a row. Consistency is your greatest
                            strenght in achieving wellness goals.</p>
                    </div>
                </div>

                <div className="w-14/20 flex flex-col gap-5">

                    <StatsCards stats={stats} />

                    <div className="bg-white rounded-2xl pb-0 p-5">
                        <WeightHistory
                            history={history}
                            visibleHistory={visibleHistory}
                            showAll={showAllHistory}
                            setShowAll={setShowAll}
                            weightEditMode={weightEditMode}
                            setWeightEditMode={setWeightEditMode}
                            pendingWeightAction={pendingWeightAction}
                            editingWeightId={editingWeightId}
                            editWeight={editWeight}
                            editDate={editDate}
                            editNotes={editNotes}
                            setEditWeight={setEditWeight}
                            setEditDate={setEditDate}
                            setEditNotes={setEditNotes}
                            startEditWeightConfirm={startEditWeightConfirm}
                            startDeleteWeight={startDeleteWeight}
                            cancelWeightAction={cancelWeightAction}
                            confirmWeightAction={confirmWeightAction}
                        />
                    </div>

                    <div className="bg-white rounded-2xl pb-0 p-5">
                        <GoalHistory
                            goals={goals}
                            visibleGoals={visibleGoals}
                            showAllGoals={showAllGoals}
                            setShowAllGoals={setShowAllGoals}
                            goalEditMode={goalEditMode}
                            setGoalEditMode={setGoalEditMode}
                            pendingGoalAction={pendingGoalAction}
                            startDeleteGoal={startDeleteGoal}
                            cancelGoalAction={cancelGoalAction}
                            confirmGoalAction={confirmGoalAction}
                        />
                    </div>

                    <section className="w-full bg-[url('/Pictures/Pray.png')] bg-cover bg-center text-white text-center p-10 rounded-2xl">
                        <h2 className="text-3xl">Scientific Perspective</h2>
                        <p className="text-2xl">Weight fluctuates based on hydration, sodium, and muscle recovery. <br />
                            Focus on the 7-day rolling average for the most accurate health picture.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Tracking;