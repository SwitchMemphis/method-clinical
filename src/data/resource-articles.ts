type RelatedLinks = { label: string; links: readonly (readonly [slug: string, label: string])[] };
type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  numbered?: boolean;
  afterList?: string;
  related?: RelatedLinks;
};

type Article = {
  intro: string[];
  sections: ArticleSection[];
  faq: readonly [question: string, answer: string][];
  keepReading: readonly string[];
  partner?: boolean;
};

const inventory = "clinic-inventory-planning";
const whiteLabel = "private-label-fulfillment";
const storage = "storage-and-receiving";
const testing = "what-quality-tests-show";
const buying = "wholesale-buying-guide";
const questions = "supplier-due-diligence-questions";
const coa = "reading-a-certificate-of-analysis";

const readInventory = [inventory, "Peptide Inventory Planning for Clinics"] as const;
const readStorage = [storage, "Peptide Storage & Handling for Clinics"] as const;
const readBuying = [buying, "Wholesale Peptides for Clinics: A Buying Guide"] as const;
const readQuestions = [questions, "9 Questions to Ask a Supplier"] as const;
const readCoa = [coa, "How to Read a Peptide COA"] as const;
const readWhiteLabel = [whiteLabel, "White-Label Peptides: How Clinics Build Their Own Brand"] as const;
const defaultReading = [inventory, whiteLabel];

const paragraph = (heading: string, body: string): ArticleSection => ({ heading, paragraphs: [body] });

