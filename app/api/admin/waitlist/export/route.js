import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Waitlist from "@/models/Waitlist";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

// Admin endpoint to export waitlist data as CSV
export async function GET(req) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectMongo();

    // Check if the user is an admin
    const user = await User.findOne({ email: session.user.email });

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Fetch all waitlist entries
    const waitlistEntries = await Waitlist.find().sort({ createdAt: -1 });

    if (!waitlistEntries || waitlistEntries.length === 0) {
      return NextResponse.json(
        { error: "No waitlist entries found" },
        { status: 404 }
      );
    }

    // Convert waitlist entries to CSV
    const headers = [
      "Email",
      "Name",
      "Interested Plan",
      "Interests",
      "Referral Source",
      "Phone",
      "Marketing Consent",
      "Preferred Contact",
      "Status",
      "Signup Date",
      "Days on Waitlist",
      "Invited At",
      "Invite Batch",
      "Referral Code",
      "Referred By",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Notes",
    ];

    const rows = waitlistEntries.map((entry) => {
      // Format date
      const signupDate = entry.createdAt
        ? new Date(entry.createdAt).toISOString().split("T")[0]
        : "";

      const invitedDate = entry.invitedAt
        ? new Date(entry.invitedAt).toISOString().split("T")[0]
        : "";

      // Calculate days on waitlist
      const daysOnWaitlist = entry.createdAt
        ? Math.ceil(
            (new Date() - new Date(entry.createdAt)) / (1000 * 60 * 60 * 24)
          )
        : 0;

      // Format interests as comma-separated list
      const interests = Array.isArray(entry.interests)
        ? entry.interests.join(", ")
        : "";

      return [
        entry.email || "",
        entry.name || "",
        entry.interestedPlan || "",
        interests,
        entry.referralSource || "",
        entry.phone || "",
        entry.marketingConsent ? "Yes" : "No",
        entry.preferredContact || "",
        entry.status || "",
        signupDate,
        daysOnWaitlist.toString(),
        invitedDate,
        entry.inviteBatch ? entry.inviteBatch.toString() : "",
        entry.referralCode || "",
        entry.referredBy || "",
        entry.utmSource || "",
        entry.utmMedium || "",
        entry.utmCampaign || "",
        entry.notes || "",
      ];
    });

    // Create CSV content
    let csv = headers.join(",") + "\n";

    rows.forEach((row) => {
      // Properly escape CSV fields
      const escapedRow = row.map((field) => {
        // If field contains commas, quotes, or newlines, wrap in quotes
        if (
          typeof field === "string" &&
          (field.includes(",") || field.includes('"') || field.includes("\n"))
        ) {
          // Replace double quotes with two double quotes
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      });

      csv += escapedRow.join(",") + "\n";
    });

    // Return CSV file
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="waitlist-export-${
          new Date().toISOString().split("T")[0]
        }.csv"`,
      },
    });
  } catch (error) {
    console.error("Admin export error:", error);
    return NextResponse.json(
      { error: "Failed to export waitlist data" },
      { status: 500 }
    );
  }
}
