import connectMongo from "@/libs/mongoose";
import Waitlist from "@/models/Waitlist";
import WaitlistTable from "@/components/WaitlistTable";

export default async function AdminWaitlistPage() {
  // Connect to database
  try {
    await connectMongo();
  } catch (error) {
    console.error("Error connecting to database:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-lg">
          Error connecting to database. Please try again later.
        </div>
      </div>
    );
  }

  // Fetch waitlist entries and convert to plain objects
  const waitlistEntries = await Waitlist.find({})
    .sort({ createdAt: -1 })
    .lean()
    .then((entries) =>
      entries.map((entry) => ({
        ...entry,
        _id: entry._id.toString(),
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
      }))
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Waitlist Management</h1>
        <div className="text-sm text-gray-500">
          Total Entries: {waitlistEntries.length}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <WaitlistTable entries={waitlistEntries} />
      </div>
    </div>
  );
}
