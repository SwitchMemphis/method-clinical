type Resource = {
  slug: string;
  category: "Operations" | "Wholesale Buying" | "Quality & Testing";
  title: string;
  summary: string;
  readTime: number;
  image: string;
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
    readTime: 6,
    summary: "Stockouts cost trust; overstock costs cash and risks expiry. A simple framework for planning peptide inventory in a busy clinic.",
  },
  {
    slug: "private-label-fulfillment",
    image: "/assets/testing-standards/optical-bench.webp",
    category: "Wholesale Buying",
    title: "White-Label Peptides: How Clinics Build Their Own Brand",
    readTime: 6,
    summary: "White-label fulfillment lets a clinic sell tested peptides under its own brand without running a lab. Here's how it works and what to look for in a partner.",
  },
  {
    slug: "storage-and-receiving",
    image: "/assets/mobile-hero-lab-vials.webp",
    category: "Operations",
    title: "Peptide Storage & Handling for Clinics",
    readTime: 6,
    summary: "Even a perfect lot degrades if it's mishandled. A practical storage and handling checklist to protect peptide integrity from delivery to the bench.",
  },
  {
    slug: "what-quality-tests-show",
    image: "/assets/testing-standards/field-journal-microscope.webp",
    category: "Quality & Testing",
    title: "Why Peptide Testing Matters: HPLC, Sterility & Endotoxin Explained",
    readTime: 7,
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
    readTime: 6,
    summary: "Compare supplier documentation, responsibilities and receiving terms before placing an order.",
    sources: [registration, compounding],
  },
  {
    slug: "supplier-due-diligence-questions",
    image: "/assets/testing-standards/optical-glass.webp",
    category: "Wholesale Buying",
    title: "9 Questions to Ask Before Choosing a Wholesale Peptide Supplier",
    readTime: 7,
    summary: "Use the same questions for every prospective supplier so your clinic can compare written answers.",
    sources: [registration],
  },
  {
    slug: "reading-a-certificate-of-analysis",
    image: "/assets/testing-standards/field-journal-optical-cells.webp",
    category: "Quality & Testing",
    title: "How to Read a Peptide COA: A Clinic's Guide",
    readTime: 6,
    summary: "Match the document to the shipment, interpret the result columns and flag missing evidence.",
    sources: [{ label: "FDA guidance on validation of analytical procedures", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r2-validation-analytical-procedures" }],
  },
];

export const resourcePath = (slug: string) => `/resources/${slug}/`;
