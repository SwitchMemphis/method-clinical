import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArrowFillButton } from "@/components/ui/arrow-fill-button";
import { BlogsSection } from "@/components/ui/blogs-3";
import { RESOURCE_ARTICLES } from "@/data/resource-articles";
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
        <header className={styles.indexHeader}>
          <p className="text-utility-small font-semibold text-accent">Resources</p>
          <h1 className={`${styles.headline} text-balance font-bold tracking-tight`}>Guides for clinics and wholesale buyers</h1>
          <p className={`${styles.intro} text-pretty text-foreground-muted`}>{description}</p>
        </header>
        <BlogsSection
          articles={RESOURCES.map(({ slug, category, title, summary, image }) => ({
            category,
            title,
            summary,
            image,
            href: resourcePath(slug),
          }))}
        />
      </div>
    </main>
  );
}

export function ResourceArticleView({ guide }: { guide: (typeof RESOURCES)[number] }) {
  const article = RESOURCE_ARTICLES[guide.slug];
  const relatedGuides = article.keepReading.map((slug) => RESOURCES.find((resource) => resource.slug === slug)!);

  return (
    <main className={`${styles.page} relative bg-surface-section px-utility-gutter pb-utility-section text-foreground`}>
      <article className="mx-auto max-w-policy-content">
        <Link href="/resources/" className={backClass}><ArrowLeft size={16} aria-hidden="true" /> All resources</Link>
        <nav aria-label="Breadcrumb" className="mt-4">
          <ol className="flex flex-wrap items-center gap-2 text-utility-small text-foreground-muted">
            <li><Link href="/" className={backClass}>Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/resources/" className={backClass}>Resources</Link></li>
            <li aria-hidden="true">›</li>
            <li>{guide.category}</li>
          </ol>
        </nav>
        <header className={`${styles.articleHeader} border-b border-border-subtle`}>
          <p className="text-utility-small font-semibold text-accent">{guide.category} · {guide.readTime} min read</p>
          <h1 className={`${styles.headline} text-balance font-bold tracking-tight`}>{guide.title}</h1>
          {article.intro.map((paragraph) => (
            <p key={paragraph} className={`${styles.intro} text-pretty text-foreground-muted`}>{paragraph}</p>
          ))}
          {guide.imageAlt && (
            <Image
              src={guide.image}
              alt={guide.imageAlt}
              width={1440}
              height={810}
              className="mt-6 h-auto w-full rounded-card"
            />
          )}
        </header>
        <div className={`${styles.articleBody} grid`}>
          {article.sections.map(({ heading, paragraphs, list, numbered, afterList, related }) => {
            const List = numbered ? "ol" : "ul";
            return (
              <section key={heading}>
                <h2 className="text-utility-section-title font-bold leading-snug">{heading}</h2>
                {paragraphs?.map((paragraph) => (
                  <p key={paragraph} className={`${styles.articleParagraph} text-utility-body text-foreground-muted`}>{paragraph}</p>
                ))}
                {list && (
                  <List className={`${styles.articleParagraph} grid gap-3 pl-5 text-utility-body text-foreground-muted marker:text-accent ${numbered ? "list-decimal" : "list-disc"}`}>
                    {list.map((item) => <li key={item}>{item}</li>)}
                  </List>
                )}
                {afterList && <p className={`${styles.articleParagraph} text-utility-body text-foreground-muted`}>{afterList}</p>}
                {related && (
                  <aside className="mt-5 rounded-panel border border-border-subtle bg-surface-section-deep px-5 py-5 sm:px-6">
                    <h3 className="text-utility-small leading-snug font-bold text-foreground">{related.label}</h3>
                    <ul className="mt-3 grid gap-2">
                      {related.links.map(([slug, label]) => (
                        <li key={slug}>
                          <Link href={resourcePath(slug)} className={`inline-flex min-h-utility-target max-w-full items-center gap-3 py-2 text-utility-body leading-snug text-accent hover:underline ${focusClass}`}>
                            <span>{label}</span><ArrowRight size={16} aria-hidden="true" className="shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
              </section>
            );
          })}
          <div>
            <ArrowFillButton href={article.partner ? "/register/" : "/wholesale-pricing/"}>
              {article.partner ? "Become a wholesale partner" : "Request wholesale pricing"}
            </ArrowFillButton>
          </div>
          <section aria-labelledby="resource-faq">
            <h2 id="resource-faq" className="text-utility-section-title font-bold">FAQ</h2>
            <div className="mt-4 rounded-panel border border-border-subtle bg-surface-section-deep">
              {article.faq.map(([question, answer]) => (
                <details key={question} className="group border-b border-border-subtle last:border-b-0">
                  <summary className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-panel px-5 py-3 text-utility-body font-semibold [&::-webkit-details-marker]:hidden ${focusClass}`}>
                    {question}
                    <Plus size={16} aria-hidden="true" className="shrink-0 text-accent group-open:hidden" />
                    <Minus size={16} aria-hidden="true" className="hidden shrink-0 text-accent group-open:block" />
                  </summary>
                  <p className="px-5 pb-5 text-utility-body leading-relaxed text-foreground-muted">{answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="rounded-card border border-border-subtle bg-surface-section-deep p-5 sm:p-7">
            <h2 className="text-utility-section-title font-bold">Source from a supplier that tests every batch.</h2>
            <p className={`${styles.articleParagraph} text-utility-body text-foreground-muted`}>Explore Mint Clinical’s seven-layer testing standards or ask about wholesale pricing for your clinic.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <ArrowFillButton href="/wholesale-pricing/">Request wholesale pricing</ArrowFillButton>
              <Link href="/testing-standards/" className={backClass}>View testing standards</Link>
            </div>
          </section>
          <section aria-labelledby="resource-more">
            <h2 id="resource-more" className="mb-4 text-utility-section-title font-bold">Keep reading</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((resource) => (
                <li key={resource.slug}>
                  <Link href={resourcePath(resource.slug)} className={`block h-full rounded-panel border border-border-subtle p-5 hover:border-accent ${focusClass}`}>
                    <h3 className="font-bold text-accent">{resource.title}</h3>
                    <p className="mt-2 text-utility-body leading-relaxed text-foreground-muted">{resource.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
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
