import {FacebookFeedPanel} from "@/components/FacebookFeedPanel";
import {SiteShell} from "@/components/SiteShell";
import {HeroSection} from "@/sections/HeroSection";
import {LatestSection} from "@/sections/LatestSection";
import {PremLeagueSection} from "@/sections/PremLeagueSection";
import {ProgrammesSection} from "@/sections/ProgrammesSection";
import {getHomePage} from "@/sanity/lib/queries";

export default async function Homepage() {
  const homePage = await getHomePage();

  return (
    <SiteShell>
      <HeroSection homePage={homePage} />
      <section className="px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-8 min-[800px]:grid-cols-[minmax(0,1.7fr)_minmax(19rem,0.88fr)] min-[800px]:items-start">
          <div>
            <PremLeagueSection homePage={homePage} showSidebar={false} compactTop />
            <LatestSection heading={homePage?.latestHeading} homePage={homePage} showSidebar={false} />
          </div>
          <FacebookFeedPanel regions={homePage?.regions} />
        </div>
      </section>
      <ProgrammesSection homePage={homePage} />
    </SiteShell>
  );
}
