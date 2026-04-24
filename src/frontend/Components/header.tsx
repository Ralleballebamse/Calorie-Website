import { useState } from "react";

function Header() {

  const [selected, setSelected] = useState<"Home" | "Feature" | "Dashboard" | "Tracking" | null>("Home");

  return (
    <header className="flex items-center bg-white shadow px-6 h-18 relative">

        {/* Left */}
        <h1 className="text-[#116a2aca] text-2xl font-bold">VitaTrack</h1>

        {/* Center */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-20 text-xl">
          <button
            onClick={() => setSelected("Home")}
            className={`${selected == "Home"
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Home</button>
          <button
            onClick={() => setSelected("Feature")}
            className={`${selected == "Feature"
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Features</button>
          <button
            onClick={() => setSelected("Dashboard")}
            className={`${selected == "Dashboard"
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Dashboard</button>
            <button
            onClick={() => setSelected("Tracking")}
            className={`${selected == "Tracking"
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Tracking</button>
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-4 text-xl">
          <button className="whitespace-nowrap hover:underline text-[#8BA88E]">Log In</button>
          <div className="bg-[#1B3022] rounded-2xl px-4 py-1.5 flex justify-center hover:bg-[#3e5d48]">
            <button className="text-white">Get Started</button>
          </div>
        </div>
    </header>
  );
}

export default Header;
