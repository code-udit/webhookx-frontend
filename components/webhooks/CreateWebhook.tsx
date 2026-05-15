"use client"

import { useState } from "react"
import { createWebhook } from "@/services/webhook"
import toast from "react-hot-toast"

export default function CreateWebhook({ onCreated }: { onCreated: () => void }) {

  const [targetUrl, setTargetUrl] = useState("")
  const [eventType, setEventType] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!targetUrl.trim() || !eventType.trim()) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true)

      await createWebhook(targetUrl.trim())

      toast.success("Webhook created")

      onCreated()

      setTargetUrl("")
      setEventType("")

    } catch {
      toast.error("Failed to create webhook")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm w-[320px]">

      <h2 className="text-xl font-semibold mb-4 text-blue-900">
        Create Webhook
      </h2>

      <input
        type="text"
        placeholder="Target URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        className="w-full border border-blue-200 bg-white text-gray-900 p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Event Type"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="w-full border border-blue-200 bg-white text-gray-900 p-2.5 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg transition shadow"
      >
        {loading ? "Creating..." : "Create"}
      </button>

    </div>
  )
}