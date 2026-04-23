import "../App.css"
import Header from "../Components/header";
import Footer from "../Components/footer";

function DashBoard() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
            <Header />
            <div className="p-10">
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
            </div>
            <Footer />
        </div>
    );
}

export default DashBoard;