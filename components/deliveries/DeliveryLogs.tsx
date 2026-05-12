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

      <h2 className="text-2xl font-bold mb-4">
        Delivery Logs
      </h2>

      <div className="space-y-4">

        {logs.map((log) => (

          <div
            key={log.id}
            className="border p-4 rounded-xl"
          >

            <p>
              <span className="font-bold">
                Status:
              </span>{" "}
              {log.status}
            </p>

            <p>
              <span className="font-bold">
                Latency:
              </span>{" "}
              {log.latency}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}