"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form state
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    cuisinePreferences: [],
    cookingFrequency: "",
    householdSize: 1,
    cookingSkill: "intermediate",
  });

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "dairy-free", label: "Dairy-Free" },
    { id: "keto", label: "Keto" },
    { id: "paleo", label: "Paleo" },
    { id: "low-carb", label: "Low Carb" },
    { id: "pescatarian", label: "Pescatarian" },
  ];

  const cuisineOptions = [
    { id: "italian", label: "Italian" },
    { id: "mexican", label: "Mexican" },
    { id: "asian", label: "Asian" },
    { id: "mediterranean", label: "Mediterranean" },
    { id: "indian", label: "Indian" },
    { id: "american", label: "American" },
    { id: "french", label: "French" },
    { id: "middle-eastern", label: "Middle Eastern" },
  ];

  const handleDietaryToggle = (id) => {
    setPreferences((prev) => {
      if (prev.dietaryRestrictions.includes(id)) {
        return {
          ...prev,
          dietaryRestrictions: prev.dietaryRestrictions.filter(
            (item) => item !== id
          ),
        };
      } else {
        return {
          ...prev,
          dietaryRestrictions: [...prev.dietaryRestrictions, id],
        };
      }
    });
  };

  const handleCuisineToggle = (id) => {
    setPreferences((prev) => {
      if (prev.cuisinePreferences.includes(id)) {
        return {
          ...prev,
          cuisinePreferences: prev.cuisinePreferences.filter(
            (item) => item !== id
          ),
        };
      } else {
        return {
          ...prev,
          cuisinePreferences: [...prev.cuisinePreferences, id],
        };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Here you would submit the preferences to your API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background kitchen-texture opacity-20"></div>
      </div>

      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-white/80 backdrop-blur-sm border-b border-accent/10">
        <div className="container mx-auto flex justify-center items-center relative">
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-foreground absolute left-0"
          >
            ChefMate<span className="text-primary">AI</span>
          </Link>
          <div className="flex items-center space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < step
                    ? "bg-primary"
                    : i === step
                    ? "bg-primary/60"
                    : "bg-gray-200"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              Step {step} of 3
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-accent/20 overflow-hidden">
            <div className="p-8">
              {step === 1 && (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-serif font-bold text-foreground">
                      Dietary Preferences
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      Let us know about any dietary restrictions or preferences
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="font-medium">Select all that apply:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleDietaryToggle(option.id)}
                          className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                            preferences.dietaryRestrictions.includes(option.id)
                              ? "bg-primary text-white border-primary"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="font-medium">Any food allergies?</p>
                      <textarea
                        className="mt-2 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows="3"
                        placeholder="List any food allergies or ingredients you'd like to avoid"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={nextStep}
                      className="py-2.5 px-6 bg-primary text-primary-foreground rounded-md font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-serif font-bold text-foreground">
                      Cuisine Preferences
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      Tell us about the cuisines you enjoy cooking and eating
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="font-medium">
                      Select your favorite cuisines:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {cuisineOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleCuisineToggle(option.id)}
                          className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                            preferences.cuisinePreferences.includes(option.id)
                              ? "bg-primary text-white border-primary"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="font-medium">
                        How often do you cook at home?
                      </p>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {["rarely", "sometimes", "frequently"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setPreferences((prev) => ({
                                ...prev,
                                cookingFrequency: option,
                              }))
                            }
                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                              preferences.cookingFrequency === option
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      className="py-2.5 px-6 border border-gray-200 rounded-md font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="py-2.5 px-6 bg-primary text-primary-foreground rounded-md font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-serif font-bold text-foreground">
                      Household Information
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      Help us tailor recipes and portion sizes to your needs
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Household size:</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setPreferences((prev) => ({
                              ...prev,
                              householdSize: Math.max(
                                1,
                                prev.householdSize - 1
                              ),
                            }))
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          disabled={preferences.householdSize <= 1}
                        >
                          -
                        </button>
                        <span className="font-medium text-lg w-8 text-center">
                          {preferences.householdSize}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setPreferences((prev) => ({
                              ...prev,
                              householdSize: prev.householdSize + 1,
                            }))
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="font-medium">Cooking skill level:</p>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {["beginner", "intermediate", "advanced"].map(
                          (option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                setPreferences((prev) => ({
                                  ...prev,
                                  cookingSkill: option,
                                }))
                              }
                              className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                                preferences.cookingSkill === option
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="font-medium">
                        Weekly budget for groceries:
                      </p>
                      <select className="mt-2 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Select a range</option>
                        <option value="budget">Under $50</option>
                        <option value="moderate">$50 - $100</option>
                        <option value="premium">$100 - $200</option>
                        <option value="luxury">$200+</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      className="py-2.5 px-6 border border-gray-200 rounded-md font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="py-2.5 px-6 bg-primary text-primary-foreground rounded-md font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-70 flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Finish Setup"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-white/80 backdrop-blur-sm border-t border-accent/10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 ChefMate AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
