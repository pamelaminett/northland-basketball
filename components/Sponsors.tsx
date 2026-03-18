const sponsors = ["Foundation North", "Oxford Sports Trust"];

export function Sponsors() {
  return (
    <section aria-labelledby="sponsors-title" className="bg-northland-teal py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="sponsors-title" className="sr-only">
          Sponsors
        </h2>
        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-20">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="flex min-w-56 items-center justify-center border border-white/20 px-8 py-5 text-center font-display text-3xl uppercase tracking-[0.06em] text-white"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
