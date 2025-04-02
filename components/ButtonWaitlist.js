"use client";

import { useState } from "react";
import Link from "next/link";

// <ButtonWaitlist /> is a component that allows users to join the waitlist
// It provides a form to collect email and other optional information
// The component handles form validation and submission to the /api/waitlist endpoint

function ButtonWaitlist({ className = "" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("undecided");
  const [interests, setInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Interest options for the form
  const interestOptions = [
    { id: "meal_planning", label: "Meal Planning" },
    { id: "grocery_list", label: "Grocery Lists" },
    { id: "recipe_discovery", label: "Recipe Discovery" },
    { id: "budget_optimization", label: "Budget Optimization" },
    { id: "dietary_needs", label: "Dietary Needs" },
    { id: "family_planning", label: "Family Meal Planning" },
    { id: "waste_reduction", label: "Reducing Food Waste" },
  ];

  // Handle interest checkbox changes
  const handleInterestChange = (interestId) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter((id) => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Maximum retry attempts
    const maxRetries = 3;
    let retryCount = 0;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        // Create an AbortController to set a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            interestedPlan: plan,
            interests,
            marketingConsent,
            // Track UTM parameters if they exist in the URL
            utmSource:
              new URLSearchParams(window.location.search).get("utm_source") ||
              "",
            utmMedium:
              new URLSearchParams(window.location.search).get("utm_medium") ||
              "",
            utmCampaign:
              new URLSearchParams(window.location.search).get("utm_campaign") ||
              "",
          }),
          signal: controller.signal,
        });

        // Clear the timeout
        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.ok) {
          setSubmitted(true);
          success = true;
          // Reset form
          setEmail("");
          setName("");
          setPlan("undecided");
          setInterests([]);
          setShowForm(false);
        } else {
          console.error("Error response:", data);
          setError(data.error || "Something went wrong. Please try again.");
          // Increase retry count only for server errors (5xx) which might be temporary
          if (response.status >= 500) {
            retryCount++;
            if (retryCount < maxRetries) {
              // Wait a bit before retrying (exponential backoff)
              await new Promise((resolve) =>
                setTimeout(resolve, 1000 * Math.pow(2, retryCount))
              );
              setError(
                `Connection issue. Retrying... (${retryCount}/${maxRetries})`
              );
            }
          } else {
            // For client errors (4xx), no need to retry
            break;
          }
        }
      } catch (err) {
        console.error("Waitlist submission error:", err);
        retryCount++;

        // Check if this was an abort error (timeout)
        if (err.name === "AbortError") {
          setError(
            `Request timed out. The server might be busy. Retrying... (${retryCount}/${maxRetries})`
          );
        } else {
          setError(
            `Connection error. Retrying... (${retryCount}/${maxRetries})`
          );
        }

        if (retryCount < maxRetries) {
          // Wait a bit before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, retryCount))
          );
        } else {
          setError(
            "Connection error. Please check your internet connection and try again. If the problem persists, please try again later."
          );
        }
      }
    }

    setIsSubmitting(false);
  };

  // Display success message after form submission
  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="text-lg font-medium mb-2">You're on the list!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Thank you for joining our waitlist. We'll notify you when we're ready
          to launch!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary hover:underline text-sm font-medium"
        >
          Join with another email
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {!showForm ? (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Join the Waitlist
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Join Our Waitlist</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Which plan are you interested in?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="plan"
                      value="premium"
                      checked={plan === "premium"}
                      onChange={() => setPlan("premium")}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Premium
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="plan"
                      value="family"
                      checked={plan === "family"}
                      onChange={() => setPlan("family")}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Family
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="plan"
                      value="undecided"
                      checked={plan === "undecided"}
                      onChange={() => setPlan("undecided")}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Not Sure
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  What features are you most interested in?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((option) => (
                    <label
                      key={option.id}
                      className="inline-flex items-center text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(option.id)}
                        onChange={() => handleInterestChange(option.id)}
                        className="text-primary focus:ring-primary rounded"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={() => setMarketingConsent(!marketingConsent)}
                    className="text-primary focus:ring-primary rounded"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    I agree to receive updates about the service
                  </span>
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800">
                  <div className="flex items-start">
                    <svg
                      className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
            </div>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By joining, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default ButtonWaitlist;
