type SocialIconProps = { label: string; };

export function SocialIcon({label}: SocialIconProps) {
  const glyph = label === "Email" ? (
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
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/70 transition hover:bg-current hover:text-northland-blue">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">{glyph}</svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
