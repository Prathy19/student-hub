
"use client";

import { useState } from "react";

export default function QuestionPaperAnalyser() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/documents/extract",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Student Hub
        </a>

        <h1 className="mt-8 text-3xl font-bold text-gray-900">
          Question Paper Analyser
        </h1>

        <p className="mt-3 text-gray-600">
          Upload a syllabus or question paper PDF to extract
          its contents and analyse it.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

          <label className="block font-semibold text-gray-800">
            Choose your PDF
          </label>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(event) => {
              setFile(event.target.files?.[0] || null);
              setError("");
              setResult(null);
            }}
            className="mt-4 block w-full rounded-lg border border-gray-300 p-3 text-sm"
          />

          {file && (
            <p className="mt-3 text-sm text-gray-600">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Extracting PDF..." : "Upload and Extract Text"}
          </button>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

        </div>

        {result && (
          <div className="mt-8 rounded-xl border border-green-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-green-700">
              PDF extracted successfully!
            </h2>

            <p className="mt-3 text-gray-700">
              File: {result.filename}
            </p>

            <p className="text-gray-700">
              Total pages: {result.data.total_pages}
            </p>

            {result.data.pages.map(
              (page: { page: number; text: string }) => (
                <div
                  key={page.page}
                  className="mt-5 border-t border-gray-200 pt-4"
                >
                  <h3 className="font-semibold text-gray-800">
                    Page {page.page}
                  </h3>

                  <pre className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-600">
                    {page.text}
                  </pre>
                </div>
              )
            )}

          </div>
        )}

      </div>
    </main>
  );
}
