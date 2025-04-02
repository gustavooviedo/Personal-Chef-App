import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Waitlist from "@/models/Waitlist";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

// Admin endpoint to fetch waitlist entries with filtering and pagination
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

    // Get query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const status = url.searchParams.get("status") || "pending";
    const search = url.searchParams.get("search") || "";

    // Build query
    const query = {};

    // Filter by status
    if (status !== "all") {
      query.status = status;
    }

    // Search by email or name
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch entries
    const entries = await Waitlist.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Waitlist.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      entries,
      total,
      page,
      totalPages,
      limit,
    });
  } catch (error) {
    console.error("Admin waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data" },
      { status: 500 }
    );
  }
}
