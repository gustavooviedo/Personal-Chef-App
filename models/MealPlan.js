import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const mealPlanSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Name of the meal plan
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Profile this meal plan is for
    forProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    // Start and end dates for the meal plan
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // Specific meals for each day
    days: [
      {
        date: {
          type: Date,
          required: true,
        },
        meals: [
          {
            // Type of meal (breakfast, lunch, dinner, snack)
            type: {
              type: String,
              enum: ["breakfast", "lunch", "dinner", "snack", "other"],
              required: true,
            },
            // Time of day for the meal
            time: {
              type: String,
              trim: true,
            },
            // Recipes for this meal
            recipes: [
              {
                recipe: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Recipe",
                },
                // For meals with custom recipes not in the database
                customRecipe: {
                  name: {
                    type: String,
                    trim: true,
                  },
                  notes: {
                    type: String,
                    trim: true,
                  },
                },
                // How many servings
                servings: {
                  type: Number,
                  min: 1,
                  default: 1,
                },
                // Has this meal been prepared
                prepared: {
                  type: Boolean,
                  default: false,
                },
              },
            ],
            // Notes for this meal
            notes: {
              type: String,
              trim: true,
            },
          },
        ],
        // Notes for the entire day
        notes: {
          type: String,
          trim: true,
        },
      },
    ],
    // Budget information
    budget: {
      total: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    // Total nutritional information for the meal plan
    totalNutrition: {
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
    // If this is a template for reuse
    isTemplate: {
      type: Boolean,
      default: false,
    },
    // Tags for organization/filtering
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add plugin that converts mongoose to json
mealPlanSchema.plugin(toJSON);

// Virtual for calculating total cost
mealPlanSchema.virtual("totalCost").get(function () {
  let totalCost = 0;

  if (this.days && this.days.length > 0) {
    this.days.forEach((day) => {
      if (day.meals && day.meals.length > 0) {
        day.meals.forEach((meal) => {
          if (meal.recipes && meal.recipes.length > 0) {
            meal.recipes.forEach((recipeItem) => {
              if (
                recipeItem.recipe &&
                recipeItem.recipe.costPerServing &&
                recipeItem.recipe.costPerServing.amount
              ) {
                totalCost +=
                  recipeItem.recipe.costPerServing.amount * recipeItem.servings;
              }
            });
          }
        });
      }
    });
  }

  return {
    amount: parseFloat(totalCost.toFixed(2)),
    currency: this.budget ? this.budget.currency : "USD",
  };
});

export default mongoose.models.MealPlan ||
  mongoose.model("MealPlan", mealPlanSchema);
