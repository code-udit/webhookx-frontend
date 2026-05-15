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

  return (
    <div className="p-10 bg-gray-950 min-h-screen text-white">
      
      <div className="flex justify-between items-center mb-10">
        
        <h1 className="text-3xl font-bold">
          WebhookX Dashboard
        </h1>

        <StatsCards />

        <div className="flex gap-4 items-center">
          
          <CreateWebhook onCreated={fetchWebhooks} />

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>

        </div>

      </div>

      {webhooks.length === 0 && (
        <p className="text-gray-400 mb-4">
          No webhooks created yet
        </p>
      )}

      <div className="space-y-4">
        
        {webhooks.map((webhook: any) => (
          
          <div
            key={webhook.id}
            className="border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition"
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
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-3 transition"
            >
              {loadingId === webhook.id ? "Deleting..." : "Delete"}
            </button>

          </div>

        ))}

      </div>

      <div className="mt-10">
        <DeliveryLogs />
      </div>

      <div className="mt-10">
        <DLQViewer />
      </div>

    </div>
  );
}