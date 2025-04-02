import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const groceryListSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Name of the grocery list
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Associated meal plan (optional)
    mealPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealPlan",
    },
    // Items in the grocery list
    items: [
      {
        // Reference to ingredient if it exists in the database
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
        },
        // For custom ingredients not in the database
        customIngredient: {
          name: {
            type: String,
            trim: true,
          },
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
            default: "other",
          },
        },
        // Names will be displayed from either the reference or the custom name
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        unit: {
          type: String,
          required: true,
        },
        // Check-off functionality
        checked: {
          type: Boolean,
          default: false,
        },
        // When the item was checked off
        checkedAt: {
          type: Date,
        },
        // For optional items
        isOptional: {
          type: Boolean,
          default: false,
        },
        // For special notes about the item
        notes: {
          type: String,
          trim: true,
        },
        // Which recipes this ingredient is used in
        usedIn: [
          {
            recipeId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Recipe",
            },
            recipeName: {
              type: String,
              trim: true,
            },
          },
        ],
        // Estimated price for budgeting
        estimatedPrice: {
          amount: {
            type: Number,
            min: 0,
          },
          currency: {
            type: String,
            default: "USD",
          },
        },
        // Actual price after purchase (user can update)
        actualPrice: {
          amount: {
            type: Number,
            min: 0,
          },
          currency: {
            type: String,
            default: "USD",
          },
        },
        // Store section for organization
        section: {
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
          default: "other",
        },
      },
    ],
    // For organizing multiple stores
    store: {
      name: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    // Shopping date
    shoppingDate: {
      type: Date,
    },
    // Status of the grocery list
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
    // Budget for this grocery trip
    budget: {
      amount: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    // For sharing lists with family members
    sharedWith: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        permissions: {
          type: String,
          enum: ["view", "edit"],
          default: "view",
        },
      },
    ],
    // Notes for the grocery list
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add plugin that converts mongoose to json
groceryListSchema.plugin(toJSON);

// Virtual for calculating total estimated cost
groceryListSchema.virtual("totalEstimatedCost").get(function () {
  let totalCost = 0;

  if (this.items && this.items.length > 0) {
    this.items.forEach((item) => {
      if (item.estimatedPrice && item.estimatedPrice.amount) {
        totalCost += item.estimatedPrice.amount;
      }
    });
  }

  return {
    amount: parseFloat(totalCost.toFixed(2)),
    currency: this.budget ? this.budget.currency : "USD",
  };
});

// Virtual for calculating total actual cost
groceryListSchema.virtual("totalActualCost").get(function () {
  let totalCost = 0;

  if (this.items && this.items.length > 0) {
    this.items.forEach((item) => {
      if (item.actualPrice && item.actualPrice.amount) {
        totalCost += item.actualPrice.amount;
      }
    });
  }

  return {
    amount: parseFloat(totalCost.toFixed(2)),
    currency: this.budget ? this.budget.currency : "USD",
  };
});

// Virtual for progress (percentage of items checked)
groceryListSchema.virtual("progress").get(function () {
  if (!this.items || this.items.length === 0) return 0;

  const checkedItems = this.items.filter((item) => item.checked).length;
  return Math.round((checkedItems / this.items.length) * 100);
});

export default mongoose.models.GroceryList ||
  mongoose.model("GroceryList", groceryListSchema);
