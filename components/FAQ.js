"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "How does Milio personalize my nutrition guidance?",
    answer: (
      <p>
        Milio creates a detailed profile based on your health goals, dietary
        preferences, lifestyle patterns, and nutritional needs. We use advanced
        algorithms to analyze this information and provide tailored
        recommendations that adapt as your goals and needs evolve over time.
      </p>
    ),
  },
  {
    question: "Can I manage specific dietary needs or restrictions?",
    answer: (
      <p>
        Absolutely! Milio is designed to accommodate a wide range of dietary
        needs including allergies, intolerances, medical conditions (like
        diabetes or heart disease), and lifestyle choices (vegan, keto, paleo,
        etc.). Our system provides nutritionally balanced guidance while
        respecting your specific requirements.
      </p>
    ),
  },
  {
    question: "How does the grocery planning feature work?",
    answer: (
      <p>
        Once your meal plan is created, Milio automatically generates a smart
        shopping list organized by store section for efficient shopping. The
        system optimizes quantities to reduce waste, suggests seasonal
        alternatives, and allows you to check items off as you shop. Your list
        is accessible on any device and can be shared with family members.
      </p>
    ),
  },
  {
    question: "What kind of health improvements can I expect?",
    answer: (
      <p>
        Our users report a range of benefits including better energy levels,
        improved digestion, weight management, and progress toward specific
        health goals. The exact benefits vary based on your individual situation
        and goals, but most users see noticeable improvements within 2-4 weeks
        of consistent use.
      </p>
    ),
  },
  {
    question: "Can I integrate Milio with my existing health apps or devices?",
    answer: (
      <p>
        Yes! Milio is designed to integrate with popular fitness trackers,
        health apps, and smart devices. This allows for a more holistic view of
        your health journey and enables our system to make even more
        personalized recommendations based on your activity levels, sleep
        patterns, and other health metrics.
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
              Get answers to common questions about our personalized nutrition
              companion
            </p>
          </div>
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    How does Milio personalize my nutrition guidance?
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
                  Milio creates a detailed profile based on your health goals,
                  dietary preferences, lifestyle patterns, and nutritional
                  needs. We use advanced algorithms to analyze this information
                  and provide tailored recommendations that adapt as your goals
                  and needs evolve over time.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    Can I manage specific dietary needs or restrictions?
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
                  Absolutely! Milio is designed to accommodate a wide range of
                  dietary needs including allergies, intolerances, medical
                  conditions (like diabetes or heart disease), and lifestyle
                  choices (vegan, keto, paleo, etc.). Our system provides
                  nutritionally balanced guidance while respecting your specific
                  requirements.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    How does the grocery planning feature work?
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
                  Once your meal plan is created, Milio automatically generates
                  a smart shopping list organized by store section for efficient
                  shopping. The system optimizes quantities to reduce waste,
                  suggests seasonal alternatives, and allows you to check items
                  off as you shop. Your list is accessible on any device and can
                  be shared with family members.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    What kind of health improvements can I expect?
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
                  Our users report a range of benefits including better energy
                  levels, improved digestion, weight management, and progress
                  toward specific health goals. The exact benefits vary based on
                  your individual situation and goals, but most users see
                  noticeable improvements within 2-4 weeks of consistent use.
                </p>
              </details>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950">
              <details className="group p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">
                    Can I integrate Milio with my existing health apps or
                    devices?
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
                  Yes! Milio is designed to integrate with popular fitness
                  trackers, health apps, and smart devices. This allows for a
                  more holistic view of your health journey and enables our
                  system to make even more personalized recommendations based on
                  your activity levels, sleep patterns, and other health
                  metrics.
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
