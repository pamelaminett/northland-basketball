import Link from "next/link";
import Image from "next/image";
import type {HomePageRegion} from "@/sanity/lib/types";

const facebookPageUrl = "https://www.facebook.com/northlandbasketball";
const facebookEmbedWidth = 340;
const facebookEmbedTopOffset = -92;
const facebookEmbedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookPageUrl)}&tabs=timeline&width=${facebookEmbedWidth}&height=720&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;

const mapHotspots = [
  {label: "Far-North", top: "13%", left: "36%"},
  {label: "Mid-North", top: "38%", left: "73%"},
  {label: "Hokianga", top: "49%", left: "22%"},
  {label: "Whangarei", top: "63%", left: "79%"},
  {label: "Kaipara", top: "88%", left: "57%"}
] as const;

function renderHotspot(region?: HomePageRegion) {
  if (!region) {
    return null;
  }

  const className =
    "inline-flex items-center rounded-full bg-white/96 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-northland-blue shadow-[0_10px_22px_rgba(12,18,58,0.18)] ring-1 ring-northland-blue/12 transition hover:bg-northland-blue hover:text-white";

  if (!region.href) {
    return <span className={className}>{region.label}</span>;
  }

  return (
    <Link href={region.href} className={className}>
      {region.label}
    </Link>
  );
}

export function FacebookFeedPanel({regions = []}: {regions?: HomePageRegion[]}) {
  const regionMap = new Map(regions.map((region) => [region.label, region]));

  return (
    <aside className="w-full max-w-[24rem]">
      <div className="mb-8 flex items-center gap-4">
        <h3 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">Facebook</h3>
        <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
      </div>
      <article className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
        <div className="border-b border-black/8 px-5 py-4">
          <h3 className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-northland-blue">Northland Basketball</h3>
        </div>
        <div className="relative overflow-hidden bg-white" style={{height: "560px"}}>
          <iframe
            title="Northland Basketball Facebook feed"
            src={facebookEmbedUrl}
            width={String(facebookEmbedWidth)}
            height="720"
            className="absolute left-1/2 max-w-full -translate-x-1/2"
            style={{border: "none", overflow: "hidden", width: "100%", maxWidth: `${facebookEmbedWidth}px`, top: `${facebookEmbedTopOffset}px`}}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
          />
        </div>
        <div className="px-5 py-4">
          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-b border-northland-blue pb-0.5 text-sm font-semibold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
          >
            Open on Facebook
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
      <div className="mt-8 overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
        <div className="relative">
          <Image
            src="/tribal-wars-map.png"
            alt="Northland regional map showing Kaipara, Hokianga, Mid-North, Whangarei, and Far-North areas"
            width={1080}
            height={1350}
            className="h-auto w-full"
          />
          <div className="pointer-events-none absolute inset-0">
            {mapHotspots.map((hotspot) => {
              const region = regionMap.get(hotspot.label) || {label: hotspot.label};

              return (
                <div
                  key={hotspot.label}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                  style={{top: hotspot.top, left: hotspot.left}}
                >
                  {renderHotspot(region)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
