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

          <div className="relative isolate mt-5 grid overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep md:min-h-[clamp(28rem,48vw,37rem)]">
            <div className="relative aspect-[16/9] md:absolute md:inset-0 md:-z-20 md:aspect-auto">
              <Image
                src="/assets/testing-standards/field-journal-microscope.webp"
                alt=""
                fill
                preload
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover object-[68%_50%] md:object-center"
              />
            </div>
            <div aria-hidden="true" className={styles.heroShade} />
            <div className="grid content-end justify-items-start gap-4 p-6 sm:p-9 md:max-w-[58%] lg:gap-6 lg:p-16">
              <p className={labelClass}>{content.eyebrow}</p>
              <h1 className="max-w-[10ch] text-5xl leading-display font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                {content.title}
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-foreground-muted lg:text-lg">{content.introduction}</p>
            </div>
          </div>
        </header>

        <section aria-labelledby="clinical-standards" className="grid gap-6 border-t border-border-subtle py-utility-section lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <h2 id="clinical-standards" className={headingClass}>{content.clinicalTitle}</h2>
          <dl className="overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep">
            {content.clinicalStandards.map(({ title, description }) => (
              <div key={title} className="grid gap-2 px-5 py-5 not-first:border-t not-first:border-border-subtle sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-baseline sm:gap-5 sm:px-7">
                <dt className="text-xl leading-snug font-bold tracking-tight text-accent">{title}</dt>
                <dd className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="origin-standards" className="rounded-card border border-border-subtle bg-surface-section-deep bg-linear-to-br from-accent/10 to-transparent p-6 sm:p-9 lg:p-12">
          <h2 id="origin-standards" className="max-w-2xl text-balance text-2xl leading-display font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.originTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground-muted sm:text-lg">{content.originDescription}</p>
          <ol role="list" className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {content.originSteps.map(({ title, description }, index) => (
              <li key={title} className="grid content-start gap-2 border-t border-accent/25 pt-4">
                <span aria-hidden="true" className="font-mono text-utility-small font-semibold text-accent tabular-nums">{stepNumber(index)}</span>
                <h3 className="text-lg leading-snug font-semibold">{title}</h3>
                <p className="text-utility-body leading-relaxed text-foreground-muted">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="testing-protocol" className="grid gap-6 pt-utility-section lg:gap-8">
          <h2 id="testing-protocol" className={headingClass}>{content.protocolTitle}</h2>
          <div className="overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep">
            <div className="relative aspect-video overflow-hidden sm:aspect-[3/1]">
              <Image
                src="/assets/testing-standards/field-journal-optical-cells.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover object-center"
              />
            </div>
            <ol role="list" className="grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
              {content.protocol.map(({ title, description }, index) => (
                <li key={title} className="grid content-start gap-3 bg-surface-section-deep p-5 last:bg-surface-section sm:p-6 sm:last:col-span-full lg:gap-4 lg:p-8">
                  <span aria-hidden="true" className="font-mono text-utility-small font-semibold text-accent tabular-nums">{stepNumber(index)}</span>
                  <div className="grid gap-2">
                    <h3 className="text-lg leading-snug font-semibold tracking-tight sm:text-xl">{title}</h3>
                    <p className="max-w-xl text-base leading-relaxed text-foreground-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
