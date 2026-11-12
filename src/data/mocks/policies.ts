/** Private review drafts. Order-specific rules need approval before checkout opens. */
export const POLICIES_CONTENT = {
  title: "Policies & information",
  intro: "Wholesale purchasing, shipping, returns, and professional use at Method Clinical.",
  notice: "Private review draft. This site does not accept orders or payments. Final terms and operating policies will be provided before ordering opens.",
  sections: [
    {
      id: "shipping",
      title: "Shipping information",
      topics: [
        { heading: "Processing and tracking", body: "Our planned processing time is one to two business days after an order is accepted. Processing time is separate from transit time. Tracking is provided once the order ships. Confirm availability and timing before relying on a delivery date." },
        { heading: "Delivery and temperature-sensitive shipments", body: "Orders are planned to ship from the United States, with temperature-controlled packaging where the product requires it. Eligible destinations, carrier services, charges, dispatch cutoffs, and holiday schedules will be confirmed before ordering opens." },
        { heading: "Address and delivery problems", body: "Check that the delivery address and recipient details are complete before placing an order. If a shipment is delayed, lost, misdelivered, or arrives with damaged packaging or signs of a temperature excursion, retain the tracking and package details and contact order support. Do not use affected items while their condition is being reviewed." },
        { heading: "Shipment delays", body: "When an accepted order cannot ship as stated, Method Clinical will communicate the revised timing and provide any delay options, cancellation rights, or refunds required by applicable law." },
      ],
    },
    {
      id: "terms",
      title: "Terms of Service",
      topics: [
        { heading: "Scope and account eligibility", body: "Method Clinical is a wholesale supplier for licensed providers and other qualified professional purchasers. A representative applying on behalf of a practice must have authority to act for it. Account approval may require verification of professional credentials, business information, and eligibility for the products requested. The current preview does not verify credentials or create accounts." },
        { heading: "Orders, pricing, and payment", body: "An order request does not guarantee acceptance or availability. Confirm the product, quantity, price, taxes, delivery charges, and payment terms in the order confirmation before relying on them. Method Clinical may decline orders where eligibility, safety, availability, or compliance requirements are not met. No payments are accepted in this preview." },
        { heading: "Product information and buyer responsibilities", body: "Use the product-specific label, handling instructions, and lot documentation when evaluating a shipment. Purchasers are responsible for maintaining the credentials and procedures required for their intended activities. Site content provides general wholesale information and does not establish a practitioner-patient relationship or provide medical advice." },
        { heading: "Related policies and final agreement", body: "Review the shipping, refund and return, and professional-use sections on this page and the separate Privacy notice. The contracting entity, payment and cancellation terms, transfer of risk, and dispute provisions will be confirmed in the final agreement before orders are accepted." },
      ],
    },
    {
      id: "returns",
      title: "Refund & return policy",
      topics: [
        { heading: "Inspect your order", body: "Check the shipment promptly against the order confirmation. If an item is missing, incorrect, damaged, defective, or shows signs of a temperature excursion, separate the affected items and retain the original packaging and lot information while the issue is reviewed." },
        { heading: "Report a problem", body: "Provide the order number, delivery date, affected items and lot numbers, a description of the issue, and clear photos where helpful. Wait for written instructions before returning, discarding, or shipping affected items. The order-support channel and reporting deadline will be provided before ordering opens." },
        { heading: "Return eligibility and resolution", body: "Product integrity and storage history matter when assessing a return. Opened, used, temperature-sensitive, or custom items may be ineligible for discretionary returns. Method Clinical will confirm the final eligibility rules, claim window, and available remedies before accepting orders. Any rights or remedies that cannot lawfully be waived still apply." },
      ],
    },
    {
      id: "professional-use",
      title: "For physician use only",
      topics: [
        { heading: "Wholesale access", body: "Products are supplied exclusively to licensed practitioners, clinics, and other qualified purchasers. The general public cannot purchase through this site. Eligibility to purchase does not establish that a product is suitable or authorized for a particular use." },
        { heading: "Product status and intended use", body: "These products have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease. Review each product’s label and lot documentation. The website does not provide patient-specific instructions, dosing recommendations, or medical advice." },
        { heading: "Handling and distribution", body: "Qualified purchasers are responsible for meeting applicable requirements for receipt, storage, handling, distribution, and disposal. Do not use products with broken seals, uncertain storage history, or discrepancies between the label and the order. Do not distribute products to unqualified purchasers." },
      ],
    },
  ],
} as const;
