"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-gray-900 flex flex-col">

      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-blue-900">
          WebhookX
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-white border border-blue-300 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <h2 className="text-5xl font-bold text-blue-900 mb-6">
          Reliable Webhooks. Simplified.
        </h2>

        <p className="text-lg text-gray-700 max-w-xl mb-8">
          WebhookX helps you deliver events reliably with retries,
          logging, and dead-letter queue support.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Start Free
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-white border border-blue-300 px-6 py-3 rounded-lg"
          >
            Login
          </button>
        </div>

      </main>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-10 pb-16">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-blue-900 mb-2">
            Reliable Delivery
          </h3>
          <p className="text-gray-700">
            Automatic retries with exponential backoff.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-blue-900 mb-2">
            Full Logs
          </h3>
          <p className="text-gray-700">
            Track every webhook delivery with latency.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-blue-900 mb-2">
            Dead Letter Queue
          </h3>
          <p className="text-gray-700">
            Retry failed deliveries anytime.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-600">
        © 2026 WebhookX. All rights reserved.
      </footer>

    </div>
  );
}