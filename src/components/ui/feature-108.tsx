"use client";

// Adapted from shadcnblocks.com Feature 108, retrieved from 21st.dev (demo 607).
// Retains the tabs -> shared surface -> copy/media composition, with Mint tokens.
import { CATALOG_CONTENT } from "@/data/mocks/lower-page";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import type { ServiceCard } from "@/data/mocks/home";
import { ExpandingArrowButton } from "@/components/ui/expanding-arrow-button";

export function Feature108({ items }: { items: readonly ServiceCard[] }) {
  return (
    <Tabs.Root defaultValue={items[0].index} className="mt-12 md:mt-16">
      <Tabs.List
        aria-label="Compound selection"
        className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-0"
      >
        {items.map((item) => (
          <Tabs.Trigger
            key={item.index}
            value={item.index}
            className="group flex min-h-16 items-center justify-between gap-3 rounded-panel border border-border-subtle px-4 py-4 text-left text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:text-background lg:rounded-none lg:border-b-0 lg:px-6 lg:text-base lg:first:rounded-tl-card lg:last:rounded-tr-card"
          >
            <span className="flex min-w-0 items-baseline gap-3">
              <span className="text-xs opacity-70">{item.index}</span>
              {item.title}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="hidden size-4 shrink-0 opacity-60 lg:block group-data-[state=active]:opacity-100"
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="mt-4 overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep lg:mt-0 lg:rounded-t-none">
        {items.map((item) => (
          <Tabs.Content
            key={item.index}
            value={item.index}
            className="outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col p-6 md:p-10 lg:p-14">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-widest text-foreground-muted">
                  <span>{CATALOG_CONTENT.indexLabel}</span>
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {item.index} / 04
                  </span>
                </div>
                <h3 className="mt-14 [min-height:var(--catalog-heading)] max-w-full text-4xl leading-display font-light tracking-tight md:text-5xl lg:mt-20 lg:text-6xl">
                  {item.title}
                </h3>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-foreground-muted">
                  {CATALOG_CONTENT.itemDescription}
                </p>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border-subtle pt-5 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {CATALOG_CONTENT.audienceLabel}
                    </dt>
                    <dd className="mt-2">{CATALOG_CONTENT.audience}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {CATALOG_CONTENT.statusLabel}
                    </dt>
                    <dd className="mt-2">{CATALOG_CONTENT.status}</dd>
                  </div>
                </dl>
                <div className="mt-10">
                  <ExpandingArrowButton href="#contact">
                    {CATALOG_CONTENT.action}
                  </ExpandingArrowButton>
                </div>
              </div>
              <div className="relative isolate flex min-h-80 flex-col justify-between overflow-hidden bg-background p-6 md:min-h-96 md:p-10 lg:p-14">
                <Image
                  src="/assets/flow-field.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="-z-10 object-cover opacity-45"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-transparent to-background" />
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-accent">
                  <span>01 Flow / Mint Clinical</span>
                  <Plus className="size-4" aria-hidden="true" />
                </div>
                <div className="my-10 self-center rounded-card border border-accent/40 bg-surface-section/90 px-6 py-10 text-center backdrop-blur-glass md:px-16">
                  <span className="text-xs uppercase tracking-widest text-accent">
                    Compound {item.index}
                  </span>
                  <p className="mt-6 whitespace-nowrap text-4xl leading-display font-light tracking-tight md:text-6xl">
                    {item.title === "Thymosin Alpha-1"
                      ? "TA-1"
                      : item.title === "CJC-1295 Without DAC"
                        ? "CJC-1295"
                        : item.title}
                  </p>
                  <div
                    aria-hidden="true"
                    className="mx-auto mt-8 flex h-7 items-end justify-center gap-1"
                  >
                    {Array.from({ length: 26 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i % 3 === 0
                            ? "h-full w-0.5 bg-accent/60"
                            : "h-4 w-px bg-accent/40"
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-6 text-xs leading-relaxed text-foreground-muted">
                  <span>
                    Wholesale supply
                    <br />
                    for licensed providers.
                  </span>
                  <span>MC / {item.index}</span>
                </div>
              </div>
            </div>
          </Tabs.Content>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-foreground-muted">
        {CATALOG_CONTENT.previewNote}
      </p>
    </Tabs.Root>
  );
}
