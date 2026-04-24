import "../App.css"
import Header from "../Components/header";
import Footer from "../Components/footer";

function Tracking() {
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
                                <img src="/Pictures/2Temporary.png" alt="Statistics" className="rounded-2xl" />
                            </div>

                        </section>
                    </div>




                </div>
            </main>

            <Footer />
        </ div>
    );
}

export default Tracking;