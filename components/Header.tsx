import Link from "next/link";
import {SocialIcon} from "@/components/SocialIcon";
import {getSiteSettings} from "@/sanity/lib/queries";
import type {NavLink, SocialLink} from "@/sanity/lib/types";

const fallbackNavLinks: NavLink[] = [
  {label: "About", href: "/about/our-story"},
  {label: "Programmes", href: "/programmes/kiwi-hoops"},
  {label: "Competitions", href: "/competitions/secondary-school-competition"},
  {label: "Reps", href: "/reps/pathways"},
  {label: "Coaches & Refs", href: "/coaches-refs/become-a-coach"},
  {label: "News", href: "/news"},
  {label: "Resources", href: "/resources/faqs"}
];

const fallbackSocials: SocialLink[] = [
  {label: "Email", href: "mailto:hello@northlandbasketball.org.nz"},
  {label: "Facebook", href: "https://facebook.com"},
  {label: "Instagram", href: "https://instagram.com"}
];

function renderLink(link: NavLink) {
  const external = link.openInNewTab || link.href.startsWith("http") || link.href.startsWith("mailto:");

  if (external) {
    return <a href={link.href} target={link.openInNewTab ? "_blank" : undefined} rel={link.openInNewTab ? "noreferrer" : undefined} className="transition hover:text-northland-blue">{link.label}</a>;
  }

  return <Link href={link.href} className="transition hover:text-northland-blue">{link.label}</Link>;
}

export async function Header() {
  const settings = await getSiteSettings();
  const navLinks = settings?.navigation?.length ? settings.navigation : fallbackNavLinks;
  const socials = settings?.socialLinks?.length ? settings.socialLinks : fallbackSocials;

  return (
    <header className="bg-northland-teal bg-hero-pattern text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex w-fit flex-col font-display uppercase leading-none tracking-[0.18em] text-northland-blue">
            <span className="text-[2rem] font-semibold">Northland</span>
            <span className="text-sm tracking-[0.5em]">Basketball</span>
          </Link>
          <nav aria-label="Primary" className="order-3 lg:order-2">
            <ul className="flex flex-wrap justify-start gap-x-4 gap-y-3 text-sm uppercase tracking-[0.16em] text-white/92 sm:justify-center">
              {navLinks.map((item) => <li key={item.label}>{renderLink(item)}</li>)}
            </ul>
          </nav>
          <div className="order-2 flex items-center gap-3 lg:order-3 lg:justify-end">
            {socials.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noreferrer" : undefined}>
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