export const RESOURCE_ARTICLES: Record<string, Article> = {
  [inventory]: {
    intro: [
      "Inventory is where supply chain meets cash flow. Run too lean and you face stockouts that erode patient and provider trust; run too heavy and you tie up cash and risk product reaching its re-test or expiry window.",
      "This guide lays out a simple, practical approach to planning peptide inventory in a clinic without overcomplicating it.",
    ],
    sections: [
      paragraph("Start with demand, not guesswork", "Base your plan on actual usage. Track how much of each SKU moves per month, watch for seasonality and growth trends, and let real numbers — not vibes — set your reorder points. Even a simple spreadsheet of monthly usage per SKU beats reordering reactively."),
      paragraph("Lead times and safety stock", "Your reorder point is driven by how long an order takes to arrive. Add a safety-stock buffer to cover demand spikes and supplier delays. Suppliers that keep a core catalog in stock and ship in one to two business days let you carry less safety stock without risking stockouts."),
      { heading: "Rotate lots and watch re-test dates", list: ["Use first-in, first-out so older lots move before newer ones.", "Track each lot's re-test or expiry window so product doesn't quietly age out.", "Keep the lot-matched COA on file for every lot in stock."], related: { label: "Related reading", links: [readStorage] } },
      { ...paragraph("Avoid both stockouts and overstock", "The goal is balance: enough to never disappoint a provider, not so much that cash sits on a shelf or product expires. Review your numbers monthly, adjust reorder points as demand shifts, and lean on a supplier whose reliability lets you plan tighter."), related: { label: "Plan your sourcing", links: [readBuying, readQuestions] } },
    ],
    faq: [
      ["How much peptide inventory should a clinic keep?", "Use recent usage to estimate demand during your supplier’s lead time, then add a buffer based on how much demand and delivery times vary."],
      ["How do clinics avoid peptides expiring in inventory?", "Track expiration and re-test dates by lot, prioritize stock that expires first, and adjust order quantities when usage changes."],
    ],
    keepReading: [whiteLabel, storage],
  },
  [whiteLabel]: {
    intro: [
      "White-label fulfillment lets a clinic or wellness business put its own brand on professionally manufactured, tested product — without building a lab, holding inventory, or handling logistics.",
      "Here's how white-label peptides work, what you can control, and how to choose a partner that protects both your margin and your reputation.",
    ],
    sections: [
      paragraph("What white-label actually means", "In a white-label arrangement, the manufacturer produces and tests the product, then labels and ships it under your brand. Your customers see your name; the manufacturer stays invisible. You own the relationship and the pricing while the lab handles the science and fulfillment."),
      { heading: "What can be branded", list: ["Vial labels in your branding and design", "Cartons and outer packaging", "Inserts and documentation", "Blind shipping — the package arrives with no trace of the manufacturer"] },
      paragraph("Margin and pricing control", "Because your wholesale cost is fixed, whatever you charge your clinics above it is your margin. You set your own price list and keep the spread, while avoiding the overhead of manufacturing, inventory, and shipping."),
      { ...paragraph("What to look for in a white-label partner", "A white-label relationship only protects your brand if the product behind it is genuinely good. Evaluate the partner exactly as you would any supplier — testing depth, lot-matched COAs, reliable fulfillment, and a dedicated point of contact."), related: { label: "Vet your partner", links: [readQuestions, readBuying, readCoa] } },
      paragraph("How to get started", "The path is straightforward: apply for a partner account, agree on your catalog and branding, and the manufacturer custom-labels and blind-ships every order to your clinics. From there you scale on your terms."),
    ],
    faq: [
      ["What are white-label peptides?", "They are products supplied under another organization’s brand. The agreement should specify who makes and tests the product, who approves labels, and who keeps records."],
      ["How do clinics make money with white-label peptides?", "A margin depends on what a clinic can charge and all of its costs, including packaging, shipping, returns and administration. Confirm that the proposed arrangement is permitted before offering products."],
    ],
    keepReading: [inventory, storage],
    partner: true,
  },
  [storage]: {
    intro: [
      "A peptide is only as good as its condition at the moment it's used. Heat, light, moisture, and time all degrade product — which means storage and handling are part of quality, not an afterthought.",
      "This guide covers the practical steps clinics use to protect peptide integrity from the moment a shipment arrives. It is operational guidance only; it is not dosing or usage instruction, and all products are supplied for physician use only.",
    ],
    sections: [
      paragraph("Protect the cold chain in transit", "Integrity starts before the package reaches you. Reputable suppliers ship temperature-sensitive product with appropriate cold-chain packaging. On arrival, inspect the shipment promptly, confirm the contents against the packing list, and move product into proper storage without delay."),
      paragraph("Store lyophilized vials correctly", "Lyophilized (freeze-dried) peptides are generally the most stable form and are typically stored cold and protected from light and moisture. Keep vials sealed until needed, store them per the supplier's stated guidance, and avoid repeated temperature swings such as moving product in and out of cold storage."),
      paragraph("Handle reconstituted product per stability guidance", "Once reconstituted, a peptide's stability window changes and is generally shorter than the lyophilized form. Follow the supplier's stability guidance for the specific product, keep reconstituted vials cold and protected from light, and label them clearly. This article does not provide reconstitution amounts or usage protocols — refer to your supplier's documentation and your own qualified procedures."),
      { heading: "Control light, temperature, and time", list: ["Keep product out of direct light and away from heat sources.", "Minimize the time vials spend at room temperature.", "Avoid unnecessary freeze-thaw cycles where guidance advises against them.", "Track how long reconstituted product has been open against the supplier's stability window."] },
      { ...paragraph("Label, log, and keep the paperwork", "Good documentation is part of good handling. Record lot numbers, receipt dates, and storage conditions, and keep the lot-matched COA on file so the certificate always maps to the product on your shelf. Clear labeling and a simple log make audits, recalls, and reorders far easier."), related: { label: "Related reading", links: [readInventory, readCoa] } },
    ],
    faq: [
      ["How should clinics store peptides?", "Follow the written storage instructions for the specific product and form. Ask the supplier’s quality team for clarification if the label or documentation is unclear."],
      ["Does shipping affect peptide quality?", "It can when a shipment falls outside the product’s specified conditions. Record suspected excursions and hold affected stock for review before releasing it."],
    ],
    keepReading: defaultReading,
  },
  [testing]: {
    intro: [
      "Ask most peptide suppliers if their product is tested and they'll say yes — and mean a single purity number. Purity matters, but a peptide can be highly pure and still be the wrong molecule, contaminated, or short on actual content.",
      "This guide explains what each layer of a real testing panel proves and the specific risk it controls, so you can tell genuine quality assurance from a marketing checkbox.",
    ],
    sections: [
      paragraph("Purity is necessary, but not sufficient", "Purity tells you how much of the sample is the intended peptide versus related impurities. It is essential — but it answers only one question. It does not confirm the molecule's identity, whether it is contaminated, or how much actual peptide is in the vial. Treating purity as the whole picture is the most common mistake buyers make."),
      paragraph("HPLC: how pure, not what", "High-performance liquid chromatography (HPLC) separates the components of a sample and quantifies them, producing the purity percentage you see on a COA. It is the workhorse purity test — but it measures proportion, not identity. A sample can be 99% pure and still be 99% of the wrong compound."),
      paragraph("Identity: is it even the right molecule?", "Mass spectrometry confirms the molecule's exact mass matches the intended peptide. This is the test that catches substituted or mislabeled product. Without it, purity is a number with no anchor — you know the sample is consistent, but not that it is what the label claims."),
      paragraph("Sterility and endotoxin: the contamination layer", "Sterility and bioburden testing screen for microbial contamination. Bacterial endotoxin testing (LAL) detects endotoxins — fragments that can survive sterilization and provoke serious reactions at very low levels. These tests matter for anything that will be reconstituted and handled, and they are exactly the layers cut-rate suppliers skip to save cost."),
      paragraph("Heavy metals and net content: the hidden variables", "Heavy-metal screening checks for lead, arsenic, cadmium, and mercury that can carry over from raw materials or synthesis. Net peptide content measures the real amount of peptide versus salts and water — the difference between a vial that delivers its labeled content and one that quietly shorts you. Neither is glamorous, and neither is commonly tested in this market."),
      { ...paragraph("What 'tested' should mean", "A meaningful testing program runs a full panel on every batch, documents it on a lot-matched COA, and re-tests on a regular cadence rather than reusing one certificate for a year. That is the standard your providers should expect — and the proof you should be able to show a patient or auditor."), related: { label: "Put it into practice", links: [readCoa, readQuestions] } },
    ],
    faq: [
      ["Is HPLC purity enough to trust a peptide?", "A purity result addresses one quality attribute. Review the lot-specific evidence for identity, content and relevant contaminants alongside it."],
      ["What is endotoxin (LAL) testing?", "LAL is a method used to detect bacterial endotoxins. The test addresses a different quality attribute from sterility. Review the actual result and the applicable limit on the report."],
    ],
    keepReading: defaultReading,
  },
  [buying]: {
    intro: [
      "Clinics, medical and wellness spas, longevity practices, and functional-medicine offices increasingly source peptides at wholesale. Doing it well means evaluating a supplier the way you would any critical vendor — on quality, verification, fulfillment, and support.",
      "Here is a framework for sourcing wholesale peptides without exposing your practice to quality or compliance risk.",
    ],
    sections: [
      paragraph("Who buys wholesale, and why", "Wholesale buyers are typically established practices that want consistent quality, predictable supply, and the option to present product under their own brand. Buying direct from a manufacturer that tests every batch removes the layers of uncertainty that come with anonymous resellers."),
      { heading: "What to evaluate", list: [
        "Testing depth — a full panel (purity, identity, sterility, endotoxin, heavy metals, net content), not a single purity figure.",
        "Verification — a lot-matched COA with every order, re-tested and re-published regularly.",
        "Manufacturing — synthesis under recognized, documented quality standards.",
        "Fulfillment — reliable lead times and the option to white-label and blind-ship under your brand.",
        "Support — a dedicated account manager and clear policies for issues.",
        "Compliance — explicit physician-use-only positioning.",
      ], related: { label: "Use these guides as you evaluate", links: [readQuestions, readCoa, [testing, "Why Peptide Testing Matters"]] } },
      { ...paragraph("Pricing, minimums, and supply planning", "Understand minimum order quantities and lead times before you commit, and favor suppliers that keep a core catalog in stock so you are not exposed to long backorders. The lowest unit price is rarely the best value once you account for failed tests, inconsistent lots, and unreliable shipping."), related: { label: "Operational guides", links: [readInventory, readStorage] } },
      { ...paragraph("How to get started", "The fastest path is to verify your credentials with a manufacturer that supplies clinics directly, review their testing and COAs, and place a first order against a lot you can independently check. From there, white-label and account support make it easy to scale."), related: { label: "Want your own brand?", links: [readWhiteLabel] } },
    ],
    faq: [
      ["Can clinics buy peptides wholesale?", "Eligibility depends on the specific product, supplier and purchasing arrangement. Have your clinic’s compliance lead review applicable requirements and the supplier’s credentials before ordering."],
      ["What should clinics look for in a wholesale peptide supplier?", "Review who makes and releases the product, what lot-specific documentation you receive, and who handles shipping exceptions and quality complaints."],
    ],
    keepReading: defaultReading,
  },
  [questions]: {
    intro: [
      "The wholesale peptide market is crowded, and the gap between the best and worst suppliers is enormous. The website rarely tells you which is which — the answers to a few direct questions do.",
      "Use this checklist when you evaluate any wholesale peptide supplier for your clinic, spa, or practice.",
    ],
    sections: [
      { heading: "The nine questions", numbered: true, list: [
        "What tests do you run on every batch? Look for more than HPLC purity — identity, sterility, endotoxin, heavy metals, and net peptide content.",
        "Do you provide a lot-matched COA with every order? The certificate should match the exact lot you receive.",
        "How often do you re-test and re-publish COAs? Testing once and reusing the document for a year is a red flag.",
        "How is the product manufactured? Synthesis under recognized, documented quality standards is a meaningful differentiator.",
        "Can you white-label and blind-ship under my brand? Important if you want your clinics to see only your branding.",
        "What are your minimums and lead times? Understand MOQs and how fast orders actually ship.",
        "Who is my point of contact? A dedicated account manager beats a generic support inbox.",
        "How do you handle problems — damaged, delayed, or incorrect orders? Clear policies signal a real operation.",
        "What is your compliance posture? Reputable suppliers are explicit that products are supplied for physician use only.",
      ] },
      { heading: "Why these questions work", paragraphs: [
        "Each question targets a place where weak suppliers cut corners: thin testing, recycled certificates, opaque sourcing, no fulfillment infrastructure, and no accountability. A supplier that answers all nine confidently — with documents to back it up — is a partner you can build a clinic supply chain on.",
        "If a supplier dodges the testing and COA questions, treat that as your answer. Learn how to verify their documentation yourself in our COA guide.",
      ], related: { label: "Go deeper", links: [readCoa, [whiteLabel, "White-Label Peptides: Build Your Own Brand"], readBuying] } },
    ],
    faq: [
      ["What is the most important question to ask a peptide supplier?", "Ask for documentation for the exact lot you would receive. Check which tests are reported and how you can verify that the certificate matches the shipment."],
      ["Should a wholesale supplier offer white-label fulfillment?", "Consider it if your clinic needs its own brand on packaging. Confirm who approves labeling, maintains lot records and handles quality complaints."],
    ],
    keepReading: defaultReading,
    partner: true,
  },
  [coa]: {
    intro: [
      "A Certificate of Analysis (COA) is the lab report that tells you what is actually in a vial. For a clinic, it is the difference between trusting a supplier's word and verifying it. Yet most buyers glance at a single purity number and move on — which is exactly how low-quality product slips into the supply chain.",
      "This guide walks through every section of a peptide COA, what each test proves, and the warning signs that a certificate is hiding more than it shows.",
    ],
    sections: [
      { heading: "What a COA is — and what it is not", paragraphs: [
        "A COA documents the results of laboratory tests run on a specific batch (lot) of product. A trustworthy COA is tied to a lot number, dated, and issued by a qualified analytical lab. It is evidence, not marketing.",
        "What a COA is not: a safety guarantee for human use. All products are supplied for physician use only. A COA verifies identity, purity, and contamination limits — it does not make a product an FDA-approved drug.",
      ] },
      { heading: "The fields that actually matter", paragraphs: ["A strong COA reports more than purity. Here is what to look for and why each one matters:"], list: [
        "HPLC purity — High-performance liquid chromatography measures how much of the sample is the target peptide versus related impurities. Look for a stated percentage (e.g. ≥99%) and the method.",
        "Identity (mass spectrometry) — Confirms the molecule's exact mass matches the intended peptide. Purity means nothing if the molecule is the wrong one.",
        "Net peptide content — The true amount of peptide versus salts and water. Two vials labeled the same can differ significantly in real content; this is where buyers get quietly shorted.",
        "Sterility / bioburden — Screens for microbial contamination, which matters for anything reconstituted and handled in a clinic.",
        "Bacterial endotoxin (LAL) — Detects endotoxins that survive sterilization. Experienced buyers look for this first.",
        "Heavy metals — Screens for lead, arsenic, cadmium, and mercury that can carry over from raw materials.",
      ], afterList: "If you want the science behind why each of these tests exists and what risk it controls, read our companion guide below.", related: { label: "Related reading", links: [[testing, "Why Peptide Testing Matters: HPLC, Sterility & Endotoxin Explained"]] } },
      { heading: "Red flags that should make you pause", list: [
        "No lot number, or a COA that does not match the lot on the vial in your hand.",
        "Only one test (usually HPLC). A single purity number says nothing about contamination or identity.",
        "An old certificate reused for many months — testing once and recycling the document for a year is common and misleading.",
        "No issuing lab, no date, or an unverifiable source.",
        "Vague language instead of numbers and methods.",
      ] },
      { ...paragraph("Match the document to the lot", "The single most useful habit: confirm the lot number on the COA matches the lot number on the vial. A supplier that re-tests each batch and publishes a fresh, lot-matched COA gives your providers a document that always reflects the product actually in hand."), related: { label: "Next steps", links: [[questions, "9 Questions to Ask Before Choosing a Supplier"], readBuying] } },
    ],
    faq: [
      ["What is the most important number on a peptide COA?", "Start with the lot identifier. Once it matches the vial, check each reported result against its own method, units and acceptance criteria."],
      ["How do I know a COA is real?", "Match the lot and product to the shipment, verify the issuing organization through a trusted contact, and ask it to confirm the report number and date when needed."],
    ],
    keepReading: defaultReading,
  },
};
