"use client";

import { useState } from "react";
import Link from "next/link";
import DebugButtonWaitlist from "@/components/DebugButtonWaitlist";

export default function DebugWaitlistPage() {
  const [activeTab, setActiveTab] = useState("debugForm");
  const [consoleOutput, setConsoleOutput] = useState([]);

  // Add to console output
  const addToConsole = (message, type = "info") => {
    const timestamp = new Date().toISOString().split("T")[1].slice(0, 12);
    setConsoleOutput((prev) => [
      ...prev,
      { id: Date.now(), message, timestamp, type },
    ]);
  };

  // Clear console
  const clearConsole = () => {
    setConsoleOutput([]);
  };

  // Test simple GET API
  const testSimpleAPI = async () => {
    addToConsole("Testing simple API endpoint...");

    try {
      const response = await fetch("/api/test");
      if (!response.ok) {
        throw new Error(
          `Response not OK: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      addToConsole(
        `✅ API test successful: ${JSON.stringify(data)}`,
        "success"
      );
    } catch (error) {
      addToConsole(`❌ API test failed: ${error.message}`, "error");
    }
  };

  // Run a connectivity check
  const runConnectivityCheck = async () => {
    addToConsole("Running connectivity diagnostics...");

    // Check internet connectivity
    try {
      addToConsole("Checking internet connectivity...");
      const googleResponse = await fetch("https://www.google.com", {
        mode: "no-cors",
        cache: "no-cache",
      });
      addToConsole("✅ Internet connection is working", "success");
    } catch (error) {
      addToConsole("❌ Internet connection check failed", "error");
    }

    // Check API server
    try {
      addToConsole("Checking API server...");
      const startTime = Date.now();
      const response = await fetch("/api/test");
      const endTime = Date.now();
      const data = await response.json();

      addToConsole(
        `✅ API server responded in ${endTime - startTime}ms`,
        "success"
      );
    } catch (error) {
      addToConsole(`❌ API server check failed: ${error.message}`, "error");
    }

    // Check MongoDB connection
    try {
      addToConsole("Testing database connection...");
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          skipEmail: true,
          _diagnosticMode: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        addToConsole("✅ Database connection successful", "success");
      } else {
        addToConsole(
          `❌ Database check failed: ${data.error || "Unknown error"}`,
          "error"
        );
      }
    } catch (error) {
      addToConsole(
        `❌ Database connectivity check failed: ${error.message}`,
        "error"
      );
    }

    addToConsole("Diagnostics complete", "info");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Waitlist Debug Tools</h1>
          <p className="text-gray-600">
            Use these tools to diagnose issues with waitlist signup
            functionality
          </p>
        </div>

        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("debugForm")}
            className={`px-4 py-2 font-medium ${
              activeTab === "debugForm"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Debug Form
          </button>
          <button
            onClick={() => setActiveTab("diagnostics")}
            className={`px-4 py-2 font-medium ${
              activeTab === "diagnostics"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Diagnostics
          </button>
          <button
            onClick={() => setActiveTab("networkTest")}
            className={`px-4 py-2 font-medium ${
              activeTab === "networkTest"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Network Test
          </button>
        </div>

        {activeTab === "debugForm" && (
          <div>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-yellow-800 mb-2">
                Debug Form
              </h2>
              <p className="text-sm text-yellow-700">
                This is a special version of the waitlist form with debug
                options and detailed logging. Use it to diagnose issues with the
                signup process.
              </p>
            </div>

            <DebugButtonWaitlist />
          </div>
        )}

        {activeTab === "diagnostics" && (
          <div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-blue-800 mb-2">
                System Diagnostics
              </h2>
              <p className="text-sm text-blue-700 mb-4">
                Run diagnostics to check all components of the waitlist system.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={testSimpleAPI}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                >
                  Test API Endpoint
                </button>
                <button
                  onClick={runConnectivityCheck}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                >
                  Full System Check
                </button>
                <button
                  onClick={clearConsole}
                  className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700"
                >
                  Clear Console
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">Console Output</h3>
                <span className="text-xs text-gray-500">
                  {consoleOutput.length} log entries
                </span>
              </div>
              <div className="bg-black text-white p-4 rounded-b-md text-sm font-mono h-96 overflow-y-auto">
                {consoleOutput.length === 0 ? (
                  <div className="text-gray-500 italic">
                    No log entries yet. Run a test to see results.
                  </div>
                ) : (
                  consoleOutput.map((entry) => (
                    <div
                      key={entry.id}
                      className={`mb-1 ${
                        entry.type === "error"
                          ? "text-red-400"
                          : entry.type === "success"
                          ? "text-green-400"
                          : entry.type === "warn"
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      [{entry.timestamp}] {entry.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "networkTest" && (
          <div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-purple-800 mb-2">
                API Network Tests
              </h2>
              <p className="text-sm text-purple-700 mb-2">
                Test your network connection to different API endpoints.
              </p>
              <p className="text-xs text-purple-600 italic">
                The tests will be added to the diagnostics console.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium mb-3">External Connectivity</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Test if you can connect to external websites.
                </p>
                <button
                  onClick={async () => {
                    addToConsole("Testing external connectivity...");
                    try {
                      const startTime = Date.now();
                      await fetch("https://www.google.com", {
                        mode: "no-cors",
                      });
                      const duration = Date.now() - startTime;
                      addToConsole(
                        `✅ Connected to Google.com in ${duration}ms`,
                        "success"
                      );
                    } catch (error) {
                      addToConsole(
                        `❌ Failed to connect to Google: ${error.message}`,
                        "error"
                      );
                    }
                  }}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  Test External Connection
                </button>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium mb-3">Internal API</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Test if the application's API endpoints are responsive.
                </p>
                <button
                  onClick={async () => {
                    addToConsole("Testing internal API response time...");
                    try {
                      const startTime = Date.now();
                      const response = await fetch("/api/test");
                      const data = await response.json();
                      const duration = Date.now() - startTime;
                      addToConsole(
                        `✅ API response received in ${duration}ms: ${JSON.stringify(
                          data
                        )}`,
                        "success"
                      );
                    } catch (error) {
                      addToConsole(
                        `❌ API test failed: ${error.message}`,
                        "error"
                      );
                    }
                  }}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  Test API Response Time
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">Network Tests Console</h3>
                <button
                  onClick={clearConsole}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  Clear
                </button>
              </div>
              <div className="bg-black text-white p-4 rounded-b-md text-sm font-mono h-64 overflow-y-auto">
                {consoleOutput.length === 0 ? (
                  <div className="text-gray-500 italic">
                    No log entries yet. Run a test to see results.
                  </div>
                ) : (
                  consoleOutput.map((entry) => (
                    <div
                      key={entry.id}
                      className={`mb-1 ${
                        entry.type === "error"
                          ? "text-red-400"
                          : entry.type === "success"
                          ? "text-green-400"
                          : entry.type === "warn"
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      [{entry.timestamp}] {entry.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
