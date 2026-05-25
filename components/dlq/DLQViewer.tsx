"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"
import toast from "react-hot-toast"

export default function DLQViewer() {

  const [dead, setDead] = useState([])
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const fetchDLQ = async () => {
    try {
      const res = await api.get("/webhook/dlq")
      setDead(res.data)
    } catch {
      toast.error("Failed to load DLQ")
    }
  }

  useEffect(() => {
    fetchDLQ()

    const interval = setInterval(() => {
      fetchDLQ()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const retry = async (id: number) => {
    try {
      setLoadingId(id)

      await api.post(`/webhook/retry/${id}`)

      toast.success("Retry triggered")

      fetchDLQ()

    } catch {
      toast.error("Retry failed")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dead Letter Queue</h2>

      {dead.length === 0 && (
        <p className="text-gray-400">No failed deliveries</p>
      )}

      <div className="space-y-3">
        {dead.map((d: any) => (
          <div
            key={d.id}
            className="border border-gray-800 p-4 rounded-xl"
          >
            <p>
              <span className="font-bold">Delivery ID:</span>{" "}
              {d.id}
            </p>

            <p>
              <span className="font-bold">Status:</span>{" "}
              <span className="text-red-400">{d.status}</span>
            </p>

            <p className="break-all">
              <span className="font-bold">Target URL:</span>{" "}
              <a
                href={d.webhook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {d.webhook_url}
              </a>
            </p>

            <button
              onClick={() => retry(d.id)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mt-3 text-black transition"
            >
              {loadingId === d.id ? "Retrying..." : "Retry"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}