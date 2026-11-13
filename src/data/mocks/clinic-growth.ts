/** Copy supplied by the owner. Business claims remain private-review drafts. */
export interface ClinicGrowthContent {
  title: string;
  emphasis: string;
  benefits: readonly string[];
  invitation: string;
  description: string;
  action: { label: string; href: string };
}

export const CLINIC_GROWTH_CONTENT: ClinicGrowthContent = {
  title: "Built for clinics.",
  emphasis: "Backed for growth.",
  benefits: [
    "Scale your practice with confidence",
    "Reliable supply you can build on",
    "Products your patients trust",
    "Documentation your team needs",
    "Support that goes beyond the sale",
  ],
  invitation: "Let’s build something extraordinary together.",
  description: "Your patients. Your reputation. Our commitment. Quality you can prove and a partner you can trust.",
  action: { label: "Register your clinic", href: "/register/" },
};
