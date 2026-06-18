import {RegionNavClient} from "@/components/RegionNavClient";
import {getHomePage} from "@/sanity/lib/queries";
import type {HomePageRegion} from "@/sanity/lib/types";

const fallbackRegions: HomePageRegion[] = [
  {label: "Kaipara"},
  {label: "Hokianga"},
  {label: "Mid-North"},
  {label: "Whangarei"},
  {label: "Far-North"}
];

export async function RegionNav() {
  const homePage = await getHomePage();
  const regions = homePage?.regions?.length ? homePage.regions : fallbackRegions;

  return (
    <nav aria-label="Regions" className="border-b border-black/5 bg-[#efefef]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <RegionNavClient regions={regions} />
      </div>
    </nav>
  );
}
