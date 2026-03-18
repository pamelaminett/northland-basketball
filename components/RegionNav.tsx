const regions = ["Kaipara", "Hokianga", "Mid-North", "Whangarei", "Far-North"];

export function RegionNav() {
  return (
    <nav aria-label="Regions" className="border-b border-black/5 bg-[#efefef]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium uppercase tracking-[0.18em] text-northland-blue sm:gap-x-10">
          {regions.map((region) => (
            <li key={region}>
              <a href="#" className="transition hover:text-northland-tealDark">
                {region}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
