import {HeroImages} from "@/components/HeroImages";
import type {HomePageDocument} from "@/sanity/lib/types";

export function HeroSection({homePage}: {homePage?: HomePageDocument | null}) {
  return (
    <section aria-labelledby="hero-heading" className="px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p id="hero-heading" className="sr-only">
          Northland Basketball hero section
        </p>
        <HeroImages heading={homePage?.heroHeading} images={homePage?.heroImages} />
      </div>
    </section>
  );
}
