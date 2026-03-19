import Link from "next/link";
import {SiteShell} from "@/components/SiteShell";
import {getPosts} from "@/sanity/lib/queries";

export const metadata = {title: "News | Northland Basketball"};

export default async function NewsIndexPage() {
  const posts = await getPosts();

  return (
    <SiteShell>
      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-10 border-b border-black/10 pb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-northland-tealDark">News & Stories</p>
            <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight text-northland-blue sm:text-6xl">The Latest</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-black/75">Posts created in Sanity Studio will appear here automatically.</p>
          </header>
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <article key={post._id} className="bg-white p-6 shadow-card">
                  {post.category ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-northland-tealDark">{post.category}</p> : null}
                  <h2 className="text-2xl font-semibold leading-tight text-northland-blue">{post.title}</h2>
                  {post.excerpt ? <p className="mt-4 text-base leading-7 text-black/70">{post.excerpt}</p> : null}
                  <Link href={`/news/${post.slug}`} className="mt-6 inline-flex items-center gap-2 border-b border-northland-blue pb-1 font-semibold text-northland-blue">Read article<span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 shadow-card"><p className="text-lg leading-8 text-black/70">No posts have been published yet. Create your first <strong>Post</strong> document in Sanity Studio to populate this page.</p></div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
