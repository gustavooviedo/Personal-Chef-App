import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Waitlist from "@/models/Waitlist";
import { sendEmail } from "@/libs/resend";

// This route is used to store waitlist signups
// Includes email validation and duplicate handling
export async function POST(req) {
  try {
    console.log("Waitlist API called");

    // Connect to MongoDB with better error handling
    await connectMongo();
    console.log("MongoDB connected successfully");

    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    try {
      // Check if this email is already on the waitlist
      const existingEntry = await Waitlist.findOne({ email: body.email });
      console.log("Existing entry check completed");

      if (existingEntry) {
        // Return success but note it's a duplicate
        console.log("Email already exists in waitlist");
        return NextResponse.json({
          success: true,
          message: "You're already on our waitlist!",
        });
      }

      // Sanitize and validate interests to ensure they match enum values
      const validInterests = body.interests
        ? body.interests.filter((interest) =>
            [
              "meal_planning",
              "grocery_list",
              "recipe_discovery",
              "budget_optimization",
              "dietary_needs",
              "family_planning",
              "waste_reduction",
              "other",
            ].includes(interest)
          )
        : [];

      // Sanitize and set default values for required fields with enums
      const sanitizedData = {
        email: body.email,
        name: body.name || "",
        interestedPlan: ["premium", "family", "undecided"].includes(
          body.interestedPlan
        )
          ? body.interestedPlan
          : "undecided",
        interests: validInterests,
        referralSource:
          body.referralSource &&
          [
            "search_engine",
            "social_media",
            "friend",
            "advertisement",
            "blog",
            "other",
          ].includes(body.referralSource)
            ? body.referralSource
            : undefined,
        phone: body.phone || "",
        marketingConsent: Boolean(body.marketingConsent),
        preferredContact: ["email", "sms", "both"].includes(
          body.preferredContact
        )
          ? body.preferredContact
          : "email",
        notes: body.notes || "",
        referralCode: body.referralCode || "",
        referredBy: body.referredBy || "",
        utmSource: body.utmSource || "",
        utmMedium: body.utmMedium || "",
        utmCampaign: body.utmCampaign || "",
      };

      // Create a new waitlist entry with sanitized data
      console.log(
        "Creating waitlist entry with data:",
        JSON.stringify(sanitizedData)
      );
      const waitlistEntry = await Waitlist.create(sanitizedData);
      console.log("Waitlist entry created successfully");

      // Check if we should skip email (for testing)
      const skipEmail = body.skipEmail === true;

      // Send confirmation email to the user
      if (waitlistEntry && !skipEmail) {
        try {
          console.log("Attempting to send confirmation email");
          await sendEmail({
            to: body.email,
            subject: "Welcome to the MealPlanner Waitlist!",
            text: `Hi ${
              body.name || "there"
            },\n\nThank you for joining our waitlist! We're excited to have you on board and can't wait to share our meal planning service with you.\n\nWe're working hard to build a tool that will transform how you plan meals, shop for groceries, and reduce food waste.\n\nWe'll keep you updated on our progress and let you know as soon as you're invited to try the service.\n\nIf you have any questions in the meantime, feel free to reply to this email.\n\nBon Appétit!\nThe MealPlanner Team`,
            html: `
              <h1>You're on the list!</h1>
              <p>Hi ${body.name || "there"},</p>
              <p>
                Thank you for joining our waitlist! We're excited to have you
                on board and can't wait to share our meal planning service
                with you.
              </p>
              <p>
                We're working hard to build a tool that will transform how you
                plan meals, shop for groceries, and reduce food waste.
              </p>
              <p>
                We'll keep you updated on our progress and let you know as
                soon as you're invited to try the service.
              </p>
              <p>
                If you have any questions in the meantime, feel free to reply to
                this email.
              </p>
              <p>Bon Appétit!</p>
              <p>The MealPlanner Team</p>
            `,
          });
          console.log("Email sent successfully");
        } catch (emailError) {
          console.error("Error sending welcome email:", emailError);
          // Continue even if email fails - don't block signup
        }
      }

      return NextResponse.json({
        success: true,
        message: "Successfully added to waitlist!",
        entryId: waitlistEntry._id.toString(),
      });
    } catch (dbError) {
      console.error("Database Error:", dbError);

      // Provide more specific error messages for common database issues
      if (dbError.name === "ValidationError") {
        const validationErrors = Object.keys(dbError.errors)
          .map((field) => `${field}: ${dbError.errors[field].message}`)
          .join(", ");

        return NextResponse.json(
          {
            error: `Validation error: ${validationErrors}`,
          },
          {
            status: 400,
          }
        );
      }

      if (dbError.name === "MongoServerError" && dbError.code === 11000) {
        // Duplicate key error
        return NextResponse.json(
          {
            error: "This email is already on our waitlist.",
            success: true,
            message: "You're already on our waitlist!",
          },
          {
            status: 200, // Return 200 for duplicates to be user-friendly
          }
        );
      }

      return NextResponse.json(
        {
          error: "Database error. Please try again later.",
          details:
            process.env.NODE_ENV === "development"
              ? dbError.message
              : undefined,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Waitlist Error:", error);
    // Provide more specific error messages based on error type
    if (error.name === "MongooseServerSelectionError") {
      return NextResponse.json(
        {
          error: "Unable to connect to database. Please try again later.",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        {
          status: 503,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to join waitlist. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

// Get waitlist count (for displaying on the landing page)
export async function GET() {
  try {
    await connectMongo();

    // Count all pending waitlist entries
    const count = await Waitlist.countDocuments({ status: "pending" });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error getting waitlist count:", error);
    return NextResponse.json(
      {
        error: "Failed to get waitlist count",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
