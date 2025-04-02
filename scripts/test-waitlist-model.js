// This script tests the Waitlist model by creating a test entry
// Run with: node scripts/test-waitlist-model.js

// Need to use require for scripts since import is ES module syntax
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

// Define the Waitlist schema directly in this file for testing
function createWaitlistModel() {
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
      referralSource: {
        type: String,
        enum: [
          "search_engine",
          "social_media",
          "friend",
          "advertisement",
          "blog",
          "other",
        ],
        required: false,
      },
      phone: {
        type: String,
        trim: true,
      },
      marketingConsent: {
        type: Boolean,
        default: false,
      },
      preferredContact: {
        type: String,
        enum: ["email", "sms", "both"],
        default: "email",
      },
      status: {
        type: String,
        enum: ["pending", "invited", "registered", "declined"],
        default: "pending",
      },
      invitedAt: {
        type: Date,
      },
      inviteBatch: {
        type: Number,
      },
      notes: {
        type: String,
        trim: true,
      },
      referralCode: {
        type: String,
        trim: true,
      },
      referredBy: {
        type: String,
        trim: true,
      },
      utmSource: {
        type: String,
        trim: true,
      },
      utmMedium: {
        type: String,
        trim: true,
      },
      utmCampaign: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
          ret.id = ret._id.toString();
          delete ret._id;
          delete ret.__v;
          return ret;
        },
      },
    }
  );

  // Email validation
  waitlistSchema.path("email").validate(function (email) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
  }, "Please provide a valid email address");

  // Days on waitlist virtual
  waitlistSchema.virtual("daysOnWaitlist").get(function () {
    if (!this.createdAt) return 0;
    const diffTime = Math.abs(new Date() - this.createdAt);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });

  // Return the model
  return mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);
}

async function testWaitlistModel() {
  console.log("📝 Testing Waitlist model...");

  // Load environment variables
  const env = await loadEnv();
  const MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error(
      "❌ MONGODB_URI is not defined in .env.local or environment variables."
    );
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Create the Waitlist model
    const Waitlist = createWaitlistModel();

    // Test data
    const testData = {
      email: `test-${Date.now()}@example.com`,
      name: "Test User",
      interestedPlan: "premium",
      interests: ["meal_planning", "grocery_list"],
      marketingConsent: true,
    };

    console.log("Creating test waitlist entry with data:", testData);

    // Create a waitlist entry
    const waitlistEntry = await Waitlist.create(testData);

    console.log(
      "✅ Successfully created waitlist entry:",
      waitlistEntry.toJSON()
    );

    // Delete the test entry
    await Waitlist.deleteOne({ _id: waitlistEntry._id });
    console.log("✅ Successfully deleted test waitlist entry");

    // Close connection
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  } catch (error) {
    console.error("❌ Error:", error);

    // Detailed error logging
    if (error.name === "ValidationError") {
      console.error("Validation errors:");
      Object.keys(error.errors).forEach((field) => {
        console.error(`- ${field}: ${error.errors[field].message}`);
      });
    }

    // Close connection if open
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("🔌 Connection closed after error");
    }
  }
}

testWaitlistModel().catch((error) => {
  console.error("Unhandled error:", error);
});
