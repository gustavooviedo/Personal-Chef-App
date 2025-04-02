import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// This is a server-side component to ensure the user is an admin.
// If not, it will redirect to the login page or dashboard.
export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // If user is not logged in, redirect to login
  if (!session || !session.user) {
    redirect(config.auth.loginUrl);
  }

  // Connect to the database
  await connectMongo();

  // Check if the user is an admin
  const user = await User.findOne({ email: session.user.email });

  // If user doesn't exist or isn't an admin, redirect to dashboard
  if (!user || !user.isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>{session.user.email}</span>
          <a
            href="/api/auth/signout"
            className="text-sm bg-primary-foreground/20 hover:bg-primary-foreground/30 px-3 py-1 rounded-md"
          >
            Sign out
          </a>
        </div>
      </div>
      <div className="flex-1 container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
