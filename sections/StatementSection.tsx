export function StatementSection({statement = "As The Game Rises, So Do We"}: {statement?: string}) {
  const lines = statement.split(",").map((line) => line.trim());

  return (
    <section className="px-4 pb-10 sm:px-6 md:pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl bg-statement-pattern">
        <div className="flex justify-center md:justify-end">
          <div className="max-w-xl text-center md:text-right">
            <h2 className="font-display text-5xl uppercase leading-[0.88] tracking-tight text-[#4B4B9D] sm:text-6xl lg:text-7xl">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
