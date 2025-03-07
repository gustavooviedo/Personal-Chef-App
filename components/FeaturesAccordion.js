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
    title: "Personalized Recipe Recommendations",
    description:
      "Our AI analyzes your dietary preferences, restrictions, and favorite cuisines to suggest recipes that perfectly match your needs. Whether you're gluten-free, vegan, or following a specific diet plan, we've got you covered.",
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
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
        <line x1="6" x2="18" y1="17" y2="17" />
      </svg>
    ),
  },
  {
    title: "Smart Grocery Lists",
    description:
      "Automatically generate comprehensive grocery lists based on your selected recipes. Our intelligent system combines ingredients across recipes, suggests optimized quantities, and lets you check items off as you shop.",
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
    title: "Waste Reduction Planning",
    description:
      "Our AI creates meal plans that cleverly use ingredients across multiple recipes, minimizing leftovers and reducing food waste. Save money and help the environment by buying only what you'll actually use.",
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
        <path d="M12 3v19" />
        <path d="M5 8h14" />
        <path d="M15 5h-3v3h-3v3h3v3h3v-3h3V8h-3z" />
      </svg>
    ),
  },
  {
    title: "Budget-Friendly Options",
    description:
      "Set your grocery budget and let our AI suggest recipes that maximize flavor while minimizing cost. Track your spending and see how much you're saving compared to your previous grocery habits.",
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
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
        <path d="M12 18v2" />
        <path d="M12 4v2" />
      </svg>
    ),
  },
  {
    title: "Culinary Inspiration",
    description:
      "Never get stuck in a recipe rut again. Our AI suggests new recipes to try based on your taste profile, helping you explore new cuisines and cooking techniques. Make cooking exciting again!",
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
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
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
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100 "
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          All you need to cook smarter
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            and eat better
          </span>
        </h2>
        <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
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
