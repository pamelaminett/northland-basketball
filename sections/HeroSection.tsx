import {HeroImages} from "@/components/HeroImages";
import type {HomePageDocument} from "@/sanity/lib/types";

export function HeroSection({homePage}: {homePage?: HomePageDocument | null}) {
  return (
    <section aria-labelledby="hero-heading" className="px-4 pb-4 pt-8 sm:px-6 sm:pb-5 md:pt-10 md:pb-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <p id="hero-heading" className="sr-only">
          Northland Basketball hero section
        </p>
        <HeroImages heading={homePage?.heroHeading} images={homePage?.heroImages} />
      </div>
    </section>
  );
}
