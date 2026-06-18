import Link from "next/link";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import type {PostDocument} from "@/sanity/lib/types";

export function RelatedNewsSidebar({heading = "Latest News", posts, className}: {heading?: string; posts: PostDocument[]; className?: string}) {
  if (!posts.length) {
    return null;
  }

  return (
    <aside className={className}>
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">{heading}</h2>
        <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        {posts.map((post, index) => {
          const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(720).height(420).fit("crop").url() : `/placeholders/news-${(index % 3) + 1}.svg`;

          return (
            <article key={post._id} className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
              <Link href={`/news/${post.slug}`} className="block">
                <div className="relative h-40 overflow-hidden bg-black">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1023px) 100vw, 24rem"
                    className="object-cover"
                    unoptimized={imageUrl.startsWith("http")}
                  />
                </div>
              </Link>
              <div className="space-y-2 px-4 pb-4 pt-3">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-black/55">{post.category || "News"}</p>
                <h3 className="text-[1rem] leading-6 tracking-[0.03em] text-[#252525]">
                  <Link href={`/news/${post.slug}`} className="transition hover:text-northland-blue">
                    {post.title}
                  </Link>
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
