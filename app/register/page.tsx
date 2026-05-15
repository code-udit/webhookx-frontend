"use client"

import { useState } from "react"
import { registerUser } from "@/services/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function RegisterPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">

      <div className="w-[400px] bg-white border border-blue-200 p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-900">
          Create your account
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
            try {
              setLoading(true)
              await registerUser(email, password)
              toast.success("Account created")
              router.push("/login")
            } catch {
              toast.error("Registration failed")
            } finally {
              setLoading(false)
            }
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition font-medium shadow"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  )
}