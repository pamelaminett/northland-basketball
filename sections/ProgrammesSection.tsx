import { ProgrammeGrid } from "@/components/ProgrammeGrid";

export function ProgrammesSection() {
  return (
    <section aria-labelledby="programmes-heading" className="px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="space-y-8">
          <h2
            id="programmes-heading"
            className="max-w-sm font-display text-6xl uppercase leading-[0.9] tracking-tight text-northland-teal sm:text-7xl"
          >
            Play Basketball at Every Level
          </h2>
          <ProgrammeGrid />
        </div>

        <div className="relative overflow-hidden pt-2">
          <div className="statement-mark absolute inset-0" aria-hidden="true" />
          <div className="relative max-w-xl space-y-8 text-lg leading-9 text-black/90">
            <p>
              Northland Basketball is built by and for our people. Stretching from Te Hana in the South to Cape Reinga in
              the North, our clubs, programmes and competitions are powered by volunteers, whanau, coaches and players who
              care deeply about creating opportunities close to home.
            </p>
            <p>
              We believe basketball should be accessible, welcoming and connected to the communities it represents.
            </p>
            <p>
              We are dedicated to lifting every level of the sport across Northland, from first steps on the court to rep
              pathways and lifelong engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
