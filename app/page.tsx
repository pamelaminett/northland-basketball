import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RegionNav } from "@/components/RegionNav";
import { Sponsors } from "@/components/Sponsors";
import { HeroSection } from "@/sections/HeroSection";
import { LatestSection } from "@/sections/LatestSection";
import { ProgrammesSection } from "@/sections/ProgrammesSection";
import { StatementSection } from "@/sections/StatementSection";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-northland-slate text-slate-900">
      <Header />
      <RegionNav />
      <main>
        <HeroSection />
        <ProgrammesSection />
        <StatementSection />
        <LatestSection />
      </main>
      <Sponsors />
      <Footer />
    </div>
  );
}
