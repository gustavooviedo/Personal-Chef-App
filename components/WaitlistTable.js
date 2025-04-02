"use client";

import { useState } from "react";

export default function WaitlistTable({ entries }) {
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sort entries
  const sortedEntries = [...entries].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  // Filter entries
  const filteredEntries = sortedEntries.filter((entry) => {
    const matchesSearch =
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || entry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by email or name..."
            className="input input-bordered w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="invited">Invited</option>
            <option value="registered">Registered</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="table w-full">
        <thead>
          <tr>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Date
              {sortField === "createdAt" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("email")}>
              Email
              {sortField === "email" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("name")}>
              Name
              {sortField === "name" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th>Plan</th>
            <th>Interests</th>
            <th>Status</th>
            <th>Marketing</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={entry._id}>
              <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
              <td>{entry.email}</td>
              <td>{entry.name || "-"}</td>
              <td className="capitalize">{entry.interestedPlan}</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {entry.interests?.map((interest) => (
                    <span
                      key={interest}
                      className="badge badge-sm badge-primary"
                    >
                      {interest.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <span
                  className={`badge badge-sm ${
                    entry.status === "pending"
                      ? "badge-warning"
                      : entry.status === "invited"
                      ? "badge-info"
                      : entry.status === "registered"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {entry.status}
                </span>
              </td>
              <td>
                {entry.marketingConsent ? (
                  <span className="badge badge-sm badge-success">Yes</span>
                ) : (
                  <span className="badge badge-sm badge-ghost">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No entries found matching your criteria
        </div>
      )}
    </div>
  );
}
