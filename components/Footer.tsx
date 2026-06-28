import {PortableText} from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import {SocialIcon} from "@/components/SocialIcon";
import {urlFor} from "@/sanity/lib/image";
import {getAllPages, getPosts, getSiteSettings} from "@/sanity/lib/queries";
import type {NavLink, SitemapPage, SocialLink, Sponsor} from "@/sanity/lib/types";

const northlandFacebookUrl = "https://www.facebook.com/northlandbasketball";

function getSocialHref(social: SocialLink) {
  if (social.label === "Facebook" && ["https://facebook.com", "https://www.facebook.com"].includes(social.href)) {
    return northlandFacebookUrl;
  }

  return social.href;
}

const fallbackAddress = [{_type: "block", _key: "address", children: [{_type: "span", _key: "line1", text: "Northland Basketball 37 Proctor Road, Poroti, Whangarei"}], markDefs: [], style: "normal"}];

const sectionTitles: Record<string, string> = {
  about: "About",
  programmes: "Programmes",
  competitions: "Competitions",
  reps: "Reps",
  "coaches-refs": "Coaches & Refs",
  resources: "Resources",
  contact: "Contact"
};

function FooterLink({link}: {link: NavLink}) {
  if (!link.href) {
    return <span>{link.label}</span>;
  }

  const external = link.openInNewTab || link.href.startsWith("http") || link.href.startsWith("mailto:");

  if (external) {
    return <a href={link.href} target={link.openInNewTab ? "_blank" : undefined} rel={link.openInNewTab ? "noreferrer" : undefined} className="transition hover:text-northland-teal">{link.label}</a>;
  }

  return <Link href={link.href} className="transition hover:text-northland-teal">{link.label}</Link>;
}

function groupPagesBySection(pages: SitemapPage[]) {
  const order = Object.keys(sectionTitles);

  return Object.entries(
    pages.reduce<Record<string, SitemapPage[]>>((acc, page) => {
      acc[page.section] ||= [];
      acc[page.section].push(page);
      return acc;
    }, {})
  ).sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));
}

function SponsorLogo({sponsor}: {sponsor: Sponsor}) {
  const content = sponsor.logo?.asset ? (
    <Image
      src={urlFor(sponsor.logo).width(320).height(160).fit("max").url()}
      alt={sponsor.logo.alt || sponsor.name}
      width={160}
      height={80}
      className="h-14 w-auto object-contain sm:h-16"
      unoptimized
    />
  ) : (
    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/88">{sponsor.name}</span>
  );

  if (!sponsor.href) {
    return <div className="flex min-h-[4rem] items-center justify-center rounded bg-white px-4 py-3 shadow-[0_12px_28px_rgba(12,18,58,0.08)] ring-1 ring-northland-blue/10">{content}</div>;
  }

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noreferrer"
      className="flex min-h-[4rem] items-center justify-center rounded bg-white px-4 py-3 shadow-[0_12px_28px_rgba(12,18,58,0.08)] ring-1 ring-northland-blue/10 transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(12,18,58,0.12)]"
    >
      {content}
    </a>
  );
}

function SponsorTier({title, sponsors}: {title: string; sponsors: Sponsor[]}) {
  if (!sponsors.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-northland-blue/60">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sponsors.map((sponsor) => <SponsorLogo key={`${sponsor.tier}-${sponsor.name}`} sponsor={sponsor} />)}
      </div>
    </div>
  );
}

export async function Footer() {
  const [settings, pages, posts] = await Promise.all([getSiteSettings(), getAllPages(), getPosts()]);
  const footerLinks = settings?.footerLinks || [];
  const socials = settings?.socialLinks || [];
  const address = settings?.address?.length ? settings.address : fallbackAddress;
  const pageGroups = groupPagesBySection(pages);
  const latestPosts = posts.slice(0, 3);
  const showFooterBar = socials.length > 0 || footerLinks.length > 0;

  return (
    <footer className="bg-northland-blue px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        {showFooterBar ? (
          <>
            {socials.length ? (
              <div className="flex items-center justify-center gap-3">
                {socials.map((item) => {
                  const href = getSocialHref(item);

                  return (
                    <a key={item.label} href={href} aria-label={item.label} className="text-white" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                      <SocialIcon label={item.label} />
                    </a>
                  );
                })}
              </div>
            ) : null}
            {footerLinks.length ? (
              <nav aria-label="Footer" className="text-center text-sm uppercase tracking-[0.18em] text-white/92">
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                  {footerLinks.map((link) => <li key={link.label}><FooterLink link={link} /></li>)}
                </ul>
              </nav>
            ) : null}
          </>
        ) : null}
        <section aria-labelledby="footer-sitemap-title" className="grid gap-8 border-y border-white/12 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Explore</p>
              <h2 id="footer-sitemap-title" className="font-display text-4xl uppercase tracking-[0.03em] text-white">Site Map</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {pageGroups.map(([section, items]) => (
                <div key={section}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/65">{sectionTitles[section] || section}</h3>
                  <ul className="space-y-2 text-sm leading-6 text-white/88">
                    {items.map((page) => (
                      <li key={`${page.section}-${page.slug}`}>
                        <Link href={`/${page.section}/${page.slug}`} className="transition hover:text-northland-teal">
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 border-t border-white/12 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/65">Latest News</p>
              <ul className="space-y-3 text-sm leading-6 text-white/88">
                {latestPosts.map((post) => (
                  <li key={post._id}>
                    <Link href={`/news/${post.slug}`} className="transition hover:text-northland-teal">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:text-northland-teal">
                View all news
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
        <address className="cms-address text-center not-italic text-sm uppercase tracking-[0.15em] text-white/88"><PortableText value={address} /></address>
      </div>
    </footer>
  );
}
