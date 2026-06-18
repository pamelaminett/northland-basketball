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
    <article className="group overflow-hidden bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(18,20,51,0.1)]">
      <Link href={href} className="block">
        <div className="relative h-64 overflow-hidden bg-black sm:h-72 lg:h-[19rem] xl:h-[17.75rem]">
          <Image
            src={image || "/placeholders/news-1.svg"}
            alt={title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 45vw, 26vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            unoptimized={Boolean(image?.startsWith("http"))}
          />
        </div>
      </Link>
      <div className="grid min-h-[7.25rem] content-start gap-2 border-t border-black/5 px-4 pb-4 pt-3">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-black/55">{category}</span>
        <h3 className="text-[1.08rem] leading-snug tracking-[0.045em] text-[#252525]">
          <Link href={href} className="transition group-hover:text-northland-blue">
            {title}
          </Link>
        </h3>
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-2 border-b border-northland-blue pb-0.5 text-xs font-bold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
