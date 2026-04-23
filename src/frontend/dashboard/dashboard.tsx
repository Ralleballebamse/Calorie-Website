import "../App.css"
import Header from "../Components/header";
import Footer from "../Components/footer";

function DashBoard() {
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
                            <input type="text" placeholder="00.00" className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3" />
                        </section>
                        <section>
                            <h3>Date</h3>
                            <input type="date" placeholder="year - mm - dd" className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3" />
                        </section>
                        <section>
                            <h3>Optional Notes</h3>
                            <textarea
                                placeholder="How are you feeling today?"
                                className="bg-blue-100 rounded-xl h-30 w-full outline-none p-3 resize-none"
                            />
                        </section>
                        <button className="bg-[#1B3022] rounded-2xl text-white h-10 hover:bg-[#3b674a]">+ Save Entry</button>
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
                                <span className="text-2xl font-bold">62.2</span>
                                <span className="text-sm self-end">kg</span>
                            </div>
                        </div>

                        <div className="bg-white w-1/4 p-5 rounded-2xl flex flex-col gap-4">
                            <h3 className="text-2xl">Weekly Change</h3>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold">+0.8</span>
                                <span className="text-sm self-end">kg</span>
                            </div>
                        </div>

                        <div className="bg-white w-1/4 p-5 rounded-2xl flex flex-col gap-4">
                            <h3 className="text-2xl">Goal Progress</h3>
                            <div className="flex">
                                <h3 className="text-2xl font-bold">82%</h3>
                            </div>
                            <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full w-82/100 bg-[#3e5d48] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl pb-0 p-5">
                        <div>
                            <h2 className="text-2xl font-bold py-5">Weight History</h2>

                            <section className="flex">
                                {/* Date */}
                                <div className="w-1/5">
                                    <h2 className="text-xl">DATE</h2>
                                    <section className="flex flex-col gap-10 pt-5">
                                        <h3>2023-10-24</h3>
                                        <h3>2023-10-23</h3>
                                        <h3>2023-10-22</h3>
                                        <h3>2023-10-20</h3>
                                        <h3>2023-10-24</h3>
                                        <h3>2023-10-23</h3>
                                        <h3>2023-10-22</h3>
                                        <h3>2023-10-20</h3>
                                    </section>
                                </div>

                                {/* Weight */}
                                <div className="w-1/5">
                                    <h2 className="text-xl">WEIGHT</h2>
                                    <section className="flex flex-col gap-10 pt-5">
                                        <h3>63.7 kg</h3>
                                        <h3>64.7 kg</h3>
                                        <h3>64.7 kg</h3>
                                        <h3>65.9 kg</h3>
                                        <h3>63.7 kg</h3>
                                        <h3>64.7 kg</h3>
                                        <h3>64.7 kg</h3>
                                        <h3>65.9 kg</h3>
                                    </section>
                                </div>

                                {/* Change */}
                                <div className="w-1/5">
                                    <h2 className="text-xl">CHANGE</h2>
                                    <section className="flex flex-col gap-10 pt-5">
                                        <h3 className="text-red-500">↓ -1.5 kg</h3>
                                        <h3 className="text-[#116a2aca]">↑ + 1 kg</h3>
                                        <h3>– 0.0 kg</h3>
                                        <h3 className="text-[#116a2aca]">↑ + 1.2 kg</h3>
                                        <h3 className="text-red-500">↓ -1.5 kg</h3>
                                        <h3 className="text-[#116a2aca]">↑ + 1 kg</h3>
                                        <h3>– 0.0 kg</h3>
                                        <h3 className="text-[#116a2aca]">↑ + 1.2 kg</h3>
                                    </section>
                                </div>

                                {/* Notes */}
                                <div className="w-2/5">
                                    <h2 className="text-xl">NOTES</h2>
                                    <section className="flex flex-col gap-10 pt-5">
                                        <h3 >I trained alot and lost weight.</h3>
                                        <h3 >Did less training and ate more.</h3>
                                        <h3>Did not anything special.</h3>
                                        <h3 >–</h3>
                                        <h3 >I trained alot and lost weight.</h3>
                                        <h3 >Did less training and ate more.</h3>
                                        <h3>Did not anything special.</h3>
                                        <h3 >–</h3>
                                    </section>
                                </div>
                            </section>
                            <button className="w-[calc(100%+2.5rem)] -mx-5 border-t-2 mt-10 py-2 border-[#bad7c3] hover:bg-[#bad7c3] hover:rounded-b-2xl">View Full History</button>
                        </div>
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

export default DashBoard;