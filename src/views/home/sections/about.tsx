import { DOCUMENT_CONTENT } from "@/data/mocks/lower-page";
import type { AboutContent } from "@/data/mocks/home";
import { DocumentGuide } from "@/components/ui/document-guide";

export function About({ content }: { content: AboutContent }) {
  return (
    <section
      id="about"
      aria-labelledby="documents-title"
      className="relative scroll-mt-24 bg-surface-section px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-lower-content">
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {content.eyebrow}
            </p>
            <h2
              id="documents-title"
              className="mt-6 max-w-lg text-4xl leading-display font-light tracking-tight md:text-6xl"
            >
              {DOCUMENT_CONTENT.titleLines[0]}
              <br />
              {DOCUMENT_CONTENT.titleLines[1]}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-foreground-muted">
            {DOCUMENT_CONTENT.description}
          </p>
        </div>
        <DocumentGuide />
      </div>
    </section>
  );
}
