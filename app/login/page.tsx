"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWakeupMessage, setShowWakeupMessage] = useState(false);

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 relative">
      {/* HOME BUTTON */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-white border border-blue-200 text-blue-900 px-4 py-2 rounded-lg shadow-sm hover:shadow transition"
      >
        Home
      </button>

      <div className="w-[400px] bg-white border border-blue-200 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-900">
          Welcome back
        </h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white border border-blue-200 text-gray-900 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white border border-blue-200 text-gray-900 p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={async () => {
            let timer: NodeJS.Timeout | undefined;

            try {
              setLoading(true);

              timer = setTimeout(() => {
                setShowWakeupMessage(true);
              }, 5000);

              await loginUser(email, password);

              if (timer) clearTimeout(timer);
              setShowWakeupMessage(false);

              toast.success("Login successful");
              router.push("/dashboard");
            } catch {
              if (timer) clearTimeout(timer);
              setShowWakeupMessage(false);

              toast.error("Invalid credentials");
            } finally {
              setLoading(false);
              setShowWakeupMessage(false);
            }
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition font-medium shadow"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {showWakeupMessage && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-medium text-amber-900">
              Connecting to server...
            </p>

            <p className="mt-1 text-sm text-amber-700">
              The backend is waking up after inactivity. This usually takes
              10–20 seconds.
            </p>

            <p className="mt-1 text-sm text-amber-700">
              Thanks for your patience.
            </p>
          </div>
        )}

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
