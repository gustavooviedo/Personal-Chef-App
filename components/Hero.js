"use client";

import Link from "next/link";
import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

export default function Hero() {
  // Custom colors for Terracotta-inspired palette
  const colors = {
    primary: "#E2725B", // Terracotta
    ivory: "#FDF5E6",
    warmGray: "#A39A92",
    oliveGreen: "#738678",
    softCream: "#F7E7CE",
  };

  return (
    <>
      {/* Custom styles for the new color palette */}
      <style jsx global>{`
        :root {
          --color-primary: ${colors.primary};
          --color-ivory: ${colors.ivory};
          --color-warm-gray: ${colors.warmGray};
          --color-olive-green: ${colors.oliveGreen};
          --color-soft-cream: ${colors.softCream};
        }
        .hero-section {
          background-color: var(--color-ivory);
        }
        .terracotta-text {
          color: var(--color-primary);
        }
        .warm-gray-text {
          color: var(--color-warm-gray);
        }
        .olive-text {
          color: var(--color-olive-green);
        }
        .terracotta-bg {
          background-color: var(--color-primary);
        }
        .ivory-bg {
          background-color: var(--color-ivory);
        }
        .warm-gray-bg {
          background-color: var(--color-warm-gray);
        }
        .olive-bg {
          background-color: var(--color-olive-green);
        }
        .soft-cream-bg {
          background-color: var(--color-soft-cream);
        }
        .btn-terracotta {
          background-color: var(--color-primary);
          color: white;
        }
        .btn-terracotta:hover {
          background-color: #c96450;
        }
        .btn-olive {
          background-color: var(--color-olive-green);
          color: white;
          border: 1px solid var(--color-olive-green);
        }
        .btn-olive:hover {
          background-color: #667a6a;
        }
        .btn-outline {
          border: 1px solid var(--color-warm-gray);
          background-color: transparent;
          color: var(--color-warm-gray);
        }
        .btn-outline:hover {
          background-color: var(--color-soft-cream);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
      `}</style>

      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero-section relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="inline-block px-3 py-1 text-sm terracotta-text bg-opacity-10 terracotta-bg bg-opacity-10 rounded-full">
              Your Personal Dietary Companion
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Simplify Your Nutrition with{" "}
                <span className="terracotta-text">Milio</span>
              </h1>
              <p className="mx-auto max-w-[700px] warm-gray-text md:text-xl italic">
                Personalized nutrition guidance, smart grocery planning, and
                tailored recipes that fit your lifestyle and dietary goals.
              </p>
            </div>
            <div className="space-x-4 mt-4">
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-md btn-terracotta px-8 text-sm font-medium shadow transition-colors hover:scale-105 transform duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Start Your Journey
              </Link>
              <Link
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-md btn-outline px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Features
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
              <svg
                className="h-5 w-5 terracotta-text"
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
              <span className="warm-gray-text">
                No credit card required for 14-day trial
              </span>
            </div>

            {/* Decorative elements with new colors */}
            <div className="hidden md:block absolute -bottom-16 -left-16 w-64 h-64 rounded-full soft-cream-bg opacity-70 blur-3xl"></div>
            <div className="hidden md:block absolute top-1/4 -right-16 w-72 h-72 rounded-full olive-bg opacity-10 blur-3xl"></div>

            {/* Modern lifestyle icons (decorative) */}
            <div className="hidden md:flex absolute top-1/3 left-10 opacity-20">
              <svg
                className="w-16 h-16 terracotta-text simmer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4.56l-1.8 3.45-4.2.58 3 2.88-.7 4.08L12 13.75l3.7 1.9-.7-4.08 3-2.88-4.2-.58L12 4.56z" />
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
              </svg>
            </div>
            <div className="hidden md:flex absolute bottom-1/4 right-10 opacity-20">
              <svg
                className="w-20 h-20 olive-text simmer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ animationDelay: "0.5s" }}
              >
                <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM4 3h16a2 2 0 0 1 2 2v2H2V5a2 2 0 0 1 2-2zm6 12a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm7 0a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
