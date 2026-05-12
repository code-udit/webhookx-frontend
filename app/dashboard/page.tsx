"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import CreateWebhook from "@/components/webhooks/CreateWebhook"

export default function DashboardPage() {

  const router = useRouter()

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }

  }, [])

  return (
      <div className="p-10 flex justify-between items-center">
    
        <h1 className="text-3xl font-bold">
          WebhookX Dashboard
        </h1>

        <CreateWebhook />
    
        <button
          onClick={() => {
            localStorage.removeItem("token")
            router.push("/login")
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      
      </div>
    )
}