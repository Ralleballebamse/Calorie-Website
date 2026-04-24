import "../App.css"
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useState } from "react";
import {
    AreaChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Tracking() {

    const data = [
        { date: "Sep 01", weight: 74.8 },
        { date: "Sep 08", weight: 74.5 },
        { date: "Sep 15", weight: 74.4 },
        { date: "Sep 22", weight: 72.4 },
        { date: "Today", weight: 71.9 },
    ];

    const [selected, setSelected] = useState<"Weekly" | "Monthly" | null>("Weekly");

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
                            <button className="bg-[#1B3022] rounded-xl text-white text-xl h-10 w-40 hover:bg-[#3b674a]">+ Add Entry</button>
                        </section>
                    </div>

                    <div className="flex gap-5 justify-between">
                        <section className="flex flex-col w-1/4 bg-white p-5 rounded-xl gap-2 justify-center">
                            <h2 className="text-xl">CURRENT WEIGHT</h2>
                            <h3 className="font-bold text-4xl">72.4 kg</h3>
                            <h4>-0.4 kg from yesterday</h4>
                        </section>

                        <section className="flex flex-col w-1/4 bg-white p-5 rounded-xl gap-2 justify-center">
                            <h2 className="text-xl">TOTAL PROGRESS</h2>
                            <h3 className="font-bold text-4xl">-5.2 kg</h3>
                            <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full w-65/100 bg-[#3e5d48] rounded-full"></div>
                            </div>
                            <h4>65% of target goal reached</h4>
                        </section>

                        <section className="flex w-2/4 bg-white p-5 rounded-xl justify-between">
                            <div className="flex flex-col bg-white gap-2 justify-center">
                                <h2 className="text-xl">WEEKLY TREND</h2>
                                <h3 className="font-bold text-4xl">Steady Decrease</h3>
                                <h4>Your average weight dropped by 0.8 kg compared to last week.</h4>
                            </div>
                            <div className="flex">
                                <img src="/Pictures/Statistic.png" alt="Statistics" className="rounded-2xl w-50" />
                            </div>
                        </section>
                    </div>

                    <div className="flex gap-5">
                        <div className="bg-white rounded-2xl p-8 h-auto w-7/10">
                            <div className="mb-8 flex justify-between">
                                <section>
                                    <h3 className="font-bold">Weight Progress Analysis</h3>
                                    <p className="text-sm text-gray-500">Last 30 Days Tracking</p>
                                </section>
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

                            <ResponsiveContainer width="100%" height="70%">
                                <AreaChart data={data}>
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
                        <div className="bg-white w-3/10 flex flex-col p-10 gap-10 rounded-2xl">
                            <section className="flex justify-between">
                                <h2>Recent Activity</h2>
                                <button className="hover:underline">View All</button>
                            </section>
                            <section className="flex gap-3">
                                <div className="bg-[#3e5d48] text-white w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                    <i className="fa-solid fa-feather-pointed"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold">Weight Logged</h3>
                                    <h4>72.4 kg (-0.4kg)</h4>
                                </div>
                                <h4 className="ml-auto">08:30 AM</h4>
                            </section>

                            <section className="flex gap-3">
                                <div className="bg-[#3e5d48] text-white w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                    <i className="fa-solid fa-feather-pointed"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold">Weight Logged</h3>
                                    <h4>72.4 kg (-0.4kg)</h4>
                                </div>
                                <h4 className="ml-auto">Yesterday</h4>
                            </section>

                            <section className="flex gap-3">
                                <div className="bg-[#3e5d48] text-white w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                    <i className="fa-solid fa-feather-pointed"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold">Weight Logged</h3>
                                    <h4>72.4 kg (-0.4kg)</h4>
                                </div>
                                <h4 className="ml-auto">2 days ago</h4>
                            </section>

                            <section className="flex gap-3">
                                <div className="bg-[#3e5d48] text-white w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                    <i className="fa-solid fa-feather-pointed"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold">Weight Logged</h3>
                                    <h4>72.4 kg (-0.4kg)</h4>
                                </div>
                                <h4 className="ml-auto">1 week ago</h4>
                            </section>
                        </div>
                    </div>

                    <div className="bg-[url('/Pictures/VitaPro.png')] rounded-2xl h-auto text-white">
                        <section className="flex flex-col gap-5 w-1/2 p-10">
                            <h2 className="text-4xl">Upgrade to VitaTrack Pro</h2>
                            <h3 className="text-xl">Unlock advanced AI analysis of your biomarkers and personalized meal plans tailored to your metabolism</h3>
                            <button className="bg-white rounded-2xl w-50 h-15 text-xl text-black font-bold hover:bg-[#3b674a]">Start Free Trial</button>
                        </section>
                    </div>


                </div>
            </main>
            <Footer />
        </ div>
    );
}

export default Tracking;