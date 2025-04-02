// This script is used to check if MongoDB connection works
// Run it with: node scripts/check-mongo-connection.js

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

async function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    const envFile = await readFile(envPath, "utf8");

    // Simple parsing of .env file
    const envVars = envFile.split("\n").reduce((acc, line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        acc[key] = value;
      }
      return acc;
    }, {});

    return envVars;
  } catch (error) {
    console.error("Error loading .env.local file:", error.message);
    return {};
  }
}

async function checkMongoConnection() {
  console.log("🔍 Checking MongoDB connection...");

  // Load environment variables
  const env = await loadEnv();
  const MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error(
      "❌ MONGODB_URI is not defined in .env.local or environment variables."
    );
    console.log(
      "Please add a valid MongoDB connection string to your .env.local file:"
    );
    console.log(
      "MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>"
    );
    return;
  }

  console.log("✅ MONGODB_URI is defined:", MONGODB_URI);

  // Check if the URI format seems valid
  if (
    !MONGODB_URI.startsWith("mongodb://") &&
    !MONGODB_URI.startsWith("mongodb+srv://")
  ) {
    console.error("❌ MONGODB_URI does not seem to be in the correct format.");
    console.log("It should start with mongodb:// or mongodb+srv://");
    return;
  }

  // Check if a database name is specified
  const databaseName = MONGODB_URI.split("/").pop().split("?")[0];
  if (!databaseName) {
    console.error("❌ No database name specified in MONGODB_URI.");
    console.log(
      "Make sure your URI includes a database name: mongodb+srv://user:pass@cluster.example.com/DATABASE_NAME"
    );
    return;
  }

  console.log("✅ Database name specified:", databaseName);
  console.log("✅ MONGODB_URI format seems valid.");
  console.log("🔌 Attempting to connect to MongoDB...");

  try {
    // Set mongoose debug mode to see queries
    mongoose.set("debug", true);

    // Try to connect
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Successfully connected to MongoDB!");
    console.log("🏁 Your MongoDB configuration is working correctly.");

    // Check if we can perform a simple operation
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      `ℹ️ Available collections: ${
        collections.map((c) => c.name).join(", ") || "None yet"
      }`
    );

    // Create a test document to verify write access
    try {
      // Create a temporary test schema and model
      const TestSchema = new mongoose.Schema({
        name: String,
        timestamp: { type: Date, default: Date.now },
      });

      // Check if model already exists
      const TestModel =
        mongoose.models.MongoTest || mongoose.model("MongoTest", TestSchema);

      // Try to create a document
      const testDoc = await TestModel.create({ name: "connection_test" });
      console.log(
        "✅ Successfully created test document with ID:",
        testDoc._id
      );

      // Clean up by deleting the test document
      await TestModel.deleteOne({ _id: testDoc._id });
      console.log("✅ Successfully deleted test document");
    } catch (writeError) {
      console.error("❌ Failed to write to database:", writeError.message);
      console.log(
        "This could indicate permissions issues with your MongoDB user."
      );
    }

    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
    console.error(error.message);
    console.error("Full error:", error);

    if (error.name === "MongoServerSelectionError") {
      console.log("\n🔍 Possible issues:");
      console.log("1. Network connectivity issue");
      console.log("2. MongoDB server is not running");
      console.log("3. IP address not whitelisted in MongoDB Atlas");
      console.log("4. Invalid username or password in the connection string");
    }

    console.log("\n📋 Troubleshooting steps:");
    console.log("1. Check your internet connection");
    console.log("2. Verify the connection string in .env.local");
    console.log("3. If using MongoDB Atlas, make sure your IP is whitelisted");
    console.log("4. Check if MongoDB server is running (if self-hosted)");
    console.log(
      "5. Make sure the database name in your connection string exists"
    );
  }
}

checkMongoConnection().catch((err) => {
  console.error("Unhandled error:", err);
});
