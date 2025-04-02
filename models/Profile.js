import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // For family plans, we can have multiple profiles under one userId
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Whether this is the main profile or a family member profile
    isPrimary: {
      type: Boolean,
      default: false,
    },
    dietaryPreferences: {
      // Vegan, vegetarian, pescatarian, etc.
      diet: {
        type: String,
        enum: [
          "omnivore",
          "vegetarian",
          "vegan",
          "pescatarian",
          "keto",
          "paleo",
          "other",
        ],
        default: "omnivore",
      },
      // For family members with multiple allergens
      allergies: [
        {
          type: String,
          enum: [
            "dairy",
            "eggs",
            "nuts",
            "peanuts",
            "shellfish",
            "soy",
            "wheat",
            "gluten",
            "other",
          ],
        },
      ],
      // Ingredients the user prefers to avoid
      restrictions: [
        {
          type: String,
        },
      ],
      // Cuisine preferences
      favoriteCuisines: [
        {
          type: String,
          enum: [
            "italian",
            "mexican",
            "chinese",
            "japanese",
            "thai",
            "indian",
            "american",
            "mediterranean",
            "french",
            "other",
          ],
        },
      ],
    },
    // Calories, protein, carbs, fat goals
    nutritionGoals: {
      calories: {
        type: Number,
        min: 0,
      },
      protein: {
        type: Number,
        min: 0,
      },
      carbs: {
        type: Number,
        min: 0,
      },
      fat: {
        type: Number,
        min: 0,
      },
    },
    // Budget preferences per meal or per day
    budgetPreference: {
      maxCostPerMeal: {
        type: Number,
        min: 0,
      },
      maxCostPerDay: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add plugin that converts mongoose to json
profileSchema.plugin(toJSON);

export default mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema);
