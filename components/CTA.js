"use client";

import Link from "next/link";
import ButtonWaitlist from "./ButtonWaitlist";

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 spice-pattern-bg"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="mx-auto max-w-3xl bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-accent/20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold tracking-tighter md:text-4xl">
                Elevate Your Nutrition Journey with Milio
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join health-conscious individuals who have simplified their
                nutritional choices, achieved their wellness goals, and created
                sustainable healthy habits with personalized guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <ButtonWaitlist className="w-full sm:w-auto" />
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center rounded-md border border-primary/20 bg-white px-8 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:bg-accent/10 hover:text-accent hover:border-accent/30 hover:shadow-md hover:translate-y-[-2px] focus-visible:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Watch Demo
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
              <svg
                className="h-5 w-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span className="text-muted-foreground">
                Join our waitlist for early access. No credit card required.
              </span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute -top-16 -right-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
        <div className="hidden md:block absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
}
