"use client";

const Arrow = ({ extraStyle }) => {
  return (
    <svg
      className={`shrink-0 w-12 fill-neutral-content opacity-70 ${extraStyle}`}
      viewBox="0 0 138 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
        />
      </g>
    </svg>
  );
};
const Step = ({ emoji, text }) => {
  return (
    <div className="w-full md:w-48 flex flex-col gap-2 items-center justify-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-bold">{text}</h3>
    </div>
  );
};

// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
export default function Problem() {
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
      <style jsx global>{`
        .problem-section {
          background-color: var(--color-soft-cream);
        }
        .problem-card {
          background-color: var(--color-ivory);
          border-color: var(--color-warm-gray);
          transition: all 0.3s ease;
        }
        .problem-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .icon-container {
          background-color: var(--color-primary);
          opacity: 0.1;
        }
        .icon-container svg {
          color: var(--color-primary);
        }
      `}</style>

      <section className="w-full py-12 md:py-24 lg:py-32 problem-section">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold tracking-tighter md:text-4xl terracotta-text">
                Why Nutrition Management Is Overwhelming
              </h2>
              <p className="mx-auto max-w-[700px] warm-gray-text md:text-xl">
                Even health-conscious individuals face these everyday
                challenges...
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <div className="flex flex-col items-center space-y-3 rounded-xl problem-card p-6 shadow-sm border">
                <div className="p-3 icon-container rounded-full">
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
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium terracotta-text">
                  Information Overload
                </h3>
                <p className="text-sm warm-gray-text text-center">
                  Endless contradictory nutrition advice makes it impossible to
                  know what's actually best for your unique needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 rounded-xl problem-card p-6 shadow-sm border">
                <div className="p-3 icon-container rounded-full">
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium terracotta-text">
                  Costly Conveniences
                </h3>
                <p className="text-sm warm-gray-text text-center">
                  Relying on takeout and pre-packaged meals that strain your
                  budget while compromising your health goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 rounded-xl problem-card p-6 shadow-sm border">
                <div className="p-3 icon-container rounded-full">
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
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium terracotta-text">
                  Lifestyle Disconnect
                </h3>
                <p className="text-sm warm-gray-text text-center">
                  Generic nutrition plans that don't account for your schedule,
                  preferences, or how your body uniquely responds to different
                  foods.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 rounded-xl problem-card p-6 shadow-sm border">
                <div className="p-3 icon-container rounded-full">
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
                    <path d="M16 6.1c-.14-.42-.36-.8-.67-1.1A3.76 3.76 0 0 0 12 4a3.76 3.76 0 0 0-3.33 1c-.31.3-.53.68-.67 1.1C7.85 6.4 8 6.81 8 7.2v1.1c0 1.29 1.14 2.33 2.56 2.63.52.1 1.08.1 1.6 0C13.71 10.63 15 9.58 15 8.3V7.2c0-.4.15-.8 0-1.1z" />
                    <path d="M9.5 10.5v1a2.5 2.5 0 0 0 5 0v-1" />
                    <path d="M12 17c.74 0 1.47-.12 2.17-.34.93-.3 1.83-.8 2.83-1.66v0c.47-.4 1-.6 1.6-.6.69 0 1.38.2 2 .59a5.89 5.89 0 0 1 2.4 4.01V20" />
                    <path d="M12 17c-.74 0-1.47-.12-2.17-.34-.93-.3-1.83-.8-2.83-1.66v0c-.47-.4-1-.6-1.6-.6-.7 0-1.39.2-2 .59A5.89 5.89 0 0 0 1 19v1" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium terracotta-text">
                  Unsustainable Results
                </h3>
                <p className="text-sm warm-gray-text text-center">
                  Short-term diet fixes that lead to frustrating cycles of
                  progress and regression instead of lasting lifestyle changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
