import mongoose from "mongoose";

// WAITLIST SCHEMA is used to store potential users who sign up for the waiting list
// This is more comprehensive than a basic lead as it collects more information
// for better segmentation and personalized communication

// Create a proper plugin function
function toJSONPlugin(schema) {
  schema.set("toJSON", {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.updatedAt;
      return ret;
    },
  });
}

const waitlistSchema = mongoose.Schema(
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
    // To understand which plan they're interested in
    interestedPlan: {
      type: String,
      enum: ["premium", "family", "undecided"],
      default: "undecided",
    },
    // To understand their specific interests
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
    // How they heard about the service
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
    // Optional phone for SMS notifications
    phone: {
      type: String,
      trim: true,
    },
    // Marketing opt-in
    marketingConsent: {
      type: Boolean,
      default: false,
    },
    // Preferred contact method
    preferredContact: {
      type: String,
      enum: ["email", "sms", "both"],
      default: "email",
    },
    // Status in the waitlist journey
    status: {
      type: String,
      enum: ["pending", "invited", "registered", "declined"],
      default: "pending",
    },
    // When they were invited to join
    invitedAt: {
      type: Date,
    },
    // For managing batches of invites
    inviteBatch: {
      type: Number,
    },
    // Any notes or feedback they provided
    notes: {
      type: String,
      trim: true,
    },
    // For special referral or promotional codes
    referralCode: {
      type: String,
      trim: true,
    },
    // If they were referred by another user
    referredBy: {
      type: String,
      trim: true,
    },
    // Custom fields for specific campaigns
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
  }
);

// Add the plugin
waitlistSchema.plugin(toJSONPlugin);

// Add a validation to check if email is in a valid format
waitlistSchema.path("email").validate(function (email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, "Please provide a valid email address");

// Virtual to calculate days on waitlist
waitlistSchema.virtual("daysOnWaitlist").get(function () {
  if (!this.createdAt) return 0;
  const diffTime = Math.abs(new Date() - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const Waitlist =
  mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

export default Waitlist;
