import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {PostPage} from "@/components/PostPage";
import {SiteShell} from "@/components/SiteShell";
import {getPostBySlug, getPosts} from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {title: "Post not found | Northland Basketball"};
  return {title: `${post.title} | Northland Basketball`, description: post.excerpt};
}

export default async function NewsPostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <SiteShell><PostPage post={post} /></SiteShell>;
}
