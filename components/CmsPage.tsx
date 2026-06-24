import Image from "next/image";
import {PortableText} from "@portabletext/react";
import {PageAccordionSections} from "@/components/PageAccordionSections";
import {PageFacebookFeeds} from "@/components/PageFacebookFeeds";
import {portableTextComponents} from "@/components/PortableTextComponents";
import {PremLeagueSection} from "@/sections/PremLeagueSection";
import {RelatedNewsSection} from "@/components/RelatedNewsSection";
import {SectionSubnav} from "@/components/SectionSubnav";
import {urlFor} from "@/sanity/lib/image";
import type {HomePageDocument, PageDocument, PostDocument, SiteSettings} from "@/sanity/lib/types";

const sectionTitles: Record<string, string> = {
  about: "About",
  programmes: "Programmes",
  competitions: "Competitions",
  reps: "Reps",
  "coaches-refs": "Coaches & Refs",
  resources: "Resources",
  contact: "Contact"
};

function normalizeNavLabel(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
}

const interiorShellClass = "relative mx-auto max-w-[1400px]";
const centeredContentClass = "mx-auto max-w-[800px]";
const desktopLeftRailClass = "hidden min-[1340px]:block min-[1340px]:absolute min-[1340px]:left-[40px] min-[1340px]:top-0 min-[1340px]:w-[11.875rem]";

function DownloadsSection({page}: {page: PageDocument}) {
  if (!page.downloads?.length) {
    return null;
  }

  return (
    <section className="mb-10">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">Downloads</h2>
        <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
      </div>
      <div className="grid gap-4">
        {page.downloads.filter((item) => item.fileUrl).map((item) => (
          <article key={`${page._id}-${item.title}`} className="bg-white px-5 py-4 shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
            <h3 className="text-lg font-semibold leading-7 text-northland-blue">
              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="transition hover:text-northland-tealDark">
                {item.title}
              </a>
            </h3>
            {item.description ? <p className="mt-2 text-base leading-7 text-black/70">{item.description}</p> : null}
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 border-b border-northland-blue pb-0.5 text-sm font-semibold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
            >
              Open {item.fileName || "document"}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PageMainContent({
  page,
  homePage,
  showPremLeagueTable,
  showFacebookGrid,
  showInlineFacebook,
  relatedPosts
}: {
  page: PageDocument;
  homePage?: HomePageDocument | null;
  showPremLeagueTable: boolean;
  showFacebookGrid: boolean;
  showInlineFacebook: boolean;
  relatedPosts: PostDocument[];
}) {
  const inlineFacebookFeed = showInlineFacebook ? (page.facebookFeeds || [])[0] : null;
  const showRelatedNews = relatedPosts.length > 0;

  return (
    <>
      <header className="mb-10 border-b border-black/10 pb-8">
        <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight text-northland-blue sm:text-6xl">{page.title}</h1>
        {page.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-black/75">{page.excerpt}</p> : null}
      </header>
      {showPremLeagueTable ? <PremLeagueSection homePage={homePage} showSidebar={false} /> : null}
      <div className={inlineFacebookFeed ? "grid gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_21.25rem] min-[900px]:items-start" : undefined}>
        <div className="min-w-0">
          <DownloadsSection page={page} />
          <article className="cms-content max-w-[72ch]">
            <PortableText value={page.body || []} components={portableTextComponents} />
          </article>
        </div>
        {inlineFacebookFeed ? (
          <div className="min-w-0">
            <PageFacebookFeeds feeds={[inlineFacebookFeed]} variant="inlineRight" />
          </div>
        ) : null}
      </div>
      <PageAccordionSections sections={page.accordionSections || []} yearGroups={page.accordionYearGroups || []} />
      {showFacebookGrid ? <PageFacebookFeeds feeds={page.facebookFeeds || []} /> : null}
      {showRelatedNews ? (
        <div className="mt-12">
          <RelatedNewsSection heading={page.sidebarNewsHeading || "Latest News"} posts={relatedPosts} />
        </div>
      ) : null}
    </>
  );
}

export function CmsPage({
  page,
  homePage,
  siteSettings,
  relatedPosts = []
}: {
  page: PageDocument;
  homePage?: HomePageDocument | null;
  siteSettings?: SiteSettings | null;
  relatedPosts?: PostDocument[];
}) {
  const facebookFeeds = page.facebookFeeds || [];
  const sectionTitle = sectionTitles[page.section] || page.section;
  const showPremLeagueTable = page.section === "competitions" && ["fixtures-results", "prem-league"].includes(page.slug);
  const currentPath = `/${page.section}/${page.slug}`;
  const sectionNavCandidates = siteSettings?.navigation?.filter((item) => item.children?.some((child) => child.href?.startsWith(`/${page.section}/`))) || [];
  const sectionNav = sectionNavCandidates.find((item) => normalizeNavLabel(item.label) === normalizeNavLabel(sectionTitle)) || sectionNavCandidates[0];
  const sectionItems = sectionNav?.children || [];
  const isRegionLinkedPage = Boolean(homePage?.regions?.some((region) => region.href === currentPath));
  const showSectionNav = sectionItems.length > 1 && !isRegionLinkedPage;
  const showRelatedNews = relatedPosts.length > 0;
  const showFacebookSidebar = facebookFeeds.length === 1;
  const showFacebookGrid = facebookFeeds.length > 1;
  const showInlineFacebook = showFacebookSidebar;
  const bannerImageUrl = page.bannerImage?.asset ? urlFor(page.bannerImage).width(1800).fit("max").url() : null;

  return (
    <section className="px-5 py-10 sm:px-7 md:py-14 lg:px-10">
      <div className={interiorShellClass}>
        {showSectionNav ? (
          <div className={desktopLeftRailClass}>
            <SectionSubnav title={sectionNav?.label || sectionTitle} items={sectionItems} currentPath={currentPath} />
          </div>
        ) : null}

        <div className={centeredContentClass}>
          {bannerImageUrl ? (
            <div className="mb-8">
              <div className="flex h-[200px] items-center justify-center overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
                <Image
                  src={bannerImageUrl}
                  alt={page.bannerImage?.alt || `${page.title} banner`}
                  width={1800}
                  height={720}
                  className="h-full w-full object-cover"
                  unoptimized
                  priority
                />
              </div>
            </div>
          ) : null}
          <PageMainContent
            page={page}
            homePage={homePage}
            showPremLeagueTable={showPremLeagueTable}
            showFacebookGrid={showFacebookGrid}
            showInlineFacebook={showInlineFacebook}
            relatedPosts={relatedPosts}
          />
          </div>
      </div>
    </section>
  );
}
