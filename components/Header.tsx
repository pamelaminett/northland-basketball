const navLinks = [
  "About",
  "Programmes",
  "Comps",
  "Reps",
  "Coaches & Refs",
  "News",
  "Resources"
];

const socials = [
  { label: "Email", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" }
];

function SocialIcon({ label }: { label: string }) {
  const glyph =
    label === "Email" ? (
      <path d="M4 6.75h16v10.5H4zm0 0 8 5.75 8-5.75" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ) : label === "Facebook" ? (
      <path d="M13.25 20v-6.25h2.1l.4-2.75h-2.5V9.2c0-.82.27-1.45 1.43-1.45H16V5.3c-.3-.04-1.03-.13-1.97-.13-1.95 0-3.28 1.17-3.28 3.46v2.37H8.5v2.75h2.25V20z" fill="currentColor" />
    ) : (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
      </>
    );

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/65 text-white transition hover:bg-white hover:text-northland-blue">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        {glyph}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function Header() {
  return (
    <header className="bg-northland-teal bg-hero-pattern text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <a href="#" className="inline-flex w-fit flex-col font-display uppercase leading-none tracking-[0.18em] text-northland-blue">
            <span className="text-[2rem] font-semibold">Northland</span>
            <span className="text-sm tracking-[0.5em]">Basketball</span>
          </a>

          <nav aria-label="Primary" className="order-3 lg:order-2">
            <ul className="flex flex-wrap justify-start gap-x-4 gap-y-3 text-sm uppercase tracking-[0.16em] text-white/92 sm:justify-center">
              {navLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition hover:text-northland-blue">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="order-2 flex items-center gap-3 lg:order-3 lg:justify-end">
            {socials.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label}>
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
