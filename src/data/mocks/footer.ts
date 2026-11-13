/** Content adapted from the owner's footer references and approved site FAQ. */
const terms = { label: "Terms of Service", href: "/policies/#terms" } as const;

export const FOOTER_CONTENT = {
  descriptor: "Wholesale supply for licensed providers.",
  shippingTitle: "Shipping",
  shipping: "Typically processed in 1–2 business days. Tracking is provided when your order ships.",
  contactTitle: "Contact",
  contact: "For clinic, practice and wholesale inquiries.",
  contactLinks: [
    { label: "Register your clinic", href: "/register/" },
    { label: "Sign in", href: "/login/" },
  ],
  legalTitle: "Legal & resources",
  legalLinks: [
    { label: "Resources", href: "/resources/" },
    { label: "Privacy notice", href: "/privacy-policy/" },
    terms,
    { label: "Refund & return policy", href: "/policies/#returns" },
    { label: "Shipping information", href: "/policies/#shipping" },
    { label: "Professional use", href: "/policies/#professional-use" },
  ],
  promise: "Your practice. Our commitment.",
  noticeTitle: "For physician use only.",
  notice: "Products are supplied exclusively to licensed practitioners, clinics, and qualified purchasers. They have not been evaluated by the FDA and are not intended to diagnose, treat, cure or prevent any disease.",
  purchaseNotice: "By purchasing, you certify that you are a licensed practitioner or otherwise qualified purchaser and agree to our",
  terms,
  contactPlaceholders: ["[Business address]", "[Business phone]", "[Business email]"],
  preview: "Private design preview",
} as const;
