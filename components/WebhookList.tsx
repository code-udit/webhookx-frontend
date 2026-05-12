"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function WebhookList() {
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      const response = await api.get("/webhook/list");

      setWebhooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Webhooks</h2>

      <div className="space-y-4">
        {webhooks.map(
          (webhook: { id: number; target_url: string; event_type: string }) => (
            <div key={webhook.id} className="border p-4 rounded-xl">
              <p>
                <span className="font-bold">URL:</span> {webhook.target_url}
              </p>

              <p>
                <span className="font-bold">Event:</span> {webhook.event_type}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
