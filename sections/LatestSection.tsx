import Image from "next/image";
import {NewsGrid} from "@/components/NewsGrid";

export async function LatestSection({heading = "The Latest"}: {heading?: string}) {
  return (
    <section aria-labelledby="latest-heading" className="px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 id="latest-heading" className="mb-6 font-display text-5xl tracking-tight text-northland-blue sm:text-6xl">
          {heading}
        </h2>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_22rem]">
          <NewsGrid />

          <aside aria-labelledby="social-feed-heading" className="space-y-4">
            <h3 id="social-feed-heading" className="sr-only">
              Social feed
            </h3>
            <div className="overflow-hidden bg-white p-4 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-northland-blue font-display text-lg uppercase text-white">
                  NB
                </div>
                <div>
                  <p className="font-semibold text-northland-blue">Northland Basketball</p>
                  <p className="text-sm text-black/60">2,453 followers</p>
                </div>
              </div>
              <div className="relative mb-4 h-72">
                <Image
                  src="/placeholders/social-feed.svg"
                  alt="Northland Basketball social post placeholder"
                  fill
                  sizes="(max-width: 1279px) 100vw, 22rem"
                  className="object-cover"
                />
              </div>
              <p className="text-sm leading-7 text-black/75">
                Last year was so successful, we figured we would run it back. Northland Prem League is on its way, get
                ready for another strong season.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
