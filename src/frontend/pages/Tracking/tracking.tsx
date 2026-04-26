import "../../App.css"
import Header from "../../Components/header";
import Footer from "../../Components/footer";
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
                alert("Please enter a realistic weight between 30 and 300 kg.");
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
                alert(data.message);
                return;
            }

            console.log("Saved:", data);

            // clear inputs after save
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

            console.log("Goal response:", data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setStartWeight("");
            setTargetWeight("");
            setTargetDate("");

            fetchDashboardData();
            fetchGoals();

            alert("Goal saved!");
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

    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
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
                        <h2 className="text-xl font-bold">Log Weight</h2>
                        <section>
                            <h3>Weight Value</h3>
                            <input
                                type="number"
                                min="30"
                                max="300"
                                step="0.1"
                                placeholder="00.00"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                            />
                        </section>
                        <section>
                            <h3>Date</h3>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                            />
                        </section>
                        <section>
                            <h3>Optional Notes</h3>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="How are you feeling today?"
                                className="bg-blue-100 rounded-xl h-30 w-full outline-none p-3 resize-none"
                            />
                        </section>
                        <button
                            onClick={handleSave}
                            className="bg-[#1B3022] rounded-2xl text-white h-10 hover:bg-[#3b674a]">+ Save Entry</button>
                    </div>

                    <div className="bg-white flex flex-col gap-5 p-5 rounded-xl mt-5">
                        <h2 className="text-xl font-bold">Set Goal</h2>

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

                        <section>
                            <h3>Target Date</h3>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                            />
                        </section>

                        <button
                            onClick={handleSaveGoal}
                            className="bg-[#1B3022] rounded-2xl text-white h-10 hover:bg-[#3b674a]">
                            Save Goal</button>
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

                    <div>

                    </div>
                </div>
                <div className="w-14/20 flex flex-col gap-5">

                    <div className="flex justify-between">
                        <div className="bg-white w-1/4 p-5 rounded-2xl flex flex-col gap-4">
                            <h3 className="text-2xl">Current Weight</h3>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold">{stats.currentWeight}</span>
                                <span className="text-sm self-end">kg</span>
                            </div>
                        </div>

                        <div className="bg-white w-1/4 p-5 rounded-2xl flex flex-col gap-4">
                            <h3 className="text-2xl">Weekly Change</h3>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold">
                                    {stats.weeklyChange > 0 ? "+" : ""}
                                    {stats.weeklyChange}
                                </span>
                                <span className="text-sm self-end">kg</span>
                            </div>
                        </div>

                        <div className="bg-white w-1/4 p-5 rounded-2xl flex flex-col gap-4">
                            <h3 className="text-2xl">Goal Progress</h3>

                            <div className="flex">
                                <h3 className="text-2xl font-bold">{stats.goalProgress}%</h3>
                            </div>

                            <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#3e5d48] rounded-full"
                                    style={{ width: `${stats.goalProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl pb-0 p-5">
                        <div>
                            <h2 className="text-2xl font-bold py-5">Weight History</h2>

                            <section>
                                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] text-xl mb-5">
                                    <h2>DATE</h2>
                                    <h2>WEIGHT</h2>
                                    <h2>CHANGE</h2>
                                    <h2>NOTES</h2>
                                </div>

                                <div className="flex flex-col gap-8">
                                    {visibleHistory.map((entry) => (
                                        <div
                                            key={entry._id}
                                            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] gap-4 items-start"
                                        >
                                            <h3 className="min-w-0 wrap-break-word overflow-wrap-anywhere">
                                                {new Date(entry.date).toISOString().split("T")[0]}
                                            </h3>

                                            <h3 className="min-w-0 wrap-break-word">
                                                {entry.weight} kg
                                            </h3>

                                            <h3
                                                className={`min-w-0 wrap-break-word ${entry.change < 0
                                                    ? "text-red-500"
                                                    : entry.change > 0
                                                        ? "text-[#116a2aca]"
                                                        : ""
                                                    }`}
                                            >
                                                {entry.change < 0
                                                    ? `↓ ${entry.change} kg`
                                                    : entry.change > 0
                                                        ? `↑ +${entry.change} kg`
                                                        : "– 0.0 kg"}
                                            </h3>

                                            <h3 className="min-w-0 wrap-break-word whitespace-pre-wrap">
                                                {entry.notes || "–"}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </section>
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

                    <div className="bg-white rounded-2xl pb-0 p-5">
                        <h2 className="text-2xl font-bold py-5">Goal History</h2>

                        <section>
                            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] text-xl mb-5">
                                <h2>START</h2>
                                <h2>TARGET</h2>
                                <h2>TARGET DATE</h2>
                                <h2>STATUS</h2>
                            </div>

                            <div className="flex flex-col gap-8">
                                {visibleGoals.map((goal) => (
                                    <div
                                        key={goal._id}
                                        className="grid grid-cols-[1fr_1fr_1fr_1fr] items-start"
                                    >
                                        <h3>{goal.startWeight} kg</h3>
                                        <h3>{goal.targetWeight} kg</h3>
                                        <h3>{new Date(goal.targetDate).toISOString().split("T")[0]}</h3>

                                        <h3
                                            className={
                                                goal.isActive ? "text-[#116a2aca] font-bold" : "text-gray-500"
                                            }
                                        >
                                            {goal.isActive ? "Active" : "Old goal"}
                                        </h3>
                                    </div>
                                ))}
                            </div>

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