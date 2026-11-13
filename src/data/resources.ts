type Resource = {
  slug: string;
  category: "Operations" | "Wholesale Buying" | "Quality & Testing";
  title: string;
  summary: string;
  date: string;
  readTime: number;
  image: string;
  imageAlt?: string;
  sources?: { label: string; href: string }[];
};

const registration = {
  label: "FDA questions and answers on outsourcing facility registration",
  href: "https://www.fda.gov/drugs/human-drug-compounding/questions-and-answers-outsourcing-facility-registration",
};
const compounding = {
  label: "FDA questions and answers on compounding",
  href: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
};

export const RESOURCES: Resource[] = [
  {
    slug: "clinic-inventory-planning",
    image: "/assets/testing-standards/clinical-lab-autosampler.webp",
    category: "Operations",
    title: "Peptide Inventory Planning for Clinics",
    date: "2026-11-13",
    readTime: 2,
    summary: "Stockouts cost trust; overstock costs cash and risks expiry. A simple framework for planning peptide inventory in a busy clinic.",
  },
  {
    slug: "private-label-fulfillment",
    image: "/assets/resources/white-label-packaging.webp",
    imageAlt: "Hands comparing a color swatch with a label, carton and vial mockup",
    category: "Wholesale Buying",
    title: "White-Label Peptides: How Clinics Build Their Own Brand",
    date: "2026-10-30",
    readTime: 2,
    summary: "White-label fulfillment lets a clinic sell tested peptides under its own brand without running a lab. Here's how it works and what to look for in a partner.",
  },
  {
    slug: "storage-and-receiving",
    image: "/assets/mobile-hero-lab-vials.webp",
    category: "Operations",
    title: "Peptide Storage & Handling for Clinics",
    date: "2026-10-16",
    readTime: 2,
    summary: "Even a perfect lot degrades if it's mishandled. A practical storage and handling checklist to protect peptide integrity from delivery to the bench.",
  },
  {
    slug: "what-quality-tests-show",
    image: "/assets/testing-standards/field-journal-microscope.webp",
    category: "Quality & Testing",
    title: "Why Peptide Testing Matters: HPLC, Sterility & Endotoxin Explained",
    date: "2026-10-02",
    readTime: 3,
    summary: "Read purity, identity, sterility and endotoxin results as separate pieces of evidence.",
    sources: [
      { label: "FDA guidance on validation of analytical procedures", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r2-validation-analytical-procedures" },
      { label: "FDA guidance on pyrogen and endotoxins testing", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/pyrogen-and-endotoxins-testing-questions-and-answers" },
    ],
  },
  {
    slug: "wholesale-buying-guide",
    image: "/assets/clinic-growth-analytical-lab.webp",
    category: "Wholesale Buying",
    title: "Wholesale Peptides for Clinics: A Buying Guide",
    date: "2026-09-18",
    readTime: 2,
    summary: "Compare supplier documentation, responsibilities and receiving terms before placing an order.",
    sources: [registration, compounding],
  },
  {
    slug: "supplier-due-diligence-questions",
    image: "/assets/resources/supplier-due-diligence.webp",
    imageAlt: "Clinic buyer reviewing a supplier checklist on a video call",
    category: "Wholesale Buying",
    title: "9 Questions to Ask Before Choosing a Wholesale Peptide Supplier",
    date: "2026-09-04",
    readTime: 2,
    summary: "Use the same questions for every prospective supplier so your clinic can compare written answers.",
    sources: [registration],
  },
  {
    slug: "reading-a-certificate-of-analysis",
    image: "/assets/resources/certificate-of-analysis.webp",
    imageAlt: "Pen pointing to the results table and chromatogram on a sample certificate of analysis",
    category: "Quality & Testing",
    title: "How to Read a Peptide COA: A Clinic's Guide",
    date: "2026-08-24",
    readTime: 3,
    summary: "Match the document to the shipment, interpret the result columns and flag missing evidence.",
    sources: [{ label: "FDA guidance on validation of analytical procedures", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r2-validation-analytical-procedures" }],
  },
];

export const resourcePath = (slug: string) => `/resources/${slug}/`;
