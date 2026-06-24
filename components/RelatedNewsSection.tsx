import Link from "next/link";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import type {PostDocument} from "@/sanity/lib/types";

function formatHeading(heading?: string) {
  if (!heading || heading === "Latest News") {
    return "Related News";
  }

  return heading;
}

export function RelatedNewsSection({heading, posts}: {heading?: string; posts: PostDocument[]}) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">{formatHeading(heading)}</h2>
        <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
      </div>
      <p className="mb-8 max-w-2xl text-base leading-7 text-black/65">
        Stories, updates, and announcements connected to this part of the site.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, index) => {
          const imageUrl = post.mainImage?.asset
            ? urlFor(post.mainImage).width(960).height(640).fit("crop").url()
            : `/placeholders/news-${(index % 3) + 1}.svg`;

          return (
            <article key={post._id} className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(18,20,51,0.12)]">
              <Link href={`/news/${post.slug}`} className="block">
                <div className="relative h-52 overflow-hidden bg-black sm:h-60">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                    unoptimized={imageUrl.startsWith("http")}
                  />
                </div>
              </Link>
              <div className="grid min-h-[12rem] content-start gap-3 px-5 pb-5 pt-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-black/55">{post.category || "News"}</p>
                <h3 className="text-[1.15rem] leading-7 tracking-[0.03em] text-[#252525]">
                  <Link href={`/news/${post.slug}`} className="transition hover:text-northland-blue">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt ? <p className="text-sm leading-6 text-black/65">{post.excerpt}</p> : null}
                <Link
                  href={`/news/${post.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 border-b border-northland-blue pb-0.5 text-sm font-semibold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
                >
                  Read more
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 border-b border-northland-blue pb-0.5 text-sm font-semibold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
        >
          View all news
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
