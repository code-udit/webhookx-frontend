"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

export default function StatsCards() {

  const [stats, setStats] = useState({
    success: 0,
    failed: 0,
    pending: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get("/deliveries")

      const deliveries = res.data

      let success = 0
      let failed = 0
      let pending = 0

      deliveries.forEach((d: any) => {
        if (d.status === "success") success++
        else if (d.status === "failed" || d.status === "dead") failed++
        else pending++
      })

      setStats({ success, failed, pending })

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex gap-6">

      <div className="bg-white border border-blue-200 p-5 rounded-xl w-40 text-center shadow-sm">
        <p className="text-gray-600 text-sm">Total Delivered</p>
        <p className="text-2xl font-bold mt-1 text-blue-900">{stats.success}</p>
      </div>

      <div className="bg-white border border-blue-200 p-5 rounded-xl w-40 text-center shadow-sm">
        <p className="text-gray-600 text-sm">Failed Deliveries</p>
        <p className="text-2xl font-bold mt-1 text-blue-900">{stats.failed}</p>
      </div>

      <div className="bg-white border border-blue-200 p-5 rounded-xl w-40 text-center shadow-sm">
        <p className="text-gray-600 text-sm">Pending Jobs</p>
        <p className="text-2xl font-bold mt-1 text-blue-900">{stats.pending}</p>
      </div>

    </div>
  )
}