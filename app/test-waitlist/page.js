"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestWaitlistPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);

  const testWaitlistApi = async (skipEmail = false) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          name: "Test User",
          interestedPlan: "premium",
          interests: ["meal_planning", "grocery_list"],
          marketingConsent: true,
          skipEmail: skipEmail,
        }),
      });

      const data = await response.json();
      setResult({
        status: response.status,
        statusText: response.statusText,
        data,
      });
    } catch (err) {
      console.error("Error testing waitlist API:", err);
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const testSimpleApi = async () => {
    setLoading(true);
    setApiStatus(null);

    try {
      const response = await fetch("/api/test");
      const data = await response.json();
      setApiStatus({
        status: response.status,
        statusText: response.statusText,
        data,
      });
    } catch (err) {
      console.error("Error testing simple API:", err);
      setApiStatus({
        error: err.message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Waitlist API Test Page</h1>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">1. Test Simple API</h2>
        <p className="mb-4 text-sm text-gray-600">
          First, test if the API server is responding at all:
        </p>
        <button
          onClick={testSimpleApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test API Connection"}
        </button>

        {apiStatus && (
          <div className="mt-4">
            <h3 className="font-medium">Result:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded mt-2 overflow-x-auto text-sm">
              {JSON.stringify(apiStatus, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">2. Test Waitlist API</h2>
        <p className="mb-4 text-sm text-gray-600">
          This test will attempt to create a new waitlist entry with test data:
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => testWaitlistApi(false)}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Waitlist API"}
          </button>

          <button
            onClick={() => testWaitlistApi(true)}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Without Email"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h3 className="font-medium">Result:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded mt-2 overflow-x-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
