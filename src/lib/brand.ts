/**
 * Brand palette, shared by the generated icon and OG routes (through
 * `siteConfig.brand`) and by client code such as the preloader.
 *
 * Its own module so a client component can read a colour without importing
 * `site.ts`, which validates the environment with zod — importing it from the
 * preloader put all of zod (~70 KB gzipped) in the first-load JS of every page.
 */
export const BRAND = {
  green: "#81f5b0",
  lime: "#c1ebce",
  mint: "#07130f",
} as const;
