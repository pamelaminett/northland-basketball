type ProgrammeCardProps = {
  title: string;
  featured?: boolean;
};

export function ProgrammeCard({ title, featured = false }: ProgrammeCardProps) {
  return (
    <article
      className={[
        "flex min-h-32 items-center justify-center p-6 text-center shadow-card transition hover:-translate-y-1",
        featured ? "bg-northland-blue text-white" : "bg-[#74cde0] text-black"
      ].join(" ")}
    >
      <h3 className="max-w-[12rem] text-base font-extrabold uppercase leading-tight tracking-[0.08em]">
        {featured ? <a href="#" className="underline decoration-white/70 underline-offset-4">{title}</a> : title}
      </h3>
    </article>
  );
}
