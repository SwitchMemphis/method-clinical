/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { getServerEnv, publicEnv } from "@/env";

import { BRAND } from "@/lib/brand";

const vercelProduction = getServerEnv().VERCEL_PROJECT_PRODUCTION_URL;
const defaultOrigin = process.env.NODE_ENV === "production"
  ? "https://mintclinical.com"
  : "http://localhost:3000";

export const siteConfig = {
  name: "Mint Clinical",
  /** Used as the `<title>` when a page doesn't set its own. */
  title: "Mint Clinical | Wholesale peptide supply",
  description:
    "Wholesale peptide supply for licensed providers. Explore our sourcing standards, testing process, and provider access.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url:
    publicEnv.NEXT_PUBLIC_SITE_URL ??
    (vercelProduction ? `https://${vercelProduction}` : defaultOrigin),
  ogImage: "/assets/mint-clinical-nad-share.jpg",
  ogImageAlt: "Mint Clinical logo above an NAD+ vial on a glass pedestal",
  author: "Mint Clinical",
  /** Browser theme-color (address bar / PWA) — the brand green. */
  themeColor: "#07130f",
  /** Brand palette, shared with the generated icon routes. */
  brand: BRAND,
} as const;
