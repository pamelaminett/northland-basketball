import Image from "next/image";
import {getSiteSettings} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";
import type {Sponsor} from "@/sanity/lib/types";

const fallbackSponsors: Sponsor[] = [
  {name: "Foundation North", href: "#", tier: "funding"},
  {name: "Oxford Sports Trust", href: "#", tier: "community"}
];

function SponsorTile({sponsor}: {sponsor: Sponsor}) {
  const content = sponsor.logo?.asset ? (
    <Image
      src={urlFor(sponsor.logo).fit("max").url()}
      alt={sponsor.logo.alt || sponsor.name}
      width={640}
      height={400}
      sizes="100vw"
      className="block h-[64px] w-auto max-w-none object-contain"
      unoptimized
    />
  ) : (
    <span className="text-center font-display text-3xl uppercase tracking-[0.06em] text-white">{sponsor.name}</span>
  );

  if (!sponsor.href) {
    return <div className="flex h-[64px] items-center justify-center">{content}</div>;
  }

  return (
    <a
      href={sponsor.href}
      target={sponsor.href.startsWith("http") ? "_blank" : undefined}
      rel={sponsor.href.startsWith("http") ? "noreferrer" : undefined}
      className="flex h-[64px] items-center justify-center transition hover:opacity-85"
    >
      {content}
    </a>
  );
}

function SponsorRow({title, sponsors}: {title: string; sponsors: Sponsor[]}) {
  if (!sponsors.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-white/72">{title}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-12 sm:gap-y-10">
        {sponsors.map((sponsor) => (
          <li key={`${sponsor.tier}-${sponsor.name}`} className="flex h-[64px] shrink-0 items-center justify-center">
            <SponsorTile sponsor={sponsor} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Sponsors() {
  const settings = await getSiteSettings();
  const sponsors = settings?.sponsors?.length ? settings.sponsors : fallbackSponsors;
  const fundingSponsors = sponsors.filter((sponsor) => sponsor.tier === "funding");
  const communitySponsors = sponsors.filter((sponsor) => sponsor.tier === "community");

  if (!fundingSponsors.length && !communitySponsors.length) {
    return null;
  }

  return (
    <section aria-labelledby="sponsors-title" className="bg-northland-teal py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="sponsors-title" className="sr-only">Sponsors</h2>
        <div className="space-y-10">
          <SponsorRow title="Funding Partners" sponsors={fundingSponsors} />
          <SponsorRow title="Community Partners" sponsors={communitySponsors} />
        </div>
      </div>
    </section>
  );
}
