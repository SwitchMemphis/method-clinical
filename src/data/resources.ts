type Resource = {
  slug: string;
  category: "Operations" | "Wholesale Buying" | "Quality & Testing";
  title: string;
  summary: string;
  image: string;
  sections: { title: string; body: string }[];
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
    title: "A practical inventory plan for clinics",
    summary: "Build a purchasing rhythm around actual usage, lead times and the stock your clinic can release.",
    sections: [
      { title: "Count what is actually available", body: "Start with a weekly count by item and lot. Record the date received, labeled expiration or beyond-use date, and whether stock is available, reserved or on hold. Exclude stock awaiting a documentation or receiving decision from your available total." },
      { title: "Base reorders on your own records", body: "Review recent usage and the time between placing an order and receiving it. Set the reorder point around expected usage during that lead time plus a buffer that reflects real variability. Review the buffer after missed deliveries or changes in demand instead of carrying the same quantity indefinitely." },
      { title: "Give each exception an owner", body: "Assign a person to review near-dated stock, discrepancies and shipment delays. Put orders and holds in one shared record so two people cannot accidentally reorder the same stock or release a lot under review. Compare expired inventory, emergency orders and stockouts at the end of each month." },
    ],
  },
  {
    slug: "private-label-fulfillment",
    image: "/assets/testing-standards/optical-bench.webp",
    category: "Wholesale Buying",
    title: "What to establish before private-label fulfillment",
    summary: "Define what your clinic owns, what the fulfillment partner owns and how both sides trace a lot.",
    sections: [
      { title: "Define responsibilities before artwork", body: "Write down who supplies the product, who prepares and approves the label, who retains batch records, and who receives quality complaints. Keep the brand design and the required labeling information in the same approval workflow." },
      { title: "Test traceability end to end", body: "Ask the partner to walk through a sample shipment record. Confirm the order can be connected to the exact lot, the released label version and the relevant documentation. Ask how corrections are recorded if a shipment is split or a lot changes after the order is placed." },
      { title: "Agree on what happens after shipment", body: "Document who contacts affected clinics if stock is placed on hold or recalled, who can retrieve records, and what happens to branded packaging when the relationship ends. Have qualified counsel review the proposed arrangement and labeling before committing to a launch." },
    ],
  },
  {
    slug: "storage-and-receiving",
    image: "/assets/mobile-hero-lab-vials.webp",
    category: "Operations",
    title: "Receiving and storage checks for clinic teams",
    summary: "Create a repeatable receiving process with clear records, handling instructions and a path for exceptions.",
    sections: [
      { title: "Collect instructions before the delivery", body: "Obtain the applicable label and written handling instructions for the specific item. Make them accessible to the receiving team so staff can confirm the required conditions at delivery and route the shipment promptly." },
      { title: "Record the shipment as received", body: "Check the shipment against the order, record the lots and dates, and inspect seals and packaging. Preserve any condition-monitoring records provided with the shipment and flag missing information or discrepancies for review." },
      { title: "Hold questionable stock for review", body: "Keep affected stock out of available inventory if the shipment is damaged or its conditions are uncertain. Document the observed issue and ask the supplier or the clinic’s designated quality lead for a documented disposition before releasing it." },
    ],
  },
  {
    slug: "what-quality-tests-show",
    image: "/assets/testing-standards/field-journal-microscope.webp",
    category: "Quality & Testing",
    title: "What a peptide testing panel actually tells you",
    summary: "Read purity, identity, sterility and endotoxin results as separate pieces of evidence.",
    sections: [
      { title: "Start with what the result measures", body: "A chromatographic purity result describes a sample under the method used. An identity result answers a different question. Read the method, reporting basis and acceptance criteria for each line before comparing two reports or interpreting a percentage." },
      { title: "Read sterility and endotoxin separately", body: "A sterility result and a bacterial endotoxin result address different quality questions. Look for both the reported finding and the applicable limit or decision on the lot documentation. Ask the supplier to explain ambiguous results or missing fields in writing." },
      { title: "Match the panel to the shipment", body: "Confirm the report covers the lot and material represented on the label. Record which results are available, which questions remain open and who reviewed the documentation. A result is most useful when the clinic can trace it back to the stock it received." },
    ],
    sources: [
      { label: "FDA guidance on validation of analytical procedures", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r2-validation-analytical-procedures" },
      { label: "FDA guidance on pyrogen and endotoxins testing", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/pyrogen-and-endotoxins-testing-questions-and-answers" },
    ],
  },
  {
    slug: "wholesale-buying-guide",
    image: "/assets/clinic-growth-analytical-lab.webp",
    category: "Wholesale Buying",
    title: "A clinic’s guide to reviewing wholesale suppliers",
    summary: "Compare supplier documentation, responsibilities and receiving terms before placing an order.",
    sections: [
      { title: "Identify every organization in the chain", body: "Request the legal names and roles of the seller, manufacturer or compounder, testing laboratory and shipper. Ask which entity is responsible for release documentation and complaints. FDA facility registration does not establish that FDA approved a specific product or found the facility compliant." },
      { title: "Compare the records you will actually receive", body: "Ask for a representative lot record and confirm what paperwork accompanies a shipment. Compare suppliers using the same fields, including lot identification, test methods, dates and responsible contacts. Record gaps and resolve them before approving a supplier." },
      { title: "Review the commercial and receiving terms together", body: "Check lead times, minimum orders, returns, documentation access and how the supplier handles a delayed or damaged shipment. Have the clinic’s qualified team evaluate whether the proposed products and purchasing arrangement are appropriate before ordering." },
    ],
    sources: [registration, compounding],
  },
  {
    slug: "supplier-due-diligence-questions",
    image: "/assets/testing-standards/optical-glass.webp",
    category: "Wholesale Buying",
    title: "Nine questions for a supplier due-diligence call",
    summary: "Use the same questions for every prospective supplier so your clinic can compare written answers.",
    sections: [
      { title: "1–3. Establish who is responsible", body: "1. What is the legal name of the entity invoicing the clinic? 2. Who makes, tests and releases each lot? 3. What documentation supports the role each organization claims?" },
      { title: "4–6. Establish what the records show", body: "4. Can you share a representative certificate of analysis and its reporting limits? 5. How will our team match the certificate to the shipment? 6. Who answers technical questions if a result is missing, unclear or outside a stated limit?" },
      { title: "7–9. Establish what happens when something changes", body: "7. How will you communicate a product or labeling change? 8. Who handles discrepancies or condition concerns upon delivery? 9. How will our clinic be notified of a hold or recall, and what records will be available to identify affected lots?" },
    ],
    sources: [registration],
  },
  {
    slug: "reading-a-certificate-of-analysis",
    image: "/assets/testing-standards/field-journal-optical-cells.webp",
    category: "Quality & Testing",
    title: "How to review a certificate of analysis",
    summary: "Match the document to the shipment, interpret the result columns and flag missing evidence.",
    sections: [
      { title: "Verify the document belongs to the lot", body: "Compare the product description and lot identifier with the shipment. Check the issuing organization, report date and any revision number. Ask for clarification if the certificate covers a different material or the lot number differs from the label." },
      { title: "Read the result and the criterion together", body: "For each test, check the method, units, reported result and acceptance criterion. Determine whether the report identifies the material tested and whether a qualitative result is explained. Record missing information as an open question instead of treating a blank field as a passing result." },
      { title: "Keep an auditable review record", body: "File the certificate alongside the shipment record. Record who reviewed it, when, and any questions sent to the issuing organization. Route discrepancies to the designated reviewer and retain the response with the original documentation." },
    ],
    sources: [{ label: "FDA guidance on validation of analytical procedures", href: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r2-validation-analytical-procedures" }],
  },
];

export const resourcePath = (slug: string) => `/resources/${slug}/`;
