"use client"

import { useState } from "react"
import { registerUser } from "@/services/auth"

export default function RegisterPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[400px] border p-6 rounded-xl">

        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

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
              const data = await registerUser(email, password)
              console.log(data)
            } catch (error) {
              console.log(error)
            }
          }}
          className="w-full bg-black text-white p-2 rounded"
        >
          Register
        </button>

      </div>
    </div>
  )
}