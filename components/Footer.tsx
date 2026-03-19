import {PortableText} from "@portabletext/react";
import Link from "next/link";
import {SocialIcon} from "@/components/SocialIcon";
import {getSiteSettings} from "@/sanity/lib/queries";
import type {NavLink, SocialLink} from "@/sanity/lib/types";

const fallbackLinks: NavLink[] = [
  {label: "Policies", href: "/resources/policies-procedures"},
  {label: "Site Map", href: "/resources/faqs"},
  {label: "Contact Us", href: "/contact/key-contacts"}
];

const fallbackSocials: SocialLink[] = [
  {label: "Email", href: "mailto:hello@northlandbasketball.org.nz"},
  {label: "Facebook", href: "https://facebook.com"},
  {label: "Instagram", href: "https://instagram.com"}
];

const fallbackAddress = [{_type: "block", _key: "address", children: [{_type: "span", _key: "line1", text: "Northland Basketball 37 Proctor Road, Poroti, Whangarei"}], markDefs: [], style: "normal"}];

function FooterLink({link}: {link: NavLink}) {
  const external = link.openInNewTab || link.href.startsWith("http") || link.href.startsWith("mailto:");
  if (external) {
    return <a href={link.href} target={link.openInNewTab ? "_blank" : undefined} rel={link.openInNewTab ? "noreferrer" : undefined} className="transition hover:text-northland-teal">{link.label}</a>;
  }
  return <Link href={link.href} className="transition hover:text-northland-teal">{link.label}</Link>;
}

export async function Footer() {
  const settings = await getSiteSettings();
  const footerLinks = settings?.footerLinks?.length ? settings.footerLinks : fallbackLinks;
  const socials = settings?.socialLinks?.length ? settings.socialLinks : fallbackSocials;
  const address = settings?.address?.length ? settings.address : fallbackAddress;

  return (
    <footer className="bg-northland-blue px-4 py-10 text-center text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {socials.map((item) => (
            <a key={item.label} href={item.href} aria-label={item.label} className="text-white" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
              <SocialIcon label={item.label} />
            </a>
          ))}
        </div>
        <nav aria-label="Footer" className="text-sm uppercase tracking-[0.18em] text-white/92">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => <li key={link.label}><FooterLink link={link} /></li>)}
          </ul>
        </nav>
        <address className="cms-address not-italic text-sm uppercase tracking-[0.15em] text-white/88"><PortableText value={address} /></address>
      </div>
    </footer>
  );
}
