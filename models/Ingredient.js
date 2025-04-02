import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const ingredientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    // Category for organization (produce, dairy, etc.)
    category: {
      type: String,
      enum: [
        "produce",
        "meat",
        "seafood",
        "dairy",
        "bakery",
        "pantry",
        "frozen",
        "canned",
        "spices",
        "beverages",
        "other",
      ],
      required: true,
    },
    // Nutritional information per 100g
    nutritionPer100g: {
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
    // Common allergens this ingredient contains
    allergens: [
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
          "none",
        ],
      },
    ],
    // Average price per unit (can be updated by admin)
    averagePrice: {
      amount: {
        type: Number,
        min: 0,
      },
      unit: {
        type: String,
        default: "lb", // pound, ounce, each, etc.
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    // For waste reduction planning
    shelfLife: {
      days: {
        type: Number,
        min: 0,
      },
      storageMethod: {
        type: String,
        enum: ["refrigerator", "freezer", "pantry", "counter"],
        default: "refrigerator",
      },
    },
    // Common substitutes for this ingredient
    substitutes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
      },
    ],
    // Is this a base ingredient or a processed/compound ingredient
    isBaseIngredient: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add plugin that converts mongoose to json
ingredientSchema.plugin(toJSON);

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", ingredientSchema);
