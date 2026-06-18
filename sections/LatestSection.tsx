import {NewsGrid} from "@/components/NewsGrid";
import type {HomePageDocument} from "@/sanity/lib/types";

export async function LatestSection({
  heading = "The Latest",
  homePage,
  showSidebar = true
}: {
  heading?: string;
  homePage?: HomePageDocument | null;
  showSidebar?: boolean;
}) {
  const statement = homePage?.statement || "As the game rises, so do we.";

  return (
    <section aria-labelledby="latest-heading" className="px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className={`mx-auto grid max-w-7xl gap-8 ${showSidebar ? "xl:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]" : ""}`}>
        <div>
          <div className="mb-8 flex items-center gap-4">
            <h2 id="latest-heading" className="text-2xl font-medium tracking-[0.06em] text-[#202020]">
              {heading.replace(/^the\s+/i, "")}
            </h2>
            <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
          </div>

          <NewsGrid />
        </div>

        {showSidebar ? (
          <aside className="space-y-5 xl:border-l xl:border-dashed xl:border-black/20 xl:pl-7">
            <section aria-labelledby="about-northland-heading">
              <h3
                id="about-northland-heading"
                className="max-w-[21rem] text-[2.2rem] font-black leading-[1.06] tracking-[0.09em] text-black sm:text-5xl xl:text-[2.45rem]"
              >
                Northland Basketball is built by and for the people.
              </h3>
              <div className="mt-5 max-w-[19.25rem] bg-white px-5 py-4 text-[1.18rem] leading-[1.22] tracking-[0.055em] text-black/90 sm:text-xl">
                <p>
                  Stretching from Te Hana in the South to Cape Reinga in the North, our clubs, programmes and
                  competitions are powered by volunteers, whanau, coaches and players who care deeply about creating
                  opportunities close to home.
                </p>
                <p className="mt-6">
                  We are dedicated to lifting every level of the sport across Northland, from first steps on the court to
                  rep pathways & lifelong engagement.
                </p>
              </div>
            </section>

            <p className="max-w-[17rem] text-[2.15rem] font-black leading-[1.08] tracking-[0.055em] text-black sm:text-5xl xl:text-[2.5rem]">
              {statement}
            </p>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
