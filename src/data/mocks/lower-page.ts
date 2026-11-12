export const CATALOG_CONTENT = {
  description:
    "One place to explore compounds, find lot documentation and connect your practice.",
  itemDescription:
    "Explore the compound catalog and request access for your practice.",
  indexLabel: "Mint / Compound index",
  audienceLabel: "Audience",
  audience: "Licensed providers",
  statusLabel: "Catalog status",
  status: "Design preview",
  action: "Request catalog access",
  previewNote:
    "Sample catalog for design review. Availability, specifications and pricing are pending.",
} as const;

export const DOCUMENT_CONTENT = {
  titleLines: ["Start with", "the lot number."],
  description:
    "A Certificate of Analysis records the tests and results reported for a specific lot. Here’s what to look for.",
  action: "Ask about lot documents",
  previewNote: "Illustrative layout. No laboratory results are displayed.",
} as const;

export const ACCESS_FOOTER_CONTENT = {
  title: "Wholesale supply.",
  subtitle: "A direct connection.",
  descriptor: "Mint Clinical / Wholesale supply for licensed providers.",
  links: [
    { href: "#why", label: "Sourcing" },
    { href: "#services", label: "Catalog" },
    { href: "#about", label: "Lot documents" },
  ],
} as const;
