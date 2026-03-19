import groq from "groq";
import {sanityFetch} from "@/sanity/lib/client";
import type {HomePageDocument, PageDocument, PostDocument, SiteSettings} from "@/sanity/lib/types";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{navigation[]{label, href, openInNewTab}, socialLinks[]{label, href}, footerLinks[]{label, href, openInNewTab}, sponsors[]{name, href}, address}`;
export const homePageQuery = groq`*[_type == "homePage"][0]{_id, title, heroHeading, regions[]{label, href}, heroImages[]{..., alt}, programmesHeading, programmesBody, programmeCards[]{title, href, featured}, statement, latestHeading}`;
export const pageByRouteQuery = groq`*[_type == "page" && section == $section && slug.current == $slug][0]{_id, title, section, "slug": slug.current, breadcrumbTitle, excerpt, body}`;
export const allPageRoutesQuery = groq`*[_type == "page" && defined(slug.current)][]{section, "slug": slug.current}`;
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){_id, title, "slug": slug.current, category, excerpt, publishedAt, mainImage{..., alt}}`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{_id, title, "slug": slug.current, category, excerpt, publishedAt, mainImage{..., alt}, body}`;

export async function getSiteSettings() { return sanityFetch<SiteSettings>({query: siteSettingsQuery, tags: ["siteSettings"]}); }
export async function getHomePage() { return sanityFetch<HomePageDocument>({query: homePageQuery, tags: ["homePage"]}); }
export async function getPageByRoute(section: string, slug: string) { return sanityFetch<PageDocument>({query: pageByRouteQuery, params: {section, slug}, tags: ["page", section, slug]}); }
export async function getAllPageRoutes() { return (await sanityFetch<Array<{section: string; slug: string}>>({query: allPageRoutesQuery, tags: ["page"]})) || []; }
export async function getPosts() { return (await sanityFetch<PostDocument[]>({query: postsQuery, tags: ["post"]})) || []; }
export async function getPostBySlug(slug: string) { return sanityFetch<PostDocument>({query: postBySlugQuery, params: {slug}, tags: ["post", slug]}); }
