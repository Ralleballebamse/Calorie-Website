import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

type AuthFormProps = {
    mode: "login" | "register";
};

function AuthForm({ mode }: AuthFormProps) {
    const navigate = useNavigate();

    const isLogin = mode === "login";

    const [username, setUsername] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = isLogin
            ? "http://localhost:5000/api/auth/login"
            : "http://localhost:5000/api/auth/register";

        const body = isLogin
            ? { identifier, password }
            : { username, email, password };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        if (isLogin) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[url('/Pictures/Leaves.jpeg')]">
            <header className="flex flex-col items-center gap-2 pt-10 pb-15">
                <h1 className="text-[#07fb4cca] font-bold text-2xl">VitaTrack</h1>
                <h3 className="text-xl text-[#07fb4cca]">
                    Precision wellness for your longevity
                </h3>
            </header>

            <main className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-1/3 bg-white rounded-2xl px-20 py-15"
                >
                    <div className="flex flex-col items-center pb-15 gap-1">
                        <h1 className="font-bold text-3xl">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-center text-xl">
                            {isLogin
                                ? "Enter your credentials to access your dashboard"
                                : "Create your VitaTrack profile"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-10">
                        {!isLogin && (
                            <div className="text-xl">
                                <label>Username</label>
                                <div className="bg-blue-100 rounded-xl border h-12 flex px-4">
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full outline-none"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {isLogin ? (
                            <div className="text-xl">
                                <label>Email or Username</label>
                                <div className="bg-blue-100 rounded-xl border h-12 flex px-4">
                                    <input
                                        type="text"
                                        placeholder="name@example.com"
                                        className="w-full outline-none"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-xl">
                                <label>Email</label>
                                <div className="bg-blue-100 rounded-xl border h-12 flex px-4">
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="text-xl">
                            <div className="flex justify-between">
                                <label>Password</label>
                                {isLogin && (
                                    <button type="button" className="text-[#116a2aca] hover:underline">
                                        Forgot Password?
                                    </button>
                                )}
                            </div>

                            <div className="bg-blue-100 rounded-xl border h-12 flex px-4">
                                <input
                                    type="password"
                                    placeholder="•••••••••"
                                    className="w-full outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="text-xl flex gap-2 items-center">
                                <input type="checkbox" className="w-5 h-5" />
                                <label>Keep me logged in</label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-[#1B3022] text-white text-3xl rounded-xl h-20 hover:bg-[#3f704f]"
                        >
                            {isLogin ? "Log In" : "Create Account"}
                        </button>
                    </div>

                    <div className="py-10 flex flex-col items-center gap-10">
                        <div className="flex gap-2 text-xl">
                            <p>{isLogin ? "New to VitaTrack?" : "Already have an account?"}</p>

                            <Link
                                to={isLogin ? "/create" : "/login"}
                                className="text-[#116a2aca] font-bold hover:underline"
                            >
                                {isLogin ? "Create Account" : "Log In"}
                            </Link>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AuthForm;