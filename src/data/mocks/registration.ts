export const REGISTRATION_CONTENT = {
  title: "Provider account request",
  description: "Tell us about your practice to request a Mint Clinical wholesale account.",
  eligibility: "For clinics and licensed providers.",
  helper: "Preview only. Use sample details.",
  desktopHelper: "Fields marked * are required. Please use sample details in this preview.",
  preview: "Preview only. Applications are not sent and NPI verification is not connected.",
  review: "Submit application & verify NPI",
  reviewTitle: "Application preview",
  reviewNotice: "Not submitted. These details are shown for review only. No account has been created and no NPI has been verified.",
  steps: ["Contact information", "Business profile", "Business address", "Referral", "Additional notes"],
  types: ["Med spa", "Medical clinic", "Wellness center", "Physician office", "Pharmacy", "Gym / fitness", "Research lab", "Other"],
  states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AS", "GU", "MP", "PR", "VI"],
} as const;

export interface RegistrationField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  title?: string;
  inputMode?: "numeric" | "tel";
  maxLength?: number;
  full?: boolean;
}

export const CONTACT_FIELDS: readonly RegistrationField[] = [
  { name: "firstName", label: "First name", autoComplete: "given-name", required: true },
  { name: "lastName", label: "Last name", autoComplete: "family-name", required: true },
  { name: "suffix", label: "Suffix", placeholder: "MD, DO, NP…", autoComplete: "honorific-suffix" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "US phone number", autoComplete: "tel", required: true, pattern: "[0-9+\\(\\) .\\-]{7,25}", title: "Enter a phone number, including the area code." },
  { name: "email", label: "Work email", type: "email", placeholder: "you@clinic.com", autoComplete: "email", required: true, full: true },
];
export const CREDENTIAL_FIELDS: readonly RegistrationField[] = [
  { name: "website", label: "Website", type: "url", placeholder: "https://", autoComplete: "url", full: true },
  { name: "npi", label: "NPI number", required: true, placeholder: "10-digit NPI", pattern: "[0-9]{10}", title: "Enter a 10-digit NPI number. This preview does not verify it.", inputMode: "numeric", maxLength: 10 },
  { name: "license", label: "State license number" },
  { name: "dea", label: "DEA registration number", full: true },
];
