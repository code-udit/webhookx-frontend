"use client"

import { useState } from "react"
import { createWebhook } from "@/services/webhook"

export default function CreateWebhook() {

  const [targetUrl, setTargetUrl] = useState("")
  const [eventType, setEventType] = useState("")

  return (
    <div className="border p-5 rounded-xl mt-6">

      <h2 className="text-xl font-bold mb-4">
        Create Webhook
      </h2>

      <input
        type="text"
        placeholder="Target URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="text"
        placeholder="Event Type"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        onClick={async () => {
          try {

            await createWebhook(
              targetUrl,
              eventType
            )

            alert("Webhook Created")

          } catch (error) {
            console.log(error)
          }
        }}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create
      </button>

    </div>
  )
}