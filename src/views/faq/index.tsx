import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";

import { FAQ_CONTENT as content } from "@/data/mocks/faq";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

export const faqMetadata = generateMetadata({
  title: "FAQs | Method Clinical",
  description: content.description,
  url: "/faq/",
});

/** Native disclosure keeps every answer available without client-side state. */
export function FaqView() {
  return (
    <main className="relative bg-surface-section px-5 py-12 md:px-10 lg:py-faq-edge">
      <div className="mx-auto max-w-faq-content">
        <Link href="/" className="mb-6 inline-flex min-h-11 items-center text-accent underline underline-offset-4">← Method Clinical</Link>
        <header className="mx-auto flex flex-col gap-faq-header text-center">
          <p className="text-xs leading-relaxed font-semibold tracking-widest text-accent uppercase lg:text-faq-label">{content.eyebrow}</p>
          <h1 className="text-3xl leading-display font-extrabold tracking-normal [word-spacing:var(--faq-word-gap)] sm:text-4xl lg:text-faq-title">
            {content.title}<br className="sm:hidden" />{" "}<span className="text-accent">{content.emphasis}</span>
          </h1>
          <p className="text-base leading-relaxed text-foreground-muted lg:text-faq-body">{content.description}</p>
        </header>

        <div className="mt-7 rounded-card border border-border-subtle bg-surface-section-deep lg:mt-faq-gap">
          {content.items.map((item) => (
            <details key={item.question} name="method-clinic-faq" className="group/faq border-b border-border-subtle last:border-b-0">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-panel px-5 py-3 text-base leading-snug font-medium outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent group-open/faq:text-accent lg:min-h-faq-row lg:px-faq-gutter lg:py-faq-inset lg:text-faq-question [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <Plus aria-hidden="true" className="size-4 shrink-0 text-accent group-open/faq:hidden" strokeWidth={1.5} />
                <Minus aria-hidden="true" className="hidden size-4 shrink-0 text-accent group-open/faq:block" strokeWidth={1.5} />
              </summary>
              <div className="px-5 pb-5 lg:px-faq-gutter lg:pb-faq-detail">
                <p className="text-base leading-relaxed text-foreground-muted lg:text-faq-body">{item.answer}</p>
                {item.action && (
                  <Link href={item.action.href} prefetch={false} className="mt-3 inline-flex min-h-11 items-center gap-3 rounded-panel text-base font-semibold text-accent underline decoration-accent/40 underline-offset-4 outline-none hover:decoration-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface-section-deep lg:mt-faq-inset lg:text-faq-body">
                    {item.action.label}<ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
