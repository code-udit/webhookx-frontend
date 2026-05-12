"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[400px] border p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={async () => {
            try {
              const data = await loginUser(email, password);

              console.log(data);

              localStorage.setItem("token", data.access_token);

              router.push("/dashboard");
            } catch (error) {
              console.log(error);
            }
          }}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
