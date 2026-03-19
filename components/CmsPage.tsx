import Link from "next/link";
import {PortableText} from "@portabletext/react";
import type {PageDocument} from "@/sanity/lib/types";

const sectionTitles: Record<string, string> = {about: "About", programmes: "Programmes", competitions: "Competitions", reps: "Reps", "coaches-refs": "Coaches & Refs", resources: "Resources", contact: "Contact"};

export function CmsPage({page}: {page: PageDocument}) {
  const sectionTitle = sectionTitles[page.section] || page.section;
  const breadcrumbTitle = page.breadcrumbTitle || page.title;

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm uppercase tracking-[0.14em] text-northland-blue/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-northland-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><span>{sectionTitle}</span></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-northland-blue">{breadcrumbTitle}</li>
          </ol>
        </nav>
        <header className="mb-10 border-b border-black/10 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-northland-tealDark">{sectionTitle}</p>
          <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight text-northland-blue sm:text-6xl">{page.title}</h1>
          {page.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-black/75">{page.excerpt}</p> : null}
        </header>
        <article className="cms-content"><PortableText value={page.body || []} /></article>
      </div>
    </section>
  );
}
