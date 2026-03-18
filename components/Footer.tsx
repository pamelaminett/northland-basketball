const footerLinks = ["Policies", "Site Map", "Contact Us"];

export function Footer() {
  return (
    <footer className="bg-northland-blue px-4 py-10 text-center text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {["Email", "Facebook", "Instagram"].map((item) => (
            <a
              key={item}
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/65 text-sm uppercase tracking-[0.08em] transition hover:bg-white hover:text-northland-blue"
              aria-label={item}
            >
              {item.slice(0, 1)}
            </a>
          ))}
        </div>

        <nav aria-label="Footer" className="text-sm uppercase tracking-[0.18em] text-white/92">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link}>
                <a href="#" className="transition hover:text-northland-teal">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic text-sm uppercase tracking-[0.15em] text-white/88">
          Northland Basketball
          <br />
          37 Proctor Road, Poroti, Whangarei
        </address>
      </div>
    </footer>
  );
}
