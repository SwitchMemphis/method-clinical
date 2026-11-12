import { CATALOG_CONTENT } from "@/data/mocks/lower-page";
import type { SectionIntro, ServiceCard } from "@/data/mocks/home";
import { Feature108 } from "@/components/ui/feature-108";

export function Services({
  intro,
  cards,
}: {
  intro: SectionIntro;
  cards: readonly ServiceCard[];
}) {
  return (
    <section
      id="services"
      aria-labelledby="catalog-title"
      className="relative scroll-mt-24 bg-surface-section px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-lower-content">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {intro.eyebrow}
            </p>
            <h2
              id="catalog-title"
              className="mt-6 max-w-lg text-4xl leading-display font-light tracking-tight md:text-6xl"
            >
              {intro.title}
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-foreground-muted">
            {CATALOG_CONTENT.description}
          </p>
        </div>
        <Feature108 items={cards} />
      </div>
    </section>
  );
}
