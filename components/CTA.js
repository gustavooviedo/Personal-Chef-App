import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Elevate Your Culinary Experience Today
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
              Join thousands of discerning home cooks who have transformed their
              kitchen routines, reduced food waste by up to 30%, and
              rediscovered the joy of cooking with our premium AI sous chef.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Start Your 14-Day Trial
            </Link>
            <Link
              href="/demo"
              className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Watch Demo
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/80">
            No credit card required for trial. Premium experience guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
