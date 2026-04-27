import "./index.css";
import Header from "./Components/header";
import Footer from "./Components/footer";
import StartYourProfile from "./Components/startYourProfile";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
            <Header />
            <main className="h-auto py-30">
                <div className="flex justify-between pb-40 px-10">
                    <div className="flex flex-col gap-10 max-w-1/2">
                        <div className="flex gap-2 bg-[#bfcec0] rounded-xl justify-center items-center w-1/2">
                            <i className="fa-solid fa-shield-heart"></i>
                            <p>Precision Wellness Monitoring</p>
                        </div>
                        <h2 className="text-5xl font-bold">Track Your Journey, Transform Your Health</h2>
                        <p>The professional way to monitor your progress and achieve your wellness goals.
                            Experience a clinical-grade tracking interface
                            designed for holistic clarity.
                        </p>
                        <nav className="flex gap-5">
                            <button
                                onClick={() => navigate("/create")}
                                className="bg-[#1B3022] text-white h-14 w-50 text-2xl rounded-2xl hover:bg-[#3e5d48]">Get Started</button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-[#bfcec0] text-[#3e5d48] h-14 w-50 text-2xl rounded-2xl hover:bg-[#8baf8d]">Log In</button>
                        </nav>
                    </div>
                    <img src="Pictures/HeadPicture.png" alt="Statistics about weighlosing" className="rounded-2xl" />
                </div>

                <div className="bg-[#dbe1eb] px-10 py-10">
                    <div className="flex flex-col gap-2 items-center text-center px-50 pb-15">
                        <h2 className="text-3xl font-bold">Empowering Precision Tracking</h2>
                        <p>Our scientific approach to weight monitoring provides deep insights beyond just the numbers</p>
                    </div>

                    <div className="flex justify-between">

                        <div className="flex bg-white rounded-2xl p-10 w-12/20">
                            <div className="flex flex-col gap-2 py-10">
                                <div className="bg-[#3e5d48] w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                    <i className="fa-regular fa-chart-bar text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold">Track weight easily</h3>
                                <p className="mr-50">Seamlessly log your daily metrics with an intuitive interface that respects your time and effort.</p>
                            </div>
                            <div className="flex items-center">
                                <img src="Pictures/Temporary.png" alt="Input your progress" className="rounded-2xl h-40 w-90" />
                            </div>
                        </div>


                        <div className="flex flex-col bg-[#1B3D34] p-10 w-7/20 gap-5 rounded-2xl">
                            <div className="bg-[#3e5d48] w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                <i className="fa-solid fa-chart-line text-white text-xl"></i>
                            </div>
                            <h3 className="text-white text-xl">View progress overtime</h3>
                            <p className="text-[#8BA88E]">Beautiful, high-fidelity charts that visualize your health journey with scientific clarity</p>
                            <div>
                                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-3/5 bg-white rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-[#8BA88E] pt-1">
                                    <h4>Initial</h4>
                                    <h4>Target</h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 flex justify-between">
                        <div className="flex flex-col w-7/20 bg-[#c8ddcb] p-10 rounded-2xl">
                            <div className="bg-[#3e5d48] w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                <i className="fa-solid fa-arrow-up-right-dots text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold pt-4">Monitor gains and losses</h3>
                            <p>Detailed breakdown of composition changes to help you understand your physiological shifts</p>
                            <div className="flex gap-3 pt-10">
                                <div className="bg-white rounded-xl w-1/2 flex flex-col px-3 h-14 justify-center">
                                    <h3 className="text-red-500">FAT LOSS</h3>
                                    <h3>-1.2kg</h3>
                                </div>
                                <div className="bg-white rounded-xl w-1/2 flex flex-col px-3 h-14 justify-center">
                                    <h3 className="text-[#3e5d48]">MUSCLE</h3>
                                    <h3>+0.4kg</h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-12/20 bg-white rounded-2xl p-10 gap-5 items-center">
                            <div>
                                <div className="flex">
                                    <img src="Pictures/2Temporary.png" alt="Input your progress" className="rounded-2xl h-40 w-100" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="bg-[#c8ddcb] w-10 h-10 flex flex-col text-center justify-center rounded-4xl">
                                    <i className="fa-solid fa-ranking-star text-[#1B3D34]"></i>
                                </div>
                                <h3 className="text-xl font-bold">Stay motivated with clear statistics</h3>
                                <p>Gamify your progress with achievement badges and predictive analytics that keep you on the right path</p>
                                <button className="font-bold hover:underline self-start">EXPLORE ANALYTICS
                                    <span className="text-2xl">→</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="m-10">
                    <StartYourProfile />
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default HomePage;