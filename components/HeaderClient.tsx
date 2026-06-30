"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {SocialIcon} from "@/components/SocialIcon";
import type {NavLink, SocialLink} from "@/sanity/lib/types";

type HeaderClientProps = {
  headerLogoAlt: string;
  headerLogoUrl?: string | null;
  navLinks: NavLink[];
  socials: SocialLink[];
};

const northlandFacebookUrl = "https://www.facebook.com/northlandbasketball";

function getSocialHref(social: SocialLink) {
  if (social.label === "Facebook" && ["https://facebook.com", "https://www.facebook.com"].includes(social.href)) {
    return northlandFacebookUrl;
  }

  return social.href;
}

function renderLink(link: NavLink, className: string) {
  if (!link.href) {
    return <span className={className}>{link.label}</span>;
  }

  const external = link.openInNewTab || link.href.startsWith("http") || link.href.startsWith("mailto:");

  if (external) {
    return <a href={link.href} target={link.openInNewTab ? "_blank" : undefined} rel={link.openInNewTab ? "noreferrer" : undefined} className={className}>{link.label}</a>;
  }

  return <Link href={link.href} className={className}>{link.label}</Link>;
}

export function HeaderClient({headerLogoAlt, headerLogoUrl, navLinks, socials}: HeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  function toggleExpanded(label: string) {
    setExpandedItems((current) => (
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label]
    ));
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-[70] bg-northland-teal bg-hero-pattern text-white shadow-[0_10px_28px_rgba(7,12,44,0.16)]">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 min-[1180px]:px-8 min-[1180px]:pb-5 min-[1180px]:pt-10">
        <div className="flex items-center justify-between gap-4 min-[1180px]:grid min-[1180px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1180px]:items-center min-[1180px]:gap-x-4">
          <Link href="/" className="inline-flex w-fit flex-col self-center font-display uppercase leading-none tracking-[0.18em] text-northland-blue" onClick={closeMenu}>
            {headerLogoUrl ? (
              <Image
                src={headerLogoUrl}
                alt={headerLogoAlt}
                width={160}
                height={80}
                className="h-auto w-auto max-w-[9.5rem] object-contain sm:max-w-[10rem] min-[1180px]:max-w-[11rem]"
                unoptimized
                priority
              />
            ) : (
              <>
                <span className="text-[2rem] font-semibold">Northland</span>
                <span className="text-sm tracking-[0.5em]">Basketball</span>
              </>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-none border border-white/35 bg-white text-northland-blue shadow-[0_12px_24px_rgba(7,12,44,0.12)] transition hover:bg-[#f3f5ff] min-[1180px]:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`block h-0.5 w-full bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>

          <nav aria-label="Primary" className="hidden min-[1180px]:order-2 min-[1180px]:block min-[1180px]:justify-self-end">
            <ul className="flex flex-row flex-nowrap items-center justify-end gap-x-1.5 gap-y-0 text-sm uppercase tracking-[0.16em] text-white/92">
              {navLinks.map((item) => (
                <li key={item.label} className="group/header relative pb-4">
                  <div className="flex items-center gap-2">
                    {renderLink(item, "header-nav-trigger transition")}
                  </div>
                  {item.children?.length ? (
                    <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-0 w-[19rem] -translate-x-1/2 border-l-0 bg-[#fbfbfd] px-5 pb-5 pt-5 text-[0.82rem] normal-case tracking-[0.04em] text-[#161d7a] opacity-0 shadow-[0_20px_44px_rgba(9,13,43,0.18)] ring-1 ring-[#d9deef] transition duration-150 group-hover/header:pointer-events-auto group-hover/header:opacity-100 group-focus-within/header:pointer-events-auto group-focus-within/header:opacity-100">
                      <p className="border-b border-[#d9deef] pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#4a5a94]">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <div key={`${item.label}-${child.label}`}>
                          {renderLink(child, "block border-b border-transparent py-2 text-[0.88rem] font-medium tracking-[0.01em] transition hover:border-[#d9deef] hover:text-northland-blue")}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 min-[1180px]:order-3 min-[1180px]:flex min-[1180px]:-translate-y-1 min-[1180px]:self-start min-[1180px]:justify-self-end">
            {socials.map((social) => {
              const href = getSocialHref(social);

              return (
                <a key={social.label} href={href} aria-label={social.label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                  <SocialIcon label={social.label} />
                </a>
              );
            })}
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-primary-nav"
            className="fixed inset-0 z-50 min-[1180px]:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-transparent" />
            <div className="absolute right-4 top-[calc(100px+0.75rem)] flex justify-end sm:right-6">
              <nav
                aria-label="Mobile primary"
                className="flex max-h-[calc(100vh-7rem)] w-full max-w-[24rem] flex-col overflow-hidden border border-northland-blue/10 bg-white shadow-[0_20px_44px_rgba(9,13,43,0.12)] overscroll-contain"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="border-b border-northland-blue/10 bg-[#f5f7ff] px-4 py-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-northland-blue/55">Navigation</p>
                </div>
                <ul className="divide-y divide-northland-blue/8 overflow-y-auto overscroll-contain">
                  {navLinks.map((item) => {
                    const isExpanded = expandedItems.includes(item.label);
                    const hasChildren = Boolean(item.children?.length);

                    return (
                      <li key={item.label}>
                        <div className={`px-4 py-4 transition ${isExpanded ? "bg-[#f7f8fe]" : "bg-white"}`}>
                          {hasChildren ? (
                            <button
                              type="button"
                              onClick={() => toggleExpanded(item.label)}
                              aria-expanded={isExpanded}
                              className="flex w-full items-center justify-between gap-3 text-left"
                            >
                              <span className="block min-w-0 flex-1 text-[0.92rem] font-semibold uppercase tracking-[0.16em] text-northland-blue">
                                {item.label}
                              </span>
                              <span className={`text-sm text-northland-blue transition ${isExpanded ? "rotate-45" : ""}`}>+</span>
                            </button>
                          ) : item.href ? (
                            renderLink(item, "block text-[0.92rem] font-semibold uppercase tracking-[0.16em] text-northland-blue")
                          ) : (
                            <span className="block text-[0.92rem] font-semibold uppercase tracking-[0.16em] text-northland-blue">{item.label}</span>
                          )}
                        </div>
                        {hasChildren && isExpanded ? (
                          <div className="border-t border-northland-blue/10 bg-[#eef2ff] px-4 py-3">
                            <ul className="space-y-3 border-l border-northland-blue/20 pl-4">
                              {item.children?.map((child) => (
                                <li key={`${item.label}-${child.label}`}>
                                  {renderLink(child, "block text-[0.94rem] font-medium leading-6 text-[#18206f] transition hover:text-[#101652]")}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
                <div className="flex items-center justify-between gap-3 border-t border-northland-blue/10 bg-[#f5f7ff] px-4 py-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-northland-blue/55">Follow</p>
                  <div className="flex items-center gap-3">
                    {socials.map((social) => {
                      const href = getSocialHref(social);

                      return (
                        <a key={social.label} href={href} aria-label={social.label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                          <SocialIcon label={social.label} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
