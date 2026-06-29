import {cache} from "react";
import groq from "groq";
import {sanityFetch} from "@/sanity/lib/client";
import type {HomePageDocument, PageDocument, PageRoute, PostDocument, SiteSettings, SitemapPage} from "@/sanity/lib/types";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  headerLogo{..., alt},
  navigation[]{
    openInNewTab,
    "label": coalesce(label, page->title),
    "href": select(defined(page->slug.current) => "/" + page->section + "/" + page->slug.current, href),
    children[]{
      openInNewTab,
      "label": coalesce(label, page->title),
      "href": select(defined(page->slug.current) => "/" + page->section + "/" + page->slug.current, href)
    }
  },
  socialLinks[]{label, href},
  footerLinks[]{label, href, openInNewTab},
  sponsors[]{name, href, tier, logo{alt, asset->{url, originalFilename, mimeType}}},
  address
}`;
export const homePageQuery = groq`*[_type == "homePage"][0]{_id, title, heroHeading, regions[]{label, href}, heroImages[]{..., alt}, programmesHeading, programmesBody, programmeCards[]{title, href, featured}, premLeague{title, fixtureRound, resultsRound, date, resultsDate, fixtureLabel, resultsLabel, fixtures[]{homeTeam, awayTeam, date, time, venue}, results[]{homeTeam, awayTeam, date, homeScore, awayScore, result, venue}}, statement, latestHeading}`;
export const pageByRouteQuery = groq`*[_type == "page" && section == $section && slug.current == $slug][0]{_id, title, section, "slug": slug.current, breadcrumbTitle, bannerImage{..., alt}, sidebarNewsHeading, sidebarNewsTags, facebookFeeds[]{title, pageUrl}, downloads[]{title, description, "fileUrl": file.asset->url, "fileName": file.asset->originalFilename}, accordionYearGroups[]{title, sections[]{title, body}}, accordionSections[]{title, body}, excerpt, body}`;
export const allPageRoutesQuery = groq`*[_type == "page" && defined(slug.current)][]{section, "slug": slug.current}`;
export const allPagesQuery = groq`*[_type == "page" && defined(slug.current)] | order(section asc, title asc){title, section, "slug": slug.current}`;
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){_id, title, "slug": slug.current, category, tags, excerpt, publishedAt, mainImage{..., alt}}`;
export const postsByTagsQuery = groq`*[_type == "post" && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc)[0...4]{_id, title, "slug": slug.current, category, tags, excerpt, publishedAt, mainImage{..., alt}}`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{_id, title, "slug": slug.current, category, tags, excerpt, publishedAt, mainImage{..., alt}, body}`;

export const getSiteSettings = cache(async () => sanityFetch<SiteSettings>({query: siteSettingsQuery, tags: ["siteSettings"]}));
export const getHomePage = cache(async () => sanityFetch<HomePageDocument>({query: homePageQuery, tags: ["homePage"]}));
export const getPageByRoute = cache(async (section: string, slug: string) => sanityFetch<PageDocument>({query: pageByRouteQuery, params: {section, slug}, tags: ["page", section, slug]}));
export const getAllPageRoutes = cache(async () => (await sanityFetch<PageRoute[]>({query: allPageRoutesQuery, tags: ["page"]})) || []);
export const getAllPages = cache(async () => (await sanityFetch<SitemapPage[]>({query: allPagesQuery, tags: ["page"]})) || []);
export const getPosts = cache(async () => (await sanityFetch<PostDocument[]>({query: postsQuery, tags: ["post"]})) || []);
export const getPostsByTags = cache(async (tags: string[]) => {
  if (!tags.length) {
    return [];
  }

  return (await sanityFetch<PostDocument[]>({query: postsByTagsQuery, params: {tags}, tags: ["post", ...tags]})) || [];
});
export const getPostBySlug = cache(async (slug: string) => sanityFetch<PostDocument>({query: postBySlugQuery, params: {slug}, tags: ["post", slug]}));
