"use client"

import { useState } from "react"
import { createWebhook } from "@/services/webhook"
import toast from "react-hot-toast"

export default function CreateWebhook() {

  const [targetUrl, setTargetUrl] = useState("")
  const [eventType, setEventType] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <div className="border p-5 rounded-xl mt-6 bg-gray-900">

      <h2 className="text-xl font-bold mb-4 text-white">
        Create Webhook
      </h2>

      <input
        type="text"
        placeholder="Target URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        className="w-full border border-gray-700 bg-gray-800 text-white p-2 mb-3 rounded"
      />

      <input
        type="text"
        placeholder="Event Type"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="w-full border border-gray-700 bg-gray-800 text-white p-2 mb-3 rounded"
      />

      <button
        onClick={async () => {
          try {
            setLoading(true)

            await createWebhook(targetUrl, eventType)

            toast.success("Webhook created")

            setTargetUrl("")
            setEventType("")

          } catch {
            toast.error("Creation failed")
          } finally {
            setLoading(false)
          }
        }}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full transition"
      >
        {loading ? "Creating..." : "Create"}
      </button>

    </div>
  )
}