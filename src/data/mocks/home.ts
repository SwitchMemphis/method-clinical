/**
 * Copy and content for the home page, lifted from the Figma frame
 * "Concept 4" (node `1518:1970`).
 *
 * Components take this through props — never by importing this file directly
 * (see obsidian/frontend/component-conventions.md → Data rules). Swap it for a
 * CMS payload later without touching a single component.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroContent extends SectionIntro {
  /** Existing title phrase emphasized with the brand accent. */
  titleAccent?: string;
  action: CtaLink;
  /** Small proof line under the fold divider. */
  trustLine: string;
  /** Service chips floating over the scene. */
  serviceChips: readonly string[];
}

export interface SourcingContent {
  titleAccent: string;
  title: string;
  reviewNote: string;
  statements: readonly { title: string; description: string }[];
}

export interface ServiceCard {
  index: string;
  title: string;
  /** Sub-services listed on the opening card. */
  items?: readonly string[];
  /** Full-bleed photo card. */
  image?: string;
  /** Tail card carries a "Discover" affordance. */
  cta?: string;
  variant: "lime" | "photo" | "brand";
}

export interface StatItem {
  value: string;
  label: string;
}

/** The About paragraph greys the clauses that aren't the point. */
export interface AboutFragment {
  text: string;
  muted: boolean;
}

export interface AboutContent {
  eyebrow: string;
  bannerImage: string;
  stats: readonly StatItem[];
  paragraph: readonly AboutFragment[];
  actions: readonly CtaLink[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "linkedin" | "twitter";
}

/** Lime tail card closing the team rail (Figma node `1575:238`). */
export interface TeamMoreCard {
  title: string;
  cta: string;
  href: string;
}

export interface TeamContent {
  eyebrow: string;
  title: string;
  socials: readonly SocialLink[];
  members: readonly TeamMember[];
  more: TeamMoreCard;
}

export const SITE_NAV: readonly NavLink[] = [
  { label: "Register your clinic", href: "/register/" },
  { label: "Catalog", href: "/catalog/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Resources", href: "/resources/" },
  { label: "Sourcing", href: "#why" },
  { label: "Testing", href: "#testing" },
];

export const HEADER_CTA: CtaLink = { label: "Sign in", href: "/login/" };

export const HERO_CONTENT: HeroContent = {
  eyebrow: "01 Flow / Provider supply",
  title: "Wholesale peptides for licensed providers.",
  titleAccent: "licensed providers.",
  description:
    "Clinical-grade peptides, seven-layer tested with a Certificate of Analysis on every lot — supplied wholesale to licensed clinics, spas, and modern practices.",
  action: { label: "Request wholesale pricing", href: "/wholesale-pricing/" },
  trustLine: "Mint Clinical / 01 Flow",
  serviceChips: ["Compound catalog", "Lot documentation", "Provider access"],
};

export const SOURCING_CONTENT: SourcingContent = {
  title: "The Mint Standard",
  titleAccent: "Mint",
  reviewNote: "Draft statements for private review.",
  statements: [
    { title: "FDA Listed Facilities", description: "All active pharmaceutical ingredients are sourced from an FDA-registered 503B outsourcing facility." },
    { title: "Made in the U.S.", description: "Proudly made in the United States of America." },
    { title: "ISO Clean Room", description: "Compounded domestically following cGMP standards." },
  ],
};

export const SERVICES_INTRO: SectionIntro = {
  eyebrow: "02 / Compound catalog",
  title: "Browse by compound name.",
  description: "Sample catalog for design review. Availability and pricing are pending.",
};

export const SERVICE_CARDS: readonly ServiceCard[] = [
  { index: "01", title: "RT", items: ["20 MG concept label"], variant: "lime" },
  { index: "02", title: "BPC-157", image: "/assets/emerald-specimen.webp", variant: "photo" },
  { index: "03", title: "Thymosin Alpha-1", variant: "brand" },
  { index: "04", title: "CJC-1295 Without DAC", image: "/assets/flow-crop.webp", variant: "photo" },
];

export const ABOUT_CONTENT: AboutContent = {
  eyebrow: "03 / Batch documentation",
  bannerImage: "/assets/sweep.webp",
  stats: [
    { value: "01", label: "Product name" },
    { value: "02", label: "Lot identifier" },
    { value: "03", label: "Tests listed" },
    { value: "04", label: "Reported results" },
  ],
  paragraph: [
    { text: "Start with the lot number. ", muted: false },
    { text: "A Certificate of Analysis records the tests and results reported for a specific lot. ", muted: true },
    { text: "Compare the product and lot identifiers with the vial label.", muted: false },
  ],
  actions: [
    { label: "Browse catalog", href: "#services" },
    { label: "Provider access", href: "/register/" },
  ],
};

export const TEAM_CONTENT: TeamContent = {
  eyebrow: "04 / Provider accounts",
  title: "Set up your practice.",
  socials: [],
  members: [
    { name: "Organization", role: "Practice or business name", image: "/assets/flow-field.webp" },
    { name: "Work email", role: "Your professional email address", image: "/assets/flow-crop.webp" },
    { name: "Contact name", role: "Your practice’s point of contact", image: "/assets/emerald-specimen.webp" },
  ],
  more: {
    title: "New to Mint Clinical?",
    cta: "Register your clinic",
    href: "/register/",
  },
};
