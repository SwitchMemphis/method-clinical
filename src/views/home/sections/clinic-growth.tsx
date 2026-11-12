import { Check } from "lucide-react";

import { ArrowFillButton } from "@/components/ui/arrow-fill-button";
import type { ClinicGrowthContent } from "@/data/mocks/clinic-growth";

import { ClinicGrowthBackdrop } from "./clinic-growth-backdrop";

export interface ClinicGrowthProps {
  content: ClinicGrowthContent;
}

export function ClinicGrowth({ content }: ClinicGrowthProps) {
  return (
    <section id="clinic-growth" aria-labelledby="clinic-growth-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-surface-section px-5 py-16 md:px-10 md:py-24 lg:flex lg:min-h-svh lg:items-center">
      <ClinicGrowthBackdrop />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:gap-12 lg:grid-cols-[1fr_1fr_.1fr] lg:gap-8">
        <div>
          <h2 id="clinic-growth-heading" className="text-4xl leading-display font-extrabold tracking-tight sm:text-5xl">
            {content.title}<br /><span className="text-accent">{content.emphasis}</span>
          </h2>
          <ul className="mt-9 space-y-5 md:mt-10 md:space-y-6">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-4">
                <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Check className="size-4" strokeWidth={2} />
                </span>
                <span className="pt-0.5 text-base leading-relaxed text-foreground-muted md:text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep/95 p-6 sm:p-8 lg:flex lg:min-h-96 lg:flex-col lg:items-start lg:justify-center lg:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-radial-[at_100%_0%] from-accent/10 via-transparent to-transparent" />
          <h3 className="text-2xl leading-snug font-bold tracking-tight text-balance md:text-3xl lg:text-2xl">{content.invitation}</h3>
          <div aria-hidden="true" className="mt-6 h-1 w-12 rounded-full bg-accent" />
          <p className="mt-7 text-base leading-relaxed text-foreground-muted md:text-lg">{content.description}</p>
          <ArrowFillButton href={content.action.href} className="mt-9 w-full sm:w-auto">
            {content.action.label}
          </ArrowFillButton>
        </div>
      </div>
    </section>
  );
}
