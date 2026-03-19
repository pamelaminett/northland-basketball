import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {CmsPage} from "@/components/CmsPage";
import {SiteShell} from "@/components/SiteShell";
import {getAllPageRoutes, getPageByRoute} from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const routes = await getAllPageRoutes();
  return routes.map((route) => ({section: route.section, slug: route.slug}));
}

export async function generateMetadata({params}: {params: Promise<{section: string; slug: string}>}): Promise<Metadata> {
  const {section, slug} = await params;
  const page = await getPageByRoute(section, slug);
  if (!page) return {title: "Page not found | Northland Basketball"};
  return {title: `${page.title} | Northland Basketball`, description: page.excerpt};
}

export default async function SectionPage({params}: {params: Promise<{section: string; slug: string}>}) {
  const {section, slug} = await params;
  const page = await getPageByRoute(section, slug);
  if (!page) notFound();
  return <SiteShell><CmsPage page={page} /></SiteShell>;
}
