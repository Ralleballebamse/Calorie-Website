import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="flex items-center bg-white shadow px-6 h-18 relative">

        {/* Left */}
        <h1 className="text-[#116a2aca] text-2xl font-bold">VitaTrack</h1>

        {/* Center */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-20 text-xl">
          <button
            onClick={() => navigate("/")}
            className={`${isActive("/")
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Home</button>
          <button
            onClick={() => navigate("/feature")}
            className={`${isActive("/feature")
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Features</button>
          <button
            onClick={() => navigate("/dashboard")}
            className={`${isActive("/dashboard")
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Dashboard</button>
            <button
            onClick={() => navigate("/tracking")}
            className={`${isActive("/tracking")
              ? "!text-[#8BA88E] pb-1 border-b-2 border-[#8BA88E]"
              : ""
              }`}
          >Tracking</button>
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-4 text-xl">
          <button 
          onClick={() => navigate("/login")}
          className="whitespace-nowrap hover:underline text-[#8BA88E]">Log In</button>
          <div className="bg-[#1B3022] rounded-2xl px-4 py-1.5 flex justify-center hover:bg-[#3e5d48]">
            <button 
            onClick={() => navigate("/create")}
            className="text-white">Get Started</button>
          </div>
        </div>
    </header>
  );
}

export default Header;
