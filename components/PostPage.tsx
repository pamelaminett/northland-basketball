import Link from "next/link";
import {PortableText} from "@portabletext/react";
import type {PostDocument} from "@/sanity/lib/types";

export function PostPage({post}: {post: PostDocument}) {
  const formattedDate = post.publishedAt ? new Intl.DateTimeFormat("en-NZ", {day: "numeric", month: "long", year: "numeric"}).format(new Date(post.publishedAt)) : null;

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm uppercase tracking-[0.14em] text-northland-blue/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-northland-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/news" className="hover:text-northland-blue">News</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-northland-blue">{post.title}</li>
          </ol>
        </nav>
        <header className="mb-10 border-b border-black/10 pb-8">
          {post.category ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-northland-tealDark">{post.category}</p> : null}
          <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight text-northland-blue sm:text-6xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.14em] text-black/60">{formattedDate ? <span>{formattedDate}</span> : null}</div>
          {post.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-black/75">{post.excerpt}</p> : null}
        </header>
        <article className="cms-content"><PortableText value={post.body || []} /></article>
      </div>
    </section>
  );
}
