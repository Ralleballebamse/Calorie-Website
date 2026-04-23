import "../App.css";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/Pictures/Leaves.jpeg')]">

      {/* Topbar info */}
      <header className="flex flex-col items-center gap-2 pt-10 pb-15">
        <h1 className="text-[#07fb4cca] font-bold text-2xl">VitaTrack</h1>
        <h3 className="text-xl text-[#07fb4cca]">Precision wellness for your longevity</h3>
      </header>

      {/* Topbar inside main container */}
      <main className="flex justify-center">
        <div className="auto flex flex-col w-1/3 bg-white rounded-2xl px-20 py-15">
          <div className="flex flex-col items-center pb-15 gap-1">
            <h1 className="font-bold text-3xl">Welcome Back</h1>
            <p className="text-center text-xl">Enter your credentials to access your dashboard</p>
          </div>

          {/* Input for both email and password */}
          <div className="flex flex-col gap-10">
            <div className="text-xl">
              <label>Email or Username</label>
              <div className="bg-blue-100 rounded-xl border h-12 flex px-4">
                <input type="text" placeholder="name@example.com" className="w-full outline-none" />
              </div>
            </div>
            <div className="text-xl">
              <div className="flex justify-between">
                <label>Password</label>
                <button className="text-[#116a2aca] hover:underline">Forgot Password?</button>
              </div>
              <div className="bg-blue-100 rounded-xl border h-12 flex px-4">
                <input type="password" placeholder="•••••••••" className="w-full outline-none" />
              </div>
            </div>

            {/* Checkbox for keep login and button login */}
            <div className="text-xl flex gap-2 items-center">
              <input type="checkbox" className="w-5 h-5 appearance-none border rounded checked:appearance-auto checked:accent-[#116a2aca]" />
              <label htmlFor="">Keep me logged in</label>
            </div>
            <button className="bg-[#1B3022] text-white text-3xl rounded-xl h-20 hover:bg-[#3f704f]">Log In</button>
          </div>

          {/* Bottombar for main */}
          <div className="py-10 flex flex-col items-center gap-10">
            <p>--------------------- or continue with ---------------------</p>
            <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-200">
              <i className="fa-brands fa-google"></i>
              Google</button>
            <div className="flex gap-2 text-xl">
              <p>New to VitaTrack?</p>
              <button className="text-[#116a2aca] font-bold hover:underline">Create Account</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer containing nav */}
      <footer>
        <nav className="flex gap-10 justify-center pb-10 pt-15 text-[#07fb4cca]">
          <button className="hover:underline">Privacy</button>
          <button className="hover:underline">Terms of Service</button>
          <button className="hover:underline">Help Center</button>
        </nav>
      </footer>

    </div>
  );
}

export default LoginPage;