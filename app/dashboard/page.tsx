"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import CreateWebhook from "@/components/webhooks/CreateWebhook"
import api from "@/services/api"
import { deleteWebhook } from "@/services/deleteWebhook"

export default function DashboardPage() {

  const router = useRouter()

  const [webhooks, setWebhooks] = useState([])

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    fetchWebhooks()

  }, [])

  const fetchWebhooks = async () => {
    try {

      const response = await api.get("/webhook/list")

      setWebhooks(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-3xl font-bold">
          WebhookX Dashboard
        </h1>

        <div className="flex gap-4 items-center">

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

      </div>

      <div className="space-y-4">

        {webhooks.map((webhook: any) => (

          <div
            key={webhook.id}
            className="border p-4 rounded-xl"
          >

            <p>
              <span className="font-bold">URL:</span>{" "}
              {webhook.target_url}
            </p>

            <p>
              <span className="font-bold">Event:</span>{" "}
              {webhook.event_type}
            </p>

            <button
              onClick={async () => {
                try {

                  await deleteWebhook(webhook.id)

                  fetchWebhooks()

                } catch (error) {
                  console.log(error)
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-3"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}