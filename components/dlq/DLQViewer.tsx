"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { retryDelivery } from "@/services/dlq";

const failedJobs = [
  {
    id: 1,
    url: "https://test.com/webhook",
    status: "dead",
  },
];

export default function DLQViewer() {

  const [loadingId, setLoadingId] = useState<number | null>(null);

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4 text-white">
        Dead Letter Queue
      </h2>

      <div className="space-y-4">

        {failedJobs.map((job) => (

          <div
            key={job.id}
            className="border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition"
          >

            <p>
              <span className="font-bold">URL:</span>{" "}
              {job.url}
            </p>

            <p>
              <span className="font-bold">Status:</span>{" "}
              <span className="text-yellow-400">
                {job.status}
              </span>
            </p>

            <button
              onClick={async () => {
                try {
                  setLoadingId(job.id);

                  await retryDelivery(job.id);

                  toast.success("Retry triggered");
                } catch {
                  toast.error("Retry failed");
                } finally {
                  setLoadingId(null);
                }
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded mt-3 transition"
            >
              {loadingId === job.id ? "Retrying..." : "Retry"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}