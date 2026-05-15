"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateWebhook from "@/components/webhooks/CreateWebhook";
import api from "@/services/api";
import { deleteWebhook } from "@/services/deleteWebhook";
import StatsCards from "@/components/dashboard/StatsCards";
import DeliveryLogs from "@/components/deliveries/DeliveryLogs";
import DLQViewer from "@/components/dlq/DLQViewer";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();

  const [webhooks, setWebhooks] = useState([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      const response = await api.get("/webhook/list");
      setWebhooks(response.data);
    } catch {
      toast.error("Failed to load webhooks");
    }
  };

  const triggerEvent = async () => {
    try {
      await api.post("/event/create", {
        event_type: "default",
        payload: {
          type: "test.event",
          source: "dashboard",
          message: "Webhook triggered manually",
          timestamp: new Date().toISOString(),
        },
      });

      toast.success("Event triggered");
    } catch {
      toast.error("Failed to trigger event");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-gray-900 p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-900">WebhookX Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* center section with info */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
        <div className="flex flex-col items-center gap-4">
          <CreateWebhook onCreated={fetchWebhooks} />

          <button
            onClick={triggerEvent}
            className="w-[400px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Trigger Test Event
          </button>
        </div>

        <div className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm max-w-sm">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to Test Webhooks
          </h3>

          <p className="text-sm text-gray-700 leading-relaxed">
            Use a webhook testing service like{" "}
            <a
              href="https://webhook.site"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-700 underline hover:text-blue-900"
            >
              webhook.site
            </a>
            . Copy your unique URL and paste it into the target URL field. You
            can use any event type. After creating the webhook, click
            <span className="font-medium text-blue-700">
              {" "}
              Trigger Test Event
            </span>{" "}
            to send a sample request. After refreshing, you will see delivery logs and responses
            update in real time.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <StatsCards />
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Your Webhooks
        </h2>

        {webhooks.length === 0 && (
          <p className="text-gray-700">No webhooks created yet</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {webhooks.map((webhook: any) => (
            <div
              key={webhook.id}
              className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p>
                <span className="font-semibold">URL:</span> {webhook.target_url}
              </p>

              <p>
                <span className="font-semibold">Event:</span>{" "}
                {webhook.event_type}
              </p>

              <button
                onClick={async () => {
                  try {
                    setLoadingId(webhook.id);
                    await deleteWebhook(webhook.id);
                    toast.success("Webhook deleted");
                    fetchWebhooks();
                  } catch {
                    toast.error("Delete failed");
                  } finally {
                    setLoadingId(null);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
              >
                {loadingId === webhook.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm">
          <DeliveryLogs />
        </div>

        <div className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm">
          <DLQViewer />
        </div>
      </div>
    </div>
  );
}
