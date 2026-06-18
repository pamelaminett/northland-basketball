import {HeaderClient} from "@/components/HeaderClient";
import {getSiteSettings} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";
import type {NavLink, SocialLink} from "@/sanity/lib/types";

const fallbackNavLinks: NavLink[] = [
  {
    label: "About",
    children: [
      {label: "Our Story", href: "/about/our-story"},
      {label: "Vision & Values", href: "/about/vision-values"},
      {label: "Board & Staff", href: "/about/board-staff"},
      {label: "Strategic Plan", href: "/about/strategic-plan"},
      {label: "Partners & Funders", href: "/about/partners-funders"},
      {label: "Contact Us", href: "/contact/key-contacts"}
    ]
  },
  {
    label: "Programmes",
    children: [
      {label: "Kiwi Hoops", href: "/programmes/kiwi-hoops"},
      {label: "Girls Got Game", href: "/programmes/girls-got-game"},
      {label: "Development Programmes", href: "/programmes/development-programmes"},
      {label: "Holiday Programmes", href: "/programmes/holiday-programmes"},
      {label: "In-School Programmes", href: "/programmes/in-school-programmes"}
    ]
  },
  {
    label: "Competitions",
    children: [
      {label: "Primary School Competition", href: "/competitions/primary-school-competition"},
      {label: "Secondary School Competition", href: "/competitions/secondary-school-competition"},
      {label: "Youth Leagues", href: "/competitions/youth-leagues"},
      {label: "Adult Leagues", href: "/competitions/adult-leagues"},
      {label: "Tribal Wars", href: "/competitions/tribal-wars"},
      {label: "SuperCity", href: "/competitions/supercity"},
      {label: "Regional / National Tournaments", href: "/competitions/regional-national-tournaments"},
      {label: "3x3 Basketball", href: "/programmes/3x3"},
      {label: "Fixtures & Results", href: "/competitions/fixtures-results"},
      {label: "Draws & Key Dates", href: "/competitions/draws-key-dates"}
    ]
  },
  {
    label: "Reps",
    children: [
      {label: "Pathways", href: "/reps/pathways"},
      {label: "Trial Dates", href: "/reps/trial-dates"},
      {label: "Selection Criteria", href: "/reps/selection-criteria"},
      {label: "Competition Calendar", href: "/reps/competition-calendar"},
      {label: "Coaches", href: "/reps/coaches"},
      {label: "Code of Conduct", href: "/reps/code-of-conduct"},
      {label: "Photo Templates", href: "/reps/photo-templates"},
      {label: "Current and Past Teams", href: "/reps/current-past-teams"}
    ]
  },
  {
    label: "Coaches and Refs",
    children: [
      {label: "Become a Coach", href: "/coaches-refs/become-a-coach"},
      {label: "Become a Referee", href: "/coaches-refs/become-a-referee"},
      {label: "Resources & Downloads", href: "/coaches-refs/resources-downloads"},
      {label: "Codes of Conduct", href: "/coaches-refs/codes-of-conduct"}
    ]
  },
  {
    label: "News",
    children: [
      {label: "News", href: "/news"},
      {label: "Player Stories", href: "/news/player-stories"},
      {label: "Coach Spotlights", href: "/news/coach-spotlights"},
      {label: "Programme Updates", href: "/news/programme-updates"},
      {label: "Media Gallery", href: "/news/media-gallery"}
    ]
  },
  {
    label: "Resources",
    children: [
      {label: "Policies & Procedures", href: "/resources/policies-procedures"},
      {label: "Codes of Conduct", href: "/resources/codes-of-conduct"},
      {label: "Health & Safety", href: "/resources/health-safety"},
      {label: "Safeguarding", href: "/resources/safeguarding"},
      {label: "Forms & Documents", href: "/resources/forms-documents"},
      {label: "FAQs", href: "/resources/faqs"}
    ]
  },
  {
    label: "Contact",
    children: [
      {label: "Sponsorship & Partnerships", href: "/contact/sponsorship-partnerships"},
      {label: "Donations & Support", href: "/contact/donations-support"},
      {label: "Volunteers", href: "/contact/volunteers"},
      {label: "Key Contacts", href: "/contact/key-contacts"},
      {label: "Social Media Links", href: "/contact/social-media-links"},
      {label: "Calendar", href: "/contact/calendar"}
    ]
  }
];

const fallbackSocials: SocialLink[] = [
  {label: "Facebook", href: "https://www.facebook.com/northlandbasketball"},
  {label: "Instagram", href: "https://instagram.com"}
];

export async function Header() {
  const settings = await getSiteSettings();
  const navLinks = settings?.navigation?.length ? settings.navigation : fallbackNavLinks;
  const socials = settings?.socialLinks?.length ? settings.socialLinks : fallbackSocials;
  const headerLogoUrl = settings?.headerLogo?.asset ? urlFor(settings.headerLogo).width(320).height(160).fit("max").url() : null;

  return <HeaderClient headerLogoAlt={settings?.headerLogo?.alt || "Northland Basketball logo"} headerLogoUrl={headerLogoUrl} navLinks={navLinks} socials={socials} />;
}
