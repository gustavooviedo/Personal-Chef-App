"use client";

import { useState } from "react";

export default function DebugPage() {
  const [testResult, setTestResult] = useState(null);
  const [waitlistResult, setWaitlistResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testSimpleApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/test");
      const data = await response.json();
      setTestResult({
        status: response.status,
        data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testWaitlistApi = async () => {
    setLoading(true);
    setError(null);
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
          interests: ["meal_planning"],
          marketingConsent: true,
        }),
      });
      const data = await response.json();
      setWaitlistResult({
        status: response.status,
        data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">API Debug Page</h1>

      <div className="space-y-8">
        {/* Test API Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test API</h2>
          <button
            onClick={testSimpleApi}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Simple API
          </button>
          {testResult && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Response:</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* Waitlist API Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Waitlist API</h2>
          <button
            onClick={testWaitlistApi}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Waitlist API
          </button>
          {waitlistResult && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Response:</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto">
                {JSON.stringify(waitlistResult, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded">
            <h3 className="text-red-700 dark:text-red-300 font-medium mb-2">
              Error:
            </h3>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-2">Testing API endpoints...</p>
          </div>
        )}
      </div>
    </div>
  );
}
