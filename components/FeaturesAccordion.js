"use client";

import { useState } from "react";
import Image from "next/image";

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "Personalized Nutrition Profile",
    description:
      "Milio creates a detailed nutrition profile based on your personal data, preferences, and goals. Our system adapts to your unique physiology, allergies, intolerances, and health objectives to provide truly personalized guidance that evolves with you.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Smart Meal Planning",
    description:
      "Our intelligent system generates meal plans tailored to your nutrition profile, dietary preferences, and lifestyle. Easily adjust plans based on your schedule, budget, and available ingredients, while our system optimizes for nutritional balance and variety.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Intuitive Lifestyle Integration",
    description:
      "Milio seamlessly integrates with your daily routine, adjusting recommendations based on your activity levels, sleep patterns, and even stress levels. Whether you're meal prepping for a busy week or planning for special occasions, Milio adapts to your life, not the other way around.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Effortless Grocery Management",
    description:
      "Transform your meal plan into a smart shopping list that's organized by store layout and prioritized for freshness. Reduce waste and save money with accurate portion planning and ingredient substitution suggestions based on what's in season or on sale.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking & Insights",
    description:
      "Gain valuable insights into your nutrition habits and health metrics through intuitive visualizations. Track your progress toward personalized goals, receive gentle nudges for improvement, and celebrate your achievements with data-driven feedback that keeps you motivated.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-0`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [openItem, setOpenItem] = useState(0);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section
      className="py-12 md:py-24 lg:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto"
      id="features"
    >
      <div className="px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Your personal guide to{" "}
            <span className="text-primary">better nutrition</span>
            <br />
            and <span className="text-primary">healthier living</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Intuitive tools that make nutritional decisions effortless and
            personalized to your unique needs
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <ul className="w-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white shadow-sm dark:bg-gray-950"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-4 text-left"
                    aria-expanded={openItem === index}
                    aria-controls={`accordion-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-4 w-4 transition-all ${
                        openItem === index ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id={`accordion-${index}`}
                    className={`overflow-hidden transition-all ${
                      openItem === index ? "max-h-96" : "max-h-0"
                    }`}
                    aria-hidden={openItem !== index}
                  >
                    <div className="p-4 pt-0 text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </ul>

            <Media feature={features[openItem]} key={openItem} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
