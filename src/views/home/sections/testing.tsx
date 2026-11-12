import Image from "next/image";

import type { TestingContent } from "@/data/mocks/testing";

import { TestingIndex } from "./testing-index";

export interface TestingProps {
  content: TestingContent;
}

export function Testing({ content }: TestingProps) {
  return (
    <section id="testing" aria-labelledby="testing-heading" className="relative isolate scroll-mt-28 overflow-hidden bg-surface-section px-5 py-16 md:px-10 md:py-24 lg:pt-testing-top lg:pb-testing-edge">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-4/5 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent)] md:w-1/2">
        <Image src="/assets/helix-scene-poster.webp" alt="" fill sizes="(min-width:768px) 50vw, 80vw" className="object-cover" />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-7 lg:grid lg:grid-cols-(--testing-columns) lg:items-start lg:gap-10">
          <div>
            {content.eyebrow && <p className="text-xs leading-relaxed font-semibold tracking-widest text-accent uppercase lg:text-testing-label">{content.eyebrow}</p>}
            <h2 id="testing-heading" className="text-4xl leading-display font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-testing-title">
              {content.title}{" "}<span className="text-accent">{content.emphasis}</span>
            </h2>
          </div>
          <p className="max-w-4xl text-base leading-relaxed text-foreground-muted lg:max-w-testing-measure lg:pt-1.5 lg:text-testing-body lg:text-pretty">{content.description}</p>
        </header>

        <TestingIndex content={content} />
      </div>
    </section>
  );
}
