import Image from "next/image";
import Link from "next/link";

import { testingStandards as content, testingStandardsPath } from "@/data/testing-standards";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

import styles from "./protocol.module.css";

export const testingStandardsMetadata = generateMetadata({
  title: "Testing Standards | Mint Clinical",
  description: "Explore the Mint Clinical release standards and the seven-layer testing protocol.",
  url: testingStandardsPath,
});

const labelClass = "text-utility-label leading-relaxed font-semibold tracking-widest text-accent uppercase";
const headingClass = "text-balance text-3xl leading-display font-bold tracking-tight sm:text-4xl lg:text-5xl";
const descriptionClass = "text-utility-body leading-relaxed text-foreground-muted";
const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

export function TestingStandardsView() {
  return (
    <main className="bg-surface-section px-utility-gutter pb-utility-section">
      <div className="mx-auto max-w-utility-content">
        <header className="pb-utility-section pt-5">
          <Link
            href="/"
            aria-label="Mint Clinical home"
            className="inline-flex min-h-utility-target items-center rounded-panel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Image src="/assets/mint-clinical-wordmark.png" width={548} height={175} alt="Mint Clinical" className="h-auto w-utility-logo-compact sm:w-registration-logo" />
          </Link>

          <div className="mt-5 grid overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="flex flex-col justify-center gap-5 bg-radial-[at_0%_0%] from-accent/10 to-transparent p-6 sm:p-9 lg:p-12 xl:p-14">
              <p className={labelClass}>{content.eyebrow}</p>
              <h1 className="max-w-xs text-4xl leading-display font-extrabold tracking-tight sm:max-w-sm sm:text-5xl lg:text-6xl xl:text-7xl">
                {content.title}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-foreground-muted lg:text-lg">{content.introduction}</p>
            </div>
            <div className="relative aspect-video overflow-hidden bg-surface-section md:aspect-auto">
              <Image
                src="/assets/testing-standards/optical-bench.webp"
                alt=""
                fill
                preload
                sizes="(min-width: 1280px) 655px, (min-width: 768px) 54vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </header>

        <section aria-labelledby="clinical-standards" className="grid gap-6 border-t border-border-subtle py-utility-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <h2 id="clinical-standards" className={headingClass}>{content.clinicalTitle}</h2>
          <ul role="list" className="grid gap-2 sm:grid-cols-2">
            {content.clinicalStandards.map(({ title, description }) => (
              <li key={title} className="grid content-start gap-3 rounded-panel border border-border-subtle bg-surface-section-deep p-5 sm:p-6 lg:p-7">
                <h3 className="text-2xl leading-display font-bold tracking-tight text-accent sm:text-3xl">{title}</h3>
                <p className={descriptionClass}>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="origin-standards" className="rounded-card border border-border-subtle bg-surface-section-deep bg-linear-to-br from-accent/10 to-transparent p-6 sm:p-9 lg:p-12">
          <h2 id="origin-standards" className="max-w-2xl text-balance text-2xl leading-display font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.originTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground-muted sm:text-lg">{content.originDescription}</p>
          <ol role="list" className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {content.originSteps.map(({ title, description }, index) => (
              <li key={title} className="grid content-start gap-2 border-t border-accent/25 pt-4">
                <span aria-hidden="true" className="font-mono text-utility-small font-semibold text-accent tabular-nums">{stepNumber(index)}</span>
                <h3 className="text-lg leading-snug font-semibold">{title}</h3>
                <p className={descriptionClass}>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="testing-protocol" className="grid gap-6 pt-utility-section lg:gap-8">
          <h2 id="testing-protocol" className={headingClass}>{content.protocolTitle}</h2>
          <ol role="list" className={styles.protocol}>
            {content.protocol.map(({ title, description }, index) => (
              <li key={title} className={styles.layer}>
                <div aria-hidden="true" className={styles.optic}>
                  <span className={styles.plate} />
                  <span className={styles.number}>{stepNumber(index)}</span>
                </div>
                <div className={styles.copy}>
                  <h3 className="text-lg leading-snug font-semibold tracking-tight sm:text-xl">{title}</h3>
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
