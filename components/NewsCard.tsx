import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  title: string;
  category: string;
  image?: string;
  href: string;
};

export function NewsCard({title, category, image, href}: NewsCardProps) {
  return (
    <article className="overflow-hidden bg-white shadow-card">
      <div className="relative h-56">
        <Image src={image || "/placeholders/news-1.svg"} alt={title} fill sizes="(max-width: 767px) 100vw, 30vw" className="object-cover" unoptimized={Boolean(image?.startsWith("http"))} />
      </div>
      <div className="grid gap-4 p-4">
        <span className="text-sm font-bold uppercase tracking-[0.14em] text-black/70">{category}</span>
        <h3 className="text-2xl leading-tight text-[#262626]">{title}</h3>
        <Link
          href={href}
          className="inline-flex w-fit items-center gap-2 border-b border-northland-blue pb-1 text-base font-semibold text-northland-blue transition hover:text-northland-tealDark"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
