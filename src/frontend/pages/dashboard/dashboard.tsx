import "../../App.css"
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import {
    AreaChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [selected, setSelected] = useState<"Weekly" | "Monthly">("Weekly");

    // Stores all dashboard data from the backend
    const [dashboardData, setDashboardData] = useState({
        currentWeight: 0,
        yesterdayChange: 0,
        totalProgress: 0,
        goalProgress: 0,
        weeklyTrend: "",
        weeklyTrendText: "",
        weeklyChart: [],
        monthlyChart: [],
        recentActivity: [],
    });

    // Fetch dashboard data once when the page loads
    useEffect(() => {
        const fetchDashboard = async () => {
            const response = await fetch("http://localhost:5000/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setDashboardData(data);
            }
        };

        fetchDashboard();
    }, []);

    // Select correct chart data depending on active tab
    const chartData =
        selected === "Weekly"
            ? dashboardData.weeklyChart
            : dashboardData.monthlyChart;

    // Prevent chart from crashing or looking broken when there is no data
    const hasData = chartData && chartData.length > 0;

    const safeChartData = hasData
        ? chartData
        : [
            { date: "", weight: 0 },
            { date: "", weight: 0 },
        ];

    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
            <Header />

            <main>
                <div className="flex flex-col  p-10 gap-10">
                    <div className="flex justify-between">

                        <section className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold">Health Dashboard</h1>
                            <h2 className="text-2xl">Welcome back. Your wellness metrics are looking consistent this week.</h2>
                        </section>
                        
                        <section className="flex flex-col justify-center">
                            <button
                                onClick={() => navigate("/tracking")}
                                className="bg-[#1B3022] rounded-xl text-white text-xl h-10 w-40 hover:bg-[#3b674a]"
                            >+ Add Entry</button>
                        </section>
                    </div>

                    {/* Top dashboard statistic cards */}
                    <div className="flex gap-5 justify-between">
                        <section className="flex flex-col w-1/4 bg-white p-5 rounded-xl gap-2 justify-center">
                            <h2 className="text-xl">CURRENT WEIGHT</h2>
                            <h3 className="font-bold text-4xl">
                                {dashboardData.currentWeight} kg
                            </h3>
                            <h4>
                                {dashboardData.yesterdayChange > 0 ? "+" : ""}
                                {dashboardData.yesterdayChange} kg from last log
                            </h4>
                        </section>

                        <section className="flex flex-col w-1/4 bg-white p-5 rounded-xl gap-2 justify-center">
                            <h2 className="text-xl">TOTAL PROGRESS</h2>
                            <h3 className="font-bold text-4xl">
                                {dashboardData.totalProgress > 0 ? "+" : ""}
                                {dashboardData.totalProgress} kg
                            </h3>
                            <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#3e5d48] rounded-full"
                                    style={{ width: `${dashboardData.goalProgress}%` }}
                                ></div>
                            </div>
                            <h4>{dashboardData.goalProgress}% of target goal reached</h4>
                        </section>

                        <section className="flex w-2/4 bg-white p-5 rounded-xl justify-between">
                            <div className="flex flex-col bg-white gap-2 justify-center">
                                <h2 className="text-xl">WEEKLY TREND</h2>
                                <h3 className="font-bold text-4xl">
                                    {dashboardData.weeklyTrend}
                                </h3>

                                <h4>{dashboardData.weeklyTrendText}</h4>
                            </div>
                            <div className="flex">
                                <img src="/Pictures/Statistic.png" alt="Statistics" className="rounded-2xl w-50" />
                            </div>
                        </section>
                    </div>

                    {/* Chart and recent activity section */}
                    <div className="flex gap-5">
                        <div className="bg-white rounded-2xl p-8 h-auto w-7/10">
                            <div className="mb-8 flex justify-between">
                                <section>
                                    <h3 className="font-bold">Weight Progress Analysis</h3>
                                    <p className="text-sm text-gray-500">Last 30 Days Tracking</p>
                                </section>

                                {/* Toggle between weekly and monthly chart views */}
                                <section className="bg-gray-200 rounded-lg p-1 flex w-fit">
                                    <button
                                        onClick={() => setSelected("Weekly")}
                                        className={`px-4 py-1 rounded-md ${selected === "Weekly"
                                            ? "bg-white shadow-sm"
                                            : "text-gray-600"
                                            }`}
                                    >Weekly</button>

                                    <button
                                        onClick={() => setSelected("Monthly")}
                                        className={`px-4 py-1 rounded-md ${selected === "Monthly"
                                            ? "bg-white shadow-sm"
                                            : "text-gray-600"
                                            }`}
                                    >Monthly</button>
                                </section>
                            </div>

                            {/* Weight progress chart */}
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={safeChartData}>
                                        <XAxis dataKey="date" />
                                        <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="weight"
                                            stroke="none"
                                            fill="#1B3D34"
                                            fillOpacity={0.1}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="weight"
                                            stroke="#55715C"
                                            strokeWidth={3}
                                            dot={{ r: 4 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent logged weight entries */}
                        <div className="bg-white w-3/10 flex flex-col p-10 gap-10 rounded-2xl">
                            <section className="flex justify-between">
                                <h2>Recent Activity</h2>
                                <button
                                    onClick={() => navigate("/tracking")}
                                    className="hover:underline">
                                        View All</button>
                            </section>

                            {dashboardData.recentActivity.map((activity: any) => (
                                <section key={activity._id} className="flex gap-3">
                                    <div className="bg-[#3e5d48] text-white w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                        <i className="fa-solid fa-feather-pointed"></i>
                                    </div>

                                    <div>
                                        <h3 className="font-bold">Weight Logged</h3>
                                        <h4>
                                            {activity.weight} kg (
                                            {activity.change > 0 ? "+" : ""}
                                            {activity.change} kg)
                                        </h4>
                                    </div>

                                    <h4 className="ml-auto">{activity.time}</h4>
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* Promotional section */}
                    <div className="bg-[url('/Pictures/VitaPro.png')] rounded-2xl h-auto text-white">
                        <section className="flex flex-col gap-5 w-1/2 p-10">
                            <h2 className="text-4xl">Upgrade to VitaTrack Pro</h2>
                            <h3 className="text-xl">Unlock advanced AI analysis of your biomarkers and personalized meal plans tailored to your metabolism</h3>
                            <button
                                className="bg-white rounded-2xl w-50 h-15 text-xl text-black font-bold hover:bg-[#3b674a]">Start Free Trial</button>
                        </section>
                    </div>

                </div>
            </main>
            <Footer />
        </ div>
    );
}

export default Dashboard;