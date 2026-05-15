"use client"

const logs = [
  {
    id: 1,
    status: "success",
    latency: "120ms",
  },
  {
    id: 2,
    status: "failed",
    latency: "800ms",
  },
]

export default function DeliveryLogs() {

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4 text-white">
        Delivery Logs
      </h2>

      <div className="space-y-4">

        {logs.map((log) => (

          <div
            key={log.id}
            className="border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition"
          >

            <p>
              <span className="font-bold">
                Status:
              </span>{" "}
              <span
                className={
                  log.status === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {log.status}
              </span>
            </p>

            <p>
              <span className="font-bold">
                Latency:
              </span>{" "}
              <span className="text-gray-300">
                {log.latency}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}