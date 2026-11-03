
"use client";

import { useState } from "react";

export default function BackendStatus() {
  const [message, setMessage] = useState("Not connected yet");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  async function checkBackend() {
    setLoading(true);
    setMessage("Connecting to backend...");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/health"
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      setMessage(data.status);
      setConnected(true);
    } catch (error) {
      setMessage("Could not connect to backend");
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 rounded-2xl border border-[#e8e9e3] bg-white p-6">
      <h3 className="text-lg font-semibold">
        Backend Connection Test
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Check whether the Python backend is responding.
      </p>

      <button
        onClick={checkBackend}
        disabled={loading}
        className="mt-5 rounded-lg bg-[#78956e] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Test Backend Connection"}
      </button>

      <p className="mt-4 text-sm">
        Status:{" "}
        <span className={connected ? "text-green-700" : "text-gray-500"}>
          {message}
        </span>
      </p>
    </section>
  );
}
