/** Owner-supplied FAQ copy, adapted to Method Clinical and the current access flow. */
export interface FaqItem {
  question: string;
  answer: string;
  action?: { label: string; href: string };
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  items: readonly FaqItem[];
}

export const FAQ_CONTENT: FaqContent = {
  eyebrow: "Questions clinics ask",
  title: "Frequently asked",
  emphasis: "questions.",
  description: "Everything a clinic, spa, or wholesale buyer needs to know before ordering.",
  items: [
    {
      question: "Is Method Clinical a wholesale peptide supplier for clinics?",
      answer: "Yes. Method Clinical supplies peptides at wholesale to licensed clinics, medical and wellness spas, longevity and functional-medicine practices, and provider groups. We offer direct wholesale ordering for verified providers and white-label fulfillment for resellers.",
    },
    {
      question: "Are your peptides third-party tested, and do you provide a COA?",
      answer: "Every batch goes through a seven-layer testing panel — HPLC purity (≥99%), mass spectrometry identity, sterility/bioburden, bacterial endotoxin (LAL), heavy metals, and net peptide content. A lot-matched Certificate of Analysis (COA) ships with every order, and we re-test each SKU and publish a fresh COA one to two times per month so the document always matches the lot in hand.",
    },
    {
      question: "How do I get wholesale pricing or apply for an account?",
      answer: "For wholesale pricing and ordering, clinics and licensed providers can request an account and provide their NPI for verification. Businesses that want their own branded storefront can apply to become a white-label partner. Use Provider Access to start your request.",
      action: { label: "Register your clinic", href: "/register/" },
    },
    {
      question: "How are your peptides made?",
      answer: "Our peptides use pharmaceutical-grade active ingredient and are finished in an ISO-class cleanroom environment, then tested before any vial leaves the facility.",
    },
    {
      question: "Do you offer white-label or private-label peptides?",
      answer: "Yes. We custom-label vials, cartons, and inserts in your branding and blind-ship every order directly to your clinics — your customer never sees us. You set your own pricing and keep the margin while we handle manufacturing, labeling, fulfillment, and logistics.",
    },
    {
      question: "How fast do wholesale orders ship?",
      answer: "Orders are typically processed within one to two business days and ship from our U.S. facility, with cold-chain packaging where appropriate. Tracking is provided when your order ships.",
    },
    {
      question: "Who can purchase these products?",
      answer: "For physician use only. Products are supplied exclusively to licensed practitioners, clinics, and qualified purchasers — not to the general public. They have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.",
    },
    {
      question: "What makes Method Clinical different from other peptide suppliers?",
      answer: "Most suppliers run a single purity test and reuse one certificate for a year. Method Clinical runs a full seven-layer panel on every batch, publishes a fresh lot-matched COA one to two times per month, and offers white-label fulfillment with a dedicated account manager — the proof and support clinics need from a wholesale partner.",
    },
  ],
};
