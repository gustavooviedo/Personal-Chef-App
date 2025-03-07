"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "How does the AI know what recipes to suggest?",
    answer: (
      <p>
        Our AI analyzes your dietary preferences, restrictions, favorite
        cuisines, and past recipe ratings to create personalized
        recommendations. The more you use the service, the better it gets at
        understanding your unique tastes and needs.
      </p>
    ),
  },
  {
    question: "Can I customize my dietary restrictions?",
    answer: (
      <p>
        Absolutely! You can set multiple dietary preferences and restrictions
        including allergies, intolerances, vegan, vegetarian, keto, paleo,
        low-carb, gluten-free, and many more. You can also specify ingredients
        you want to avoid or include.
      </p>
    ),
  },
  {
    question: "How does the grocery list feature work?",
    answer: (
      <p>
        Once you select recipes for your meal plan, our system automatically
        generates a consolidated grocery list with all required ingredients. It
        intelligently combines ingredients used across multiple recipes,
        suggests quantity optimizations, and allows you to check items off as
        you shop. The list is accessible on any device.
      </p>
    ),
  },
  {
    question: "How much money can I save using this service?",
    answer: (
      <p>
        Our users report saving between $50-$200 per month on groceries by
        reducing food waste and making more efficient purchases. The exact
        amount varies based on household size and previous shopping habits, but
        our waste reduction algorithms typically help users cut grocery expenses
        by 15-30%.
      </p>
    ),
  },
  {
    question: "Can I add my own recipes to the system?",
    answer: (
      <p>
        Yes! You can import or manually add your favorite recipes to the system.
        Our AI will analyze these recipes and incorporate them into your meal
        suggestions. You can also modify existing recipes to suit your
        preferences.
      </p>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t border-neutral-200 dark:border-neutral-800 md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              FAQs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Get answers to common questions about our AI sous chef service
            </p>
          </div>
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    How does the AI know what recipes to suggest?
                  </h3>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Our AI analyzes your dietary preferences, restrictions,
                  favorite cuisines, and past recipe ratings to create
                  personalized recommendations. The more you use the service,
                  the better it gets at understanding your unique tastes and
                  needs.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    Can I customize my dietary restrictions?
                  </h3>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Absolutely! You can set multiple dietary preferences and
                  restrictions including allergies, intolerances, vegan,
                  vegetarian, keto, paleo, low-carb, gluten-free, and many more.
                  You can also specify ingredients you want to avoid or include.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    How does the grocery list feature work?
                  </h3>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Once you select recipes for your meal plan, our system
                  automatically generates a consolidated grocery list with all
                  required ingredients. It intelligently combines ingredients
                  used across multiple recipes, suggests quantity optimizations,
                  and allows you to check items off as you shop. The list is
                  accessible on any device.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    How much money can I save using this service?
                  </h3>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Our users report saving between $50-$200 per month on
                  groceries by reducing food waste and making more efficient
                  purchases. The exact amount varies based on household size and
                  previous shopping habits, but our waste reduction algorithms
                  typically help users cut grocery expenses by 15-30%.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    Can I add my own recipes to the system?
                  </h3>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Yes! You can import or manually add your favorite recipes to
                  the system. Our AI will analyze these recipes and incorporate
                  them into your meal suggestions. You can also modify existing
                  recipes to suit your preferences.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
