import "../../App.css"
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import WeightHistory from "./Components/WeightHistory";
import GoalHistory from "./Components/GoalHistory";
import WeightForm from "./Components/WeightForm";
import GoalForm from "./Components/GoalForm";
import StatsCards from "./Components/StatsCards";
import { useEffect, useState } from "react";

function Tracking() {

    useEffect(() => {
        fetchDashboardData();
        fetchGoals();
    }, []);

    const [stats, setStats] = useState({
        currentWeight: 0,
        weeklyChange: 0,
        goalProgress: 0,
    });

    const [startWeight, setStartWeight] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const [targetDate, setTargetDate] = useState("");

    const [history, setHistory] = useState<any[]>([]);

    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");

    const [showAll, setShowAll] = useState(false);

    const visibleHistory = showAll ? history : history.slice(0, 8);

    const [goals, setGoals] = useState<any[]>([]);
    const [showAllGoals, setShowAllGoals] = useState(false);

    const [weightEditMode, setWeightEditMode] = useState(false);
    const [goalEditMode, setGoalEditMode] = useState(false);

    const [editingWeightId, setEditingWeightId] = useState<string | null>(null);
    const [editWeight, setEditWeight] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editNotes, setEditNotes] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");

    const [pendingGoalAction, setPendingGoalAction] = useState<string | null>(null);

    const [pendingWeightAction, setPendingWeightAction] = useState<{
        id: string;
        type: "edit" | "delete";
    } | null>(null);

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

    const visibleGoals = showAllGoals ? goals : goals.slice(0, 3);

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

    const startEditWeight = (entry: any) => {
        setEditingWeightId(entry._id);
        setEditWeight(String(entry.weight));
        setEditDate(new Date(entry.date).toISOString().split("T")[0]);
        setEditNotes(entry.notes || "");
    };

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

    const showMessage = (text: string, type: "success" | "error" = "success") => {
        setMessage(text);
        setMessageType(type);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const startDeleteWeight = (id: string) => {
        setEditingWeightId(null);
        setPendingWeightAction({ id, type: "delete" });
    };

    const startEditWeightConfirm = (entry: any) => {
        setPendingWeightAction({ id: entry._id, type: "edit" });
        startEditWeight(entry);
    };

    const cancelWeightAction = () => {
        setPendingWeightAction(null);
        setEditingWeightId(null);
    };

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

    const startDeleteGoal = (id: string) => {
        setPendingGoalAction(id);
    };

    const cancelGoalAction = () => {
        setPendingGoalAction(null);
    };

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
                >
                    {message}
                </div>
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
                    <div className="bg-white flex flex-col gap-5 p-5 rounded-xl">
                        <WeightForm
                            weight={weight}
                            date={date}
                            notes={notes}
                            setWeight={setWeight}
                            setDate={setDate}
                            setNotes={setNotes}
                            handleSave={handleSave}
                        />
                    </div>

                    <div className="bg-white flex flex-col gap-5 p-5 rounded-xl mt-5">
                        <GoalForm
                            startWeight={startWeight}
                            targetWeight={targetWeight}
                            targetDate={targetDate}
                            setStartWeight={setStartWeight}
                            setTargetWeight={setTargetWeight}
                            setTargetDate={setTargetDate}
                            handleSaveGoal={handleSaveGoal}
                        />
                    </div>

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
                            showAll={showAll}
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