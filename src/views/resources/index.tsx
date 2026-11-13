import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RESOURCES, resourcePath } from "@/data/resources";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

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
    <main className="relative bg-surface-section px-utility-gutter pb-utility-section pt-6 text-foreground">
      <div className="mx-auto max-w-utility-content">
        <Link href="/" className={backClass}><ArrowLeft size={16} aria-hidden="true" /> Mint Clinical home</Link>
        <header className="mx-auto max-w-3xl py-10 text-center md:py-14">
          <p className="text-sm font-semibold text-accent">Resources</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold leading-display tracking-tight md:text-6xl">Guides for clinics and wholesale buyers</h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-foreground-muted md:text-lg">{description}</p>
        </header>
        <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((guide) => (
            <li key={guide.slug}>
              <Link href={resourcePath(guide.slug)} className={`group flex h-full flex-col rounded-card border border-border-subtle bg-surface-section-deep p-5 hover:border-accent md:p-7 ${focusClass}`}>
                <p className="text-sm font-semibold text-accent">{guide.category}</p>
                <h2 className="mt-3 text-balance text-xl font-bold leading-snug tracking-tight md:text-2xl">{guide.title}</h2>
                <p className="mb-6 mt-3 text-pretty leading-relaxed text-foreground-muted">{guide.summary}</p>
                <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline">Read guide <ArrowUpRight size={16} /></span>
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
    <main className="relative bg-surface-section px-utility-gutter pb-utility-section pt-6 text-foreground">
      <article className="mx-auto max-w-3xl">
        <Link href="/resources/" className={backClass}><ArrowLeft size={16} aria-hidden="true" /> All resources</Link>
        <header className="border-b border-border-subtle pb-8 pt-8 md:pt-12">
          <p className="text-sm font-semibold text-accent">{guide.category}</p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-display tracking-tight md:text-6xl">{guide.title}</h1>
          <p className="mt-5 max-w-prose text-pretty text-lg leading-relaxed text-foreground-muted">{guide.summary}</p>
        </header>
        <div className="grid gap-8 py-9">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold leading-snug md:text-2xl">{section.title}</h2>
              <p className="mt-3 max-w-prose text-pretty leading-relaxed text-foreground-muted md:text-lg">{section.body}</p>
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
