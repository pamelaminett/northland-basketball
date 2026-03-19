import type {Image, TypedObject} from "sanity";

export type NavLink = { label: string; href: string; openInNewTab?: boolean; };
export type SocialLink = { label: string; href: string; };
export type Sponsor = { name: string; href?: string; };
export type PortableTextBlock = TypedObject[];
export type SanityImage = Image & { alt?: string; };
export type HomePageRegion = { label: string; href?: string; };
export type ProgrammeCardItem = { title: string; href?: string; featured?: boolean; };
export type SiteSettings = { navigation?: NavLink[]; socialLinks?: SocialLink[]; footerLinks?: NavLink[]; sponsors?: Sponsor[]; address?: PortableTextBlock; };
export type HomePageDocument = {
  _id: string;
  title: string;
  heroHeading?: string;
  regions?: HomePageRegion[];
  heroImages?: SanityImage[];
  programmesHeading?: string;
  programmesBody?: PortableTextBlock;
  programmeCards?: ProgrammeCardItem[];
  statement?: string;
  latestHeading?: string;
};
export type PageDocument = { _id: string; title: string; section: string; slug: string; breadcrumbTitle?: string; excerpt?: string; body?: PortableTextBlock; };
export type PostDocument = { _id: string; title: string; slug: string; category?: string; excerpt?: string; publishedAt?: string; mainImage?: SanityImage; body?: PortableTextBlock; };
