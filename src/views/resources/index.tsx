import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RESOURCES, resourcePath } from "@/data/resources";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

import styles from "./resources.module.css";

const description = "Guides for clinic teams on quality documentation, supplier review, receiving and inventory.";
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const backClass = `inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline ${focusClass}`;

export const resourcesMetadata = generateMetadata({
  title: "Resources | Mint Clinical",
  description,
  url: "/resources/",
});

export function ResourcesView() {
  return (
    <main className={`${styles.page} relative bg-surface-section px-utility-gutter pb-utility-section text-foreground`}>
      <div className="mx-auto max-w-utility-content">
        <Link href="/" className={backClass}><ArrowLeft size={16} aria-hidden="true" /> Mint Clinical home</Link>
        <header className={`${styles.indexHeader} mx-auto text-center`}>
          <p className="text-utility-small font-semibold text-accent">Resources</p>
          <h1 className={`${styles.headline} text-balance font-bold tracking-tight`}>Guides for clinics and wholesale buyers</h1>
          <p className={`${styles.intro} ${styles.indexIntro} text-pretty text-foreground-muted`}>{description}</p>
        </header>
        <ul role="list" className={`${styles.grid} grid md:grid-cols-2 xl:grid-cols-3`}>
          {RESOURCES.map((guide) => (
            <li key={guide.slug}>
              <Link href={resourcePath(guide.slug)} className={`${styles.card} group flex h-full flex-col rounded-card border border-border-subtle bg-surface-section-deep hover:border-accent ${focusClass}`}>
                <p className="text-utility-small font-semibold text-accent">{guide.category}</p>
                <h2 className={`${styles.cardTitle} font-bold tracking-tight`}>{guide.title}</h2>
                <p className={`${styles.summary} text-utility-body text-pretty text-foreground-muted`}>{guide.summary}</p>
                <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 text-utility-small font-semibold text-accent group-hover:underline">Read guide <ArrowUpRight size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export function ResourceArticleView({ guide }: { guide: (typeof RESOURCES)[number] }) {
  return (
    <main className={`${styles.page} relative bg-surface-section px-utility-gutter pb-utility-section text-foreground`}>
      <article className="mx-auto max-w-policy-content">
        <Link href="/resources/" className={backClass}><ArrowLeft size={16} aria-hidden="true" /> All resources</Link>
        <header className={`${styles.articleHeader} border-b border-border-subtle`}>
          <p className="text-utility-small font-semibold text-accent">{guide.category}</p>
          <h1 className={`${styles.headline} text-balance font-bold tracking-tight`}>{guide.title}</h1>
          <p className={`${styles.intro} text-pretty text-foreground-muted`}>{guide.summary}</p>
        </header>
        <div className={`${styles.articleBody} grid`}>
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-utility-section-title font-bold leading-snug">{section.title}</h2>
              <p className={`${styles.articleParagraph} text-utility-body text-foreground-muted`}>{section.body}</p>
            </section>
          ))}
        </div>
        {guide.sources && (
          <section className="border-t border-border-subtle pt-6">
            <h2 className="text-lg font-bold">Sources</h2>
            <ul className="mt-2 grid gap-1">
              {guide.sources.map(({ href, label }) => <li key={href}><a href={href} className={`inline-flex min-h-11 items-center text-accent underline underline-offset-4 ${focusClass}`}>{label}</a></li>)}
            </ul>
          </section>
        )}
        <Link href="/resources/" className={`${backClass} mt-8`}><ArrowLeft size={16} aria-hidden="true" /> All resources</Link>
      </article>
    </main>
  );
}
