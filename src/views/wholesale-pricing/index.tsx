import Image from "next/image";
import Link from "next/link";

import { generateMetadata } from "@/utils/seo/generate-page-metadata";

import { WholesalePricingForm } from "./wholesale-pricing-form";

const title = "Request wholesale pricing";
const description = "Tell us about your practice and what you’d like pricing for.";

export const wholesalePricingMetadata = {
  ...generateMetadata({
    title: `${title} | Mint Clinical`,
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
          <Link href="/" aria-label="Mint Clinical home" className="flex min-h-utility-target items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src="/assets/mint-clinical-wordmark-accent.png" width={548} height={175} alt="Mint Clinical" className="h-auto w-registration-logo" priority />
          </Link>
          <h1 id="wholesale-pricing-heading" className="text-registration-title leading-display font-extrabold tracking-tight">{title}</h1>
          <p className="text-utility-body text-foreground-muted">{description}</p>
        </header>

        <WholesalePricingForm />
      </div>
    </main>
  );
}
