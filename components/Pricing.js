"use client";

import { useState } from "react";
import Link from "next/link";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  // Price data
  const prices = {
    premium: {
      monthly: 12.99,
      annual: 99.99,
    },
    family: {
      monthly: 19.99,
      annual: 159.99,
    },
  };

  // Calculate savings
  const premiumSavings = Math.round(
    ((prices.premium.monthly * 12 - prices.premium.annual) /
      (prices.premium.monthly * 12)) *
      100
  );
  const familySavings = Math.round(
    ((prices.family.monthly * 12 - prices.family.annual) /
      (prices.family.monthly * 12)) *
      100
  );

  // Calculate monthly equivalent price for annual plans
  const premiumMonthlyEquivalent = (prices.premium.annual / 12).toFixed(2);
  const familyMonthlyEquivalent = (prices.family.annual / 12).toFixed(2);

  return (
    <section
      id="pricing"
      className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Premium Plans
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-tighter md:text-4xl">
              Choose Your Culinary Experience
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Professional meal planning tools that save time, reduce waste, and
              transform your cooking
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4 my-8">
            <div className="w-20 text-right">
              <span
                className={`text-sm ${
                  !isAnnual ? "font-semibold text-primary" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
            </div>

            <div
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                isAnnual ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out ${
                  isAnnual ? "transform translate-x-6" : ""
                }`}
              />
            </div>

            <div className="w-28 text-left flex items-center">
              <span
                className={`text-sm ${
                  isAnnual ? "font-semibold text-primary" : "text-gray-500"
                }`}
              >
                Annual
              </span>
              {isAnnual && (
                <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary whitespace-nowrap">
                  Save {premiumSavings}%
                </span>
              )}
            </div>
          </div>

          <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
            {/* Premium Plan */}
            <div className="relative flex flex-col items-center justify-between h-full rounded-lg border-2 border-primary bg-background p-6 shadow-lg">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
              <div className="space-y-4 w-full">
                <div className="min-h-6 mb-1">
                  {/* Spacer to align with EXECUTIVE TIER */}
                </div>
                <h3 className="text-2xl font-bold h-8">Sous Chef Premium</h3>
                <div className="text-center min-h-[80px]">
                  <span className="text-4xl font-bold">
                    $
                    {isAnnual
                      ? premiumMonthlyEquivalent
                      : prices.premium.monthly}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                  {isAnnual && (
                    <div className="mt-1 text-sm text-primary">
                      ${prices.premium.annual} billed annually
                    </div>
                  )}
                </div>
                <div className="mt-6 min-h-[360px] flex flex-col">
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Unlimited personalized recipes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Advanced grocery list with check-off</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Advanced dietary customization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Ingredient waste reduction planning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Recipe customization</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/signup"
                className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Pro Chef Plan */}
            <div className="flex flex-col items-center justify-between h-full rounded-lg border border-accent/30 bg-background p-6 shadow-lg">
              <div className="space-y-4 w-full">
                <div className="inline-block px-4 py-1 mb-1 rounded-full bg-accent/10 text-xs font-medium text-accent h-6">
                  EXECUTIVE TIER
                </div>
                <h3 className="text-2xl font-bold h-8">Pro Chef Family</h3>
                <div className="text-center min-h-[80px]">
                  <span className="text-4xl font-bold">
                    $
                    {isAnnual ? familyMonthlyEquivalent : prices.family.monthly}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                  {isAnnual && (
                    <div className="mt-1 text-sm text-accent">
                      ${prices.family.annual} billed annually
                    </div>
                  )}
                </div>
                <div className="mt-6 min-h-[360px] flex flex-col">
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Unlimited personalized recipes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Advanced grocery list with check-off</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Advanced dietary customization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Ingredient waste reduction planning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Recipe customization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Up to 6 household profiles</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Advanced family meal planning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Premium budget optimization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Access to exclusive chef-created recipes</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/signup"
                className="mt-6 w-full rounded-md bg-accent px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-md hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-md text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              All plans include a 14-day free trial with full access to all
              features.
            </p>
            {isAnnual && (
              <p className="mt-2 font-medium text-primary">
                Save up to {Math.max(premiumSavings, familySavings)}% with
                annual billing!
              </p>
            )}
            <p className="mt-2">
              Need a custom plan for your restaurant or food service business?{" "}
              <Link
                href="/contact"
                className="font-medium text-primary hover:underline"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
