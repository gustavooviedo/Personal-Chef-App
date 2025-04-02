import { NextResponse } from "next/server";

// Simple test endpoint to verify API connectivity
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "API is working",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "ok",
      message: "POST request received",
      data: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to process request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
