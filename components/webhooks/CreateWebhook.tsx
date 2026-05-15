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
    <div className="border border-gray-700 p-5 rounded-xl bg-[#111111] shadow-sm">

      <h2 className="text-xl font-semibold mb-4 text-white">
        Create Webhook
      </h2>

      <input
        type="text"
        placeholder="Target URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        className="w-full border border-gray-700 bg-[#1a1a1a] text-white p-2.5 mb-3 rounded-lg outline-none focus:border-indigo-500"
      />

      <input
        type="text"
        placeholder="Event Type"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="w-full border border-gray-700 bg-[#1a1a1a] text-white p-2.5 mb-4 rounded-lg outline-none focus:border-indigo-500"
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg transition"
      >
        {loading ? "Creating..." : "Create"}
      </button>

    </div>
  )
}