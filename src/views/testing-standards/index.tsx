import Image from "next/image";
import Link from "next/link";

import { testingStandards as content, testingStandardsPath } from "@/data/testing-standards";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

export const testingStandardsMetadata = generateMetadata({
  title: "Testing Standards | Mint Clinical",
  description: "Explore the Mint Clinical release standards and seven-layer testing protocol.",
  url: testingStandardsPath,
});

const labelClass = "text-utility-label leading-relaxed font-semibold tracking-widest text-accent uppercase";
const descriptionClass = "text-utility-body leading-relaxed text-foreground-muted";
const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

export function TestingStandardsView() {
  return (
    <main className="bg-surface-section px-utility-gutter pb-utility-section">
      <div className="mx-auto max-w-utility-content">
        <header className="border-b border-border-subtle pb-utility-section pt-5">
          <Link href="/" aria-label="Mint Clinical home" className="inline-flex min-h-utility-target items-center rounded-panel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src="/assets/mint-clinical-wordmark.png" width={548} height={175} alt="Mint Clinical" className="h-auto w-utility-logo-compact sm:w-registration-logo" />
          </Link>
          <div className="mt-utility-section grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div className="grid gap-4">
              <p className={labelClass}>{content.eyebrow}</p>
              <h1 className="text-4xl leading-display font-extrabold tracking-tight sm:text-5xl xl:text-6xl">{content.title}</h1>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">{content.introduction}</p>
          </div>
        </header>

        <section aria-labelledby="clinical-standards" className="py-utility-section">
          <h2 id="clinical-standards" className={labelClass}>{content.clinicalTitle}</h2>
          <ul role="list" className="mt-5 grid gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
            {content.clinicalStandards.map(({ title, description }) => (
              <li key={title} className="grid content-start gap-3 bg-surface-section-deep p-5 sm:p-6">
                <h3 className="text-2xl leading-display font-bold sm:text-3xl">{title}</h3>
                <p className={descriptionClass}>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="origin-standards" className="rounded-card border border-border-subtle bg-surface-section-deep p-5 sm:p-8 lg:p-10">
          <h2 id="origin-standards" className={labelClass}>{content.originTitle}</h2>
          <p className="mt-4 max-w-4xl text-xl leading-snug font-medium sm:text-2xl lg:text-3xl">{content.originDescription}</p>
          <ol role="list" className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.originSteps.map(({ title, description }, index) => (
              <li key={title} className="grid content-start gap-2 border-t border-border-subtle pt-4">
                <span className="text-utility-small font-semibold text-accent tabular-nums">{stepNumber(index)}</span>
                <h3 className="text-lg leading-snug font-semibold">{title}</h3>
                <p className={descriptionClass}>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="testing-protocol" className="pt-utility-section">
          <h2 id="testing-protocol" className={labelClass}>{content.protocolTitle}</h2>
          <ol role="list" className="mt-5 border-t border-border-subtle">
            {content.protocol.map(({ title, description }, index) => (
              <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-border-subtle py-5 sm:gap-x-6">
                <span className="font-semibold text-accent tabular-nums">{index + 1}</span>
                <div className="grid gap-2 md:grid-cols-2 md:items-baseline md:gap-6">
                  <h3 className="text-xl leading-snug font-semibold">{title}</h3>
                  <p className={descriptionClass}>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
