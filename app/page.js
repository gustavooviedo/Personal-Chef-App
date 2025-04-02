import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-grow">
        <Hero />
        <div className="space-y-0">
          <Problem />
          <FeaturesAccordion />
          <Pricing />
          <FAQ />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}
