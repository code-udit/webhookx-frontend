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
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">

      <div className="w-[400px] bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create your account
        </h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg transition font-medium"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

      </div>

    </div>
  )
}