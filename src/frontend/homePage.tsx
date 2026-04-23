import "./index.css";
import Header from "./Components/header";
import Footer from "./Components/footer";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
      <Header />
      <main className="h-auto py-30">
        <div className="flex justify-between pb-40 px-10">
          <div className="flex flex-col gap-10 max-w-1/2">
            <div className="flex gap-2 bg-[#bfcec0] rounded-xl justify-center items-center w-1/2">
              <i className="fa-solid fa-shield-heart"></i>
              <p>Precision Wellness Monitering</p>
            </div>
            <h2 className="text-5xl font-bold">Track Your Journey, Transform Your Health</h2>
            <p>The professional way to monitor your progress and achieve your wellness goals.
              Experience a clinical-grade tracking interface
              designed for holistic clarity.
            </p>
            <nav className="flex gap-5">
              <button className="bg-[#1B3022] text-white h-14 w-50 text-2xl rounded-2xl">Get Started</button>
              <button className="bg-[#bfcec0] text-[#3e5d48] h-14 w-50 text-2xl rounded-2xl">Log In</button>
            </nav>
          </div>
          <img src="Pictures/HeadPicture.png" alt="Statistics about weighlosing" className="rounded-2xl" />
        </div>

        <div className="px-10 py-10">
          <div className="flex flex-col items-center bg-[#1B3D34] py-10 rounded-3xl">
            <div className="flex flex-col gap-5 w-1/2 text-center">
              <h2 className="font-bold text-4xl text-white">Ready to reach your target?</h2>
              <p className="text-[#8BA88E]">Join thousands of users who have transformed their relationship
                with health through precise data and clinical insight.</p>
              <button className="text-[#1B3D34] bg-white font-bold h-15 w-55 rounded-2xl self-center text-xl">Start Your Profile</button>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;