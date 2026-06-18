import type {Image, TypedObject} from "sanity";

export type NavLink = { label: string; href?: string; openInNewTab?: boolean; children?: NavLink[]; };
export type SocialLink = { label: string; href: string; };
export type Sponsor = { name: string; href?: string; };
export type PortableTextBlock = TypedObject[];
export type SanityImage = Image & { alt?: string; };
export type HomePageRegion = { label: string; href?: string; };
export type ProgrammeCardItem = { title: string; href?: string; featured?: boolean; };
export type PremLeagueFixture = { homeTeam: string; awayTeam: string; time?: string; venue?: string; };
export type PremLeagueResult = {
  homeTeam: string;
  awayTeam: string;
  homeScore?: string;
  awayScore?: string;
  result?: string;
  venue?: string;
};
export type PremLeagueSection = {
  title?: string;
  date?: string;
  resultsDate?: string;
  fixtureLabel?: string;
  resultsLabel?: string;
  fixtures?: PremLeagueFixture[];
  results?: PremLeagueResult[];
};
export type PageDownload = {
  title: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
};
export type PageAccordionSection = {
  title: string;
  body?: PortableTextBlock;
};
export type PageAccordionYearGroup = {
  title: string;
  sections?: PageAccordionSection[];
};
export type PageFacebookFeed = {
  title: string;
  pageUrl: string;
};
export type PageRoute = { section: string; slug: string; };
export type SitemapPage = { title: string; section: string; slug: string; };
export type SiteSettings = { headerLogo?: SanityImage; navigation?: NavLink[]; socialLinks?: SocialLink[]; footerLinks?: NavLink[]; sponsors?: Sponsor[]; address?: PortableTextBlock; };
export type HomePageDocument = {
  _id: string;
  title: string;
  heroHeading?: string;
  regions?: HomePageRegion[];
  heroImages?: SanityImage[];
  programmesHeading?: string;
  programmesBody?: PortableTextBlock;
  programmeCards?: ProgrammeCardItem[];
  premLeague?: PremLeagueSection;
  statement?: string;
  latestHeading?: string;
};
export type PageDocument = {
  _id: string;
  title: string;
  section: string;
  slug: string;
  breadcrumbTitle?: string;
  bannerImage?: SanityImage;
  sidebarNewsHeading?: string;
  sidebarNewsTags?: string[];
  facebookFeeds?: PageFacebookFeed[];
  downloads?: PageDownload[];
  accordionYearGroups?: PageAccordionYearGroup[];
  accordionSections?: PageAccordionSection[];
  excerpt?: string;
  body?: PortableTextBlock;
};
export type PostDocument = { _id: string; title: string; slug: string; category?: string; tags?: string[]; excerpt?: string; publishedAt?: string; mainImage?: SanityImage; body?: PortableTextBlock; };
