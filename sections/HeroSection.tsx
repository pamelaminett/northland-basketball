import { HeroImages } from "@/components/HeroImages";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p id="hero-heading" className="sr-only">
          Northland Basketball hero section
        </p>
        <HeroImages />
      </div>
    </section>
  );
}
