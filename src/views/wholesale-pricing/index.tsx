import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import { controlClass, labelClass } from "@/views/register/form-fields";

const title = "Request wholesale pricing";
const description = "Tell us about your practice and what you’d like pricing for.";
const fields = [
  { id: "pricing-name", label: "Full name", type: "text", autoComplete: "name" },
  { id: "pricing-business", label: "Clinic or business name", type: "text", autoComplete: "organization" },
  { id: "pricing-email", label: "Work email", type: "email", autoComplete: "email" },
] as const;

export const wholesalePricingMetadata = {
  ...generateMetadata({
    title: `${title} | Method Clinical`,
    description,
    url: "/wholesale-pricing/",
  }),
  robots: { index: false, follow: true },
};

export function WholesalePricingView() {
  return (
    <main className="bg-surface-section px-utility-gutter pb-utility-section pt-6">
      <div className="mx-auto max-w-registration-content">
        <header className="mb-5 flex flex-col items-center gap-2 text-center">
          <Link href="/" aria-label="Method Clinical home" className="flex min-h-utility-target items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src="/assets/flow-logo.png" width={548} height={175} alt="Method Clinical" className="h-auto w-registration-logo" priority />
          </Link>
          <h1 id="wholesale-pricing-heading" className="text-registration-title leading-display font-extrabold tracking-tight">{title}</h1>
          <p className="text-utility-body text-foreground-muted">{description}</p>
        </header>

        <form aria-labelledby="wholesale-pricing-heading" aria-describedby="pricing-preview" className="flex flex-col gap-3 rounded-card border border-border-subtle bg-surface-section-deep p-4 sm:p-5">
          {fields.map(({ id, label, type, autoComplete }) => (
            <label key={id} htmlFor={id} className={labelClass}>
              {label}
              <input id={id} type={type} autoComplete={autoComplete} className={controlClass} />
            </label>
          ))}
          <label htmlFor="pricing-inquiry" className={labelClass}>
            What would you like pricing for?
            <textarea id="pricing-inquiry" rows={4} className={`${controlClass} resize-y`} />
          </label>
          <Button type="submit" disabled className="mt-1 w-full rounded-panel text-base font-semibold">
            Send pricing request
          </Button>
          <p id="pricing-preview" className="text-center text-utility-small text-foreground-muted">
            Preview only. Use sample details. Entries stay in your browser.
          </p>
        </form>
      </div>
    </main>
  );
}
