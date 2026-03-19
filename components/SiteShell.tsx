import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {RegionNav} from "@/components/RegionNav";
import {Sponsors} from "@/components/Sponsors";

export async function SiteShell({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-northland-slate text-slate-900">
      <Header />
      <RegionNav />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </div>
  );
}
