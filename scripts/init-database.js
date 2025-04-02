// This script initializes the MongoDB database for the application
// It creates necessary collections and indexes
// Run it with: node scripts/init-database.js

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

async function initDatabase() {
  console.log("🔧 Initializing database...");

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

  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Define schemas for essential collections
    console.log("📝 Creating schemas and models...");

    // 1. User schema (basic version for initialization)
    const userSchema = new mongoose.Schema(
      {
        name: String,
        email: {
          type: String,
          unique: true,
          required: true,
          trim: true,
          lowercase: true,
        },
        image: String,
        password: String,
        isAdmin: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      }
    );

    // 2. Waitlist schema
    const waitlistSchema = new mongoose.Schema(
      {
        email: {
          type: String,
          trim: true,
          lowercase: true,
          required: true,
          unique: true,
        },
        name: {
          type: String,
          trim: true,
        },
        interestedPlan: {
          type: String,
          enum: ["premium", "family", "undecided"],
          default: "undecided",
        },
        interests: [
          {
            type: String,
            enum: [
              "meal_planning",
              "grocery_list",
              "recipe_discovery",
              "budget_optimization",
              "dietary_needs",
              "family_planning",
              "waste_reduction",
              "other",
            ],
          },
        ],
        status: {
          type: String,
          enum: ["pending", "invited", "registered", "declined"],
          default: "pending",
        },
        marketingConsent: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      }
    );

    // Get models (or create if they don't exist)
    const User = mongoose.models.User || mongoose.model("User", userSchema);
    const Waitlist =
      mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

    // Create indexes
    console.log("🔍 Creating indexes...");

    // Email index on User collection
    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log("✅ Created unique index on User.email");

    // Email index on Waitlist collection
    await Waitlist.collection.createIndex({ email: 1 }, { unique: true });
    console.log("✅ Created unique index on Waitlist.email");

    // Status index on Waitlist collection for faster filtering
    await Waitlist.collection.createIndex({ status: 1 });
    console.log("✅ Created index on Waitlist.status");

    // List all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📚 Available collections:",
      collections.map((c) => c.name).join(", ")
    );

    console.log("🏁 Database initialization complete!");
    console.log("You can now use the application with MongoDB.");

    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
  } catch (error) {
    console.error("❌ Initialization error:", error);

    // Close connection if open
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

initDatabase().catch((error) => {
  console.error("Fatal error:", error);
});
