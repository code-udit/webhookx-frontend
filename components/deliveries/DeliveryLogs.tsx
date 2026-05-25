"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

export default function DeliveryLogs() {

  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const res = await api.get("/deliveries/logs")
      setLogs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Delivery Logs</h2>

      {logs.length === 0 && (
        <p className="text-gray-400">No delivery logs yet</p>
      )}

      <div className="space-y-3">
        {logs.map((log: any) => (
          <div
            key={log.id}
            className="border border-gray-800 p-4 rounded-xl"
          >
            <p>
              <span className="font-bold">Status:</span>{" "}
              <span
                className={
                  log.status === "success"
                    ? "text-green-400"
                    : log.status === "failed" || log.status === "dead"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              >
                {log.status}
              </span>
            </p>

            <p>
              <span className="font-bold">Attempts:</span>{" "}
              {log.attempt_count}
            </p>

            <p>
              <span className="font-bold">Delivery ID:</span>{" "}
              {log.id}
            </p>

            <p className="break-all">
              <span className="font-bold">Target URL:</span>{" "}
              <a
                href={log.webhook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {log.webhook_url}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}