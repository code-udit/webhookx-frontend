"use client"

export default function StatsCards() {

  return (
    <div className="grid grid-cols-3 gap-4 mb-10">

      <div className="border p-6 rounded-xl">
        <h2 className="text-lg font-bold">
          Total Delivered
        </h2>

        <p className="text-3xl mt-3">
          120
        </p>
      </div>

      <div className="border p-6 rounded-xl">
        <h2 className="text-lg font-bold">
          Failed Deliveries
        </h2>

        <p className="text-3xl mt-3">
          8
        </p>
      </div>

      <div className="border p-6 rounded-xl">
        <h2 className="text-lg font-bold">
          Pending Jobs
        </h2>

        <p className="text-3xl mt-3">
          14
        </p>
      </div>

    </div>
  )
}