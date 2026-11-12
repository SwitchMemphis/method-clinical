import type { LegalSection } from "@/views/legal/legal-document";

export const LEGAL_UPDATED = "Private review draft";

export const privacyPolicy: {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
} = {
  title: "Privacy notice",
  intro: "This notice explains how Mint Clinical handles information on this website preview.",
  sections: [
    {
      heading: "Information entered in preview forms",
      body: [
        "Provider Access submissions are disabled. The clinic registration form previews sample details in your browser. The form does not submit or store applications or selected files, verify NPIs, or create accounts.",
        "The on-site wholesale pricing form is a preview. Entries stay in your browser and are not submitted to Mint Clinical.",
        "Please use sample information. Do not enter patient records, real credentials, payment details, or other sensitive information into the preview.",
      ],
    },
    {
      heading: "Site access and browser preferences",
      body: [
        "Access to the private preview is managed by the hosting platform. The website saves your cookie preference in browser storage when you make a selection. You can clear saved preferences in your browser.",
        "This preview does not include a checkout or connect the forms to a payment, credential verification, email marketing, or SMS service.",
      ],
    },
    {
      heading: "Wholesale accounts and order information",
      body: [
        "If online accounts and ordering are enabled, information needed for the service may include business contact details, professional eligibility information, shipping details, order records, and support communications. The final notice will identify which information is actually collected, why it is needed, and who receives it.",
      ],
    },
    {
      heading: "Privacy choices and contact",
      body: [
        "Before collecting live account or order information, Mint Clinical will publish its privacy contact and explain the applicable retention practices, service providers, tracking choices, and how to submit a privacy request.",
      ],
    },
  ],
};
