import {SiteShell} from "@/components/SiteShell";
import {HeroSection} from "@/sections/HeroSection";
import {LatestSection} from "@/sections/LatestSection";
import {ProgrammesSection} from "@/sections/ProgrammesSection";
import {StatementSection} from "@/sections/StatementSection";
import {getHomePage} from "@/sanity/lib/queries";

export default async function Homepage() {
  const homePage = await getHomePage();

  return (
    <SiteShell>
      <HeroSection homePage={homePage} />
      <ProgrammesSection homePage={homePage} />
      <StatementSection statement={homePage?.statement} />
      <LatestSection heading={homePage?.latestHeading} />
    </SiteShell>
  );
}
