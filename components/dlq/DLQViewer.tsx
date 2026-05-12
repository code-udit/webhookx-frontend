"use client"

const failedJobs = [
  {
    id: 1,
    url: "https://test.com/webhook",
    status: "dead",
  },
]

export default function DLQViewer() {

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Dead Letter Queue
      </h2>

      <div className="space-y-4">

        {failedJobs.map((job) => (

          <div
            key={job.id}
            className="border p-4 rounded-xl"
          >

            <p>
              <span className="font-bold">
                URL:
              </span>{" "}
              {job.url}
            </p>

            <p>
              <span className="font-bold">
                Status:
              </span>{" "}
              {job.status}
            </p>

            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded mt-3"
            >
              Retry
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}