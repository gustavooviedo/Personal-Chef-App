import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // User-generated or system-generated
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // If it's a custom recipe created for a specific profile
    forProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    // If it's a public recipe available to all users
    isPublic: {
      type: Boolean,
      default: false,
    },
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        // For recipes with custom ingredients not in the database
        customIngredient: {
          name: {
            type: String,
            trim: true,
          },
          category: {
            type: String,
          },
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        unit: {
          type: String,
          required: true,
        },
        // Optional notes for this ingredient
        notes: {
          type: String,
          trim: true,
        },
        // Is this ingredient optional
        isOptional: {
          type: Boolean,
          default: false,
        },
      },
    ],
    // Step by step instructions
    instructions: [
      {
        stepNumber: {
          type: Number,
          required: true,
          min: 1,
        },
        description: {
          type: String,
          required: true,
        },
        // Estimated time in minutes
        time: {
          type: Number,
          min: 0,
        },
      },
    ],
    // Total time to prepare in minutes
    prepTime: {
      type: Number,
      required: true,
      min: 0,
    },
    // Total time to cook in minutes
    cookTime: {
      type: Number,
      required: true,
      min: 0,
    },
    // Number of servings the recipe makes
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    // Difficulty level
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    // Recipe categories
    categories: [
      {
        type: String,
        enum: [
          "breakfast",
          "lunch",
          "dinner",
          "dessert",
          "snack",
          "appetizer",
          "side",
          "drink",
          "other",
        ],
      },
    ],
    // Cuisine type
    cuisine: {
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
    // Tags for filtering
    tags: [
      {
        type: String,
      },
    ],
    // Nutritional information per serving
    nutritionPerServing: {
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
    // Estimated cost per serving
    costPerServing: {
      amount: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    // User ratings and reviews
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Average rating calculated from all ratings
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    // Image URL for the recipe
    imageUrl: {
      type: String,
      trim: true,
    },
    // Special equipment needed
    equipment: [
      {
        type: String,
        trim: true,
      },
    ],
    // Is this recipe featured by admin
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add plugin that converts mongoose to json
recipeSchema.plugin(toJSON);

// Calculate average rating when ratings are modified
recipeSchema.pre("save", function (next) {
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((total, rating) => total + rating.score, 0);
    this.averageRating = sum / this.ratings.length;
  }
  next();
});

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
