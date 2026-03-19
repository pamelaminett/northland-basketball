import Link from "next/link";

type ProgrammeCardProps = {
  title: string;
  href?: string;
  featured?: boolean;
};

export function ProgrammeCard({title, href, featured = false}: ProgrammeCardProps) {
  const content = <h3 className="max-w-[12rem] text-base font-extrabold uppercase leading-tight tracking-[0.08em]">{title}</h3>;

  return (
    <article
      className={[
        "flex min-h-32 items-center justify-center p-6 text-center shadow-card transition hover:-translate-y-1",
        featured ? "bg-northland-blue text-white" : "bg-[#74cde0] text-black"
      ].join(" ")}
    >
      {href ? (
        <Link href={href} className={featured ? "underline decoration-white/70 underline-offset-4" : "underline decoration-black/40 underline-offset-4"}>
          {content}
        </Link>
      ) : content}
    </article>
  );
}
