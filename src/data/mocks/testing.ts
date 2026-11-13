/** Owner-approved Concept A copy. Supplied claims remain private-review drafts. */
export interface TestingLayer {
  title: string;
  shortLabel: string;
  description: string;
  category: string;
  whyItMatters?: string;
  setsUsApart?: string;
  detailHeading?: string;
  detailAction?: { label: string; href: string };
}

export interface TestingContent {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  listLabel: string;
  whyLabel: string;
  differenceLabel: string;
  layers: readonly TestingLayer[];
}

export const TESTING_CONTENT: TestingContent = {
  eyebrow: "",
  title: "The 7-layer",
  emphasis: "test",
  description: "Purity alone doesn't make a peptide safe to put in front of a clinic. We run a full seven-layer panel on every single batch — and this is exactly the proof your providers should be asking every supplier for.",
  listLabel: "Seven testing layers",
  whyLabel: "Why it matters",
  differenceLabel: "What sets us apart",
  layers: [
    {
      title: "HPLC purity", shortLabel: "Purity", category: "Identity & purity",
      description: "High-performance liquid chromatography confirms ≥99% purity.",
      whyItMatters: "Confirms the active really is ≥99% pure — not diluted with related-peptide impurities that can cause unexpected reactions in a patient.",
      setsUsApart: 'Most suppliers run only this one test and call the product "tested." Purity alone says nothing about what else is in the vial.',
    },
    {
      title: "Mass spectrometry", shortLabel: "Identity", category: "Identity & purity",
      description: "Exact molecular weight proves the vial is what the label says.",
      whyItMatters: "Verifies the molecule's exact mass matches the target peptide, so your providers are getting the real sequence — not a cheaper look-alike.",
      setsUsApart: "Catches mislabeled or substituted product that a purity test alone can completely miss.",
    },
    {
      title: "Sterility / bioburden", shortLabel: "Microbial", category: "Contaminant screening",
      description: "Microbial contamination testing within clean research limits.",
      whyItMatters: "Confirms there's no microbial growth — critical for anything reconstituted and handled in a clinic setting.",
      setsUsApart: "A perfectly pure peptide that's contaminated is still unsafe. Very few research suppliers test for this at all.",
    },
    {
      title: "Endotoxin (LAL)", shortLabel: "Endotoxin", category: "Contaminant screening",
      description: "Bacterial endotoxin screening — a key safety marker on a strong COA.",
      whyItMatters: "Detects bacterial endotoxins that survive normal sterilization and can trigger serious reactions even at tiny levels.",
      setsUsApart: "It's the first marker an experienced provider looks for on a COA — and the one cheap suppliers most often leave off.",
    },
    {
      title: "Heavy metals", shortLabel: "Metals", category: "Contaminant screening",
      description: "Screened for trace contaminants: lead, arsenic, cadmium, mercury.",
      whyItMatters: "Screens for toxic metals that can carry over from raw materials or the synthesis process and accumulate in the body.",
      setsUsApart: "Almost never tested in the research-peptide market — it's an added analytical cost that most suppliers quietly skip.",
    },
    {
      title: "Net peptide content", shortLabel: "Content", category: "Content & documentation",
      description: "Honest quantification of actual peptide vs. salts and water.",
      whyItMatters: "Tells you how much actual peptide is in the vial versus salts and water — the true mg your clinic is paying for and dosing from.",
      setsUsApart: 'Two vials both labeled "10mg" can differ 20%+ in real peptide. This is exactly where buyers get quietly shorted.',
    },
    {
      title: "Re-testing & fresh COAs", shortLabel: "Fresh COAs", category: "Content & documentation",
      detailHeading: "Re-tested & re-published every month — the part no one else does.",
      description: "Most labs test once and reuse the same certificate for a year. We re-test each SKU and publish a fresh COA 1–2× a month, so the document your clinic shows a patient always matches the lot in their hand.",
    },
  ],
};
