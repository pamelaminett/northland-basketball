import Link from "next/link";

type ProgrammeCardProps = {
  title: string;
  href?: string;
  featured?: boolean;
  description?: string;
};

export function ProgrammeCard({title, href, description}: ProgrammeCardProps) {
  const content = (
    <div className="grid h-full content-between gap-8 text-left">
      <div>
        <h3 className="font-display max-w-[15rem] text-lg uppercase leading-[1.05] tracking-[0.09em] text-black">
          {title}
        </h3>
        {description ? (
          <p className="mt-4 max-w-[18rem] text-sm leading-6 tracking-[0.03em] text-black/70">
            {description}
          </p>
        ) : null}
      </div>
      <span className="inline-flex w-fit border-b border-northland-blue pb-1 text-xs font-bold uppercase tracking-[0.14em] text-northland-blue">
        Learn More
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </span>
    </div>
  );

  return (
    <article
      className="min-h-64 bg-white p-5 shadow-[0_12px_26px_rgba(18,20,51,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(18,20,51,0.12)]"
    >
      {href ? (
        <Link href={href} className="block h-full">
          {content}
        </Link>
      ) : content}
    </article>
  );
}
