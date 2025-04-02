"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// <AdminWaitlist /> is an admin component to view and manage waitlist users
// It should be placed in a protected admin route/page

function AdminWaitlist() {
  const [waitlistEntries, setWaitlistEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const ENTRIES_PER_PAGE = 20;

  useEffect(() => {
    fetchWaitlistEntries();
  }, [page, statusFilter, searchTerm]);

  // Fetch waitlist entries from API
  const fetchWaitlistEntries = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        page,
        limit: ENTRIES_PER_PAGE,
        status: statusFilter,
      });

      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }

      const response = await fetch(
        `/api/admin/waitlist?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch waitlist entries");
      }

      const data = await response.json();
      setWaitlistEntries(data.entries || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Error fetching waitlist entries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle selecting/deselecting entries
  const toggleSelectEntry = (id) => {
    if (selectedEntries.includes(id)) {
      setSelectedEntries(selectedEntries.filter((entryId) => entryId !== id));
    } else {
      setSelectedEntries([...selectedEntries, id]);
    }
  };

  // Select/deselect all entries
  const toggleSelectAll = () => {
    if (selectedEntries.length === waitlistEntries.length) {
      setSelectedEntries([]);
    } else {
      setSelectedEntries(waitlistEntries.map((entry) => entry._id));
    }
  };

  // Invite selected users
  const inviteSelectedUsers = async () => {
    if (!selectedEntries.length) return;

    if (
      !confirm(`Invite ${selectedEntries.length} users to join the platform?`)
    ) {
      return;
    }

    try {
      const response = await fetch("/api/admin/waitlist/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIds: selectedEntries,
          batchNumber: currentBatch,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to invite users");
      }

      alert(`Successfully invited ${selectedEntries.length} users!`);
      setSelectedEntries([]);
      setCurrentBatch(currentBatch + 1);
      fetchWaitlistEntries();
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Error inviting users:", err);
    }
  };

  // Export waitlist data to CSV
  const exportToCSV = async () => {
    try {
      const response = await fetch("/api/admin/waitlist/export", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to export waitlist data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `waitlist-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Error exporting waitlist data:", err);
    }
  };

  // Render loading state
  if (isLoading && !waitlistEntries.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">Loading waitlist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Waitlist Management</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and invite users from your waitlist
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="invited">Invited</option>
            <option value="registered">Registered</option>
            <option value="declined">Declined</option>
            <option value="all">All</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search by email or name"
              className="pl-9 pr-3 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={inviteSelectedUsers}
            disabled={selectedEntries.length === 0}
            className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
          >
            Invite Selected ({selectedEntries.length})
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium flex-1 sm:flex-none"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Waitlist table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3 px-4 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      waitlistEntries.length > 0 &&
                      selectedEntries.length === waitlistEntries.length
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-primary focus:ring-primary rounded"
                  />
                </div>
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Interests
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Signed Up
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Plan
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {waitlistEntries.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No waitlist entries found
                </td>
              </tr>
            ) : (
              waitlistEntries.map((entry) => (
                <tr
                  key={entry._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedEntries.includes(entry._id)}
                      onChange={() => toggleSelectEntry(entry._id)}
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{entry.email}</span>
                      {entry.name && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {entry.name}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {entry.interests && entry.interests.length > 0 ? (
                        entry.interests.map((interest) => (
                          <span
                            key={interest}
                            className="inline-block px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                          >
                            {interest.replace("_", " ")}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">
                          No interests
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.daysOnWaitlist} days ago
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`capitalize ${
                        entry.interestedPlan === "premium"
                          ? "text-primary"
                          : entry.interestedPlan === "family"
                          ? "text-accent"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {entry.interestedPlan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        entry.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
                          : entry.status === "invited"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500"
                          : entry.status === "registered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminWaitlist;
