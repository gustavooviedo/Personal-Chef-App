import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Waitlist from "@/models/Waitlist";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { sendEmail } from "@/libs/resend";

// Admin endpoint to invite users from the waitlist
export async function POST(req) {
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

    const body = await req.json();
    const { userIds, batchNumber } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "User IDs are required" },
        { status: 400 }
      );
    }

    // Get the users to invite
    const usersToInvite = await Waitlist.find({
      _id: { $in: userIds },
      status: "pending", // Only invite users that are in pending status
    });

    if (usersToInvite.length === 0) {
      return NextResponse.json(
        { error: "No valid users to invite" },
        { status: 400 }
      );
    }

    // Generate unique invite codes (in a real app, you'd probably use a more secure method)
    const inviteCodes = usersToInvite.map((user) => ({
      userId: user._id,
      code:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    }));

    // Store these invite codes somewhere - for example, you might add them to the user document
    // or store them in a separate collection

    // Update all users to 'invited' status
    const updatePromises = usersToInvite.map(async (user) => {
      // Find the invite code for this user
      const inviteData = inviteCodes.find(
        (data) => data.userId.toString() === user._id.toString()
      );

      // Update the user status and add invite data
      await Waitlist.updateOne(
        { _id: user._id },
        {
          status: "invited",
          invitedAt: new Date(),
          inviteBatch: batchNumber,
          // You might want to store the invite code in the user document
          referralCode: inviteData ? inviteData.code : undefined,
        }
      );

      // Send invite email to the user
      if (user.email) {
        try {
          await sendEmail({
            to: user.email,
            subject: "You're Invited to Join MealPlanner!",
            react: (
              <>
                <h1>Welcome to MealPlanner!</h1>
                <p>Hi {user.name || "there"},</p>
                <p>
                  We're excited to invite you to join MealPlanner! Your wait is
                  over.
                </p>
                <p>
                  You can now create an account and start planning your meals,
                  managing your grocery lists, and more.
                </p>
                <p>
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/signup?code=${
                      inviteData ? inviteData.code : ""
                    }`}
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      backgroundColor: "#4f46e5",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    Create Your Account
                  </a>
                </p>
                <p>
                  This invitation link is valid for 7 days. If you have any
                  questions, feel free to reply to this email.
                </p>
                <p>Happy meal planning!</p>
                <p>The MealPlanner Team</p>
              </>
            ),
          });
        } catch (emailError) {
          console.error(
            `Failed to send invite email to ${user.email}:`,
            emailError
          );
          // Continue with the rest of the invites even if one email fails
        }
      }
    });

    // Wait for all updates and emails to complete
    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      invited: usersToInvite.length,
      batch: batchNumber,
    });
  } catch (error) {
    console.error("Admin invite error:", error);
    return NextResponse.json(
      { error: "Failed to invite users" },
      { status: 500 }
    );
  }
}
