import { ArrowDown, Building2, ClipboardCheck, FlaskConical, MapPin, ShieldCheck } from "lucide-react";
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

const standardsIcons = new Map([
  ["503B", Building2],
  ["cGMP", ClipboardCheck],
  ["ISO 14644", ShieldCheck],
  ["ISO 17025", FlaskConical],
  ["Made in America", MapPin],
]);

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
            <Image src="/assets/mint-clinical-wordmark-accent.png" width={548} height={175} alt="Mint Clinical" className="h-auto w-utility-logo-compact sm:w-registration-logo" />
          </Link>

          <div className={styles.hero}>
            <div className={styles.heroGrid} aria-hidden="true" />
            <div className={styles.heroHorizon} aria-hidden="true" />
            <div className={styles.heroContent}>
              <p className={`${labelClass} rounded-full border border-accent/25 bg-surface-section-deep px-4 py-2`}>{content.eyebrow}</p>
              <h1 className={styles.heroTitle}>{content.title}</h1>
              <p className="hidden max-w-2xl text-base leading-relaxed text-foreground-muted sm:block sm:text-lg">{content.introduction}</p>
              <a
                href="#testing-protocol"
                className="mt-2 inline-flex min-h-utility-target items-center gap-2 rounded-panel border border-accent/55 bg-surface-section-deep px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Explore the seven layers
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </header>

        <section aria-labelledby="clinical-standards" className="grid gap-8 border-t border-border-subtle pt-utility-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-14">
          <div className={styles.standardsPanel}>
            <Image
              src="/assets/testing-standards/clinical-lab-autosampler.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className={styles.standardsImage}
            />
            <div className="relative z-10 grid justify-items-center gap-5 text-center sm:gap-7">
              <FlaskConical aria-hidden="true" className="size-9 sm:size-11" strokeWidth={1.6} />
              <h2 id="clinical-standards" className="max-w-[13ch] text-balance text-3xl leading-display font-bold tracking-tight sm:text-4xl lg:text-5xl">{content.clinicalTitle}</h2>
            </div>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:gap-y-12">
            {content.clinicalStandards.map(({ title, description }) => {
              const Icon = standardsIcons.get(title) ?? ShieldCheck;
              return (
                <div key={title} className="group grid min-w-0 content-start gap-3 sm:gap-4 sm:last:col-span-2 sm:last:justify-items-center sm:last:text-center">
                  <dt className="grid gap-3 text-xl leading-snug font-bold tracking-tight sm:gap-4 sm:text-2xl sm:group-last:justify-items-center">
                    <Icon aria-hidden="true" className="size-7 text-accent sm:size-8" strokeWidth={1.6} />
                    {title}
                  </dt>
                  <dd className="max-w-prose text-base leading-relaxed text-foreground-muted sm:text-lg">{description}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section aria-labelledby="testing-protocol" className="pt-utility-section">
          <h2 id="testing-protocol" className={`${headingClass} mx-auto max-w-3xl scroll-mt-8 text-center`}>{content.protocolTitle}</h2>

          <figure className={styles.vialDisplay}>
            <div className={styles.vial}>
              <Image
                src="/assets/mint-testing-nad-body-flow.webp"
                alt="Mint Clinical NAD+ vial"
                width={584}
                height={1057}
                sizes="(min-width: 768px) 148px, 99px"
                className={styles.vialBody}
              />
              <Image
                src="/assets/mint-testing-nad-cap.webp"
                alt=""
                width={536}
                height={338}
                sizes="(min-width: 768px) 136px, 91px"
                className={styles.vialCap}
              />
            </div>
          </figure>

          <ol role="list" className={styles.testGrid}>
            {content.protocol.map(({ title, description }, index) => (
              <li key={title}>
                <h3 className="flex items-baseline gap-3 text-lg leading-snug font-semibold tracking-tight sm:text-xl">
                  <span aria-hidden="true" className="shrink-0 font-mono text-utility-small font-semibold text-accent tabular-nums">{stepNumber(index)}</span>
                  {title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground-muted">{description}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
