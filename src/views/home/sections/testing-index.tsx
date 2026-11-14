"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { ArrowFillButton } from "@/components/ui/arrow-fill-button";
import { Button } from "@/components/ui/button";
import type { TestingContent } from "@/data/mocks/testing";

import { TestingVial } from "./testing-vial";

export interface TestingIndexProps {
  content: TestingContent;
}

const number = (index: number) => String(index + 1).padStart(2, "0");

/** Native disclosures stay usable before hydration and with JavaScript disabled. */
export function TestingIndex({ content }: TestingIndexProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);


  return (
    <div className="mt-10 grid items-start gap-7 md:mt-12 md:grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] md:gap-14 lg:mt-testing-index-gap lg:grid-cols-(--testing-columns) lg:gap-10">
      <TestingVial content={content} selectedIndex={selectedIndex} />

      <div aria-label={content.listLabel}>
        {content.layers.map((layer, index) => (
          <details
            key={layer.title}
            name="mint-testing-layer"
            onToggle={(event) => {
              if (event.currentTarget.open) setSelectedIndex(index);
            }}
            className="group/layer border-b border-border-subtle first:border-t"
          >
            <summary className="group/row relative grid min-h-14 cursor-pointer list-none grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-center gap-2 px-3 py-5 outline-none focus-visible:rounded-panel focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface-section md:grid-cols-[2rem_minmax(0,1fr)_1.1rem] md:gap-3 [&::-webkit-details-marker]:hidden lg:min-h-testing-row lg:py-testing-inset">
              <span className="text-xs font-medium text-foreground-muted group-open/layer:text-accent lg:text-testing-label">{number(index)}</span>
              <span className="text-base leading-snug font-medium tracking-tight transition-colors duration-300 group-hover/row:text-accent group-focus-visible/row:text-accent group-open/layer:text-accent motion-reduce:transition-none md:text-xl lg:text-testing-row-title">{layer.title}</span>
              <Plus aria-hidden="true" className="size-4 text-foreground-muted group-open/layer:hidden transition-[transform,color] duration-300 group-hover/row:rotate-45 group-hover/row:text-accent group-focus-visible/row:rotate-45 group-focus-visible/row:text-accent motion-reduce:transition-none" strokeWidth={1.5} />
              <Minus aria-hidden="true" className="hidden size-4 text-accent group-open/layer:block" strokeWidth={1.5} />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100 motion-reduce:transition-none" />
            </summary>
            <div className="max-w-lg pt-3 pb-7 pl-11 md:pr-4 md:pl-14 lg:max-w-none">
              {layer.detailHeading && (
                <h3 className="mb-4 text-lg leading-snug font-semibold text-foreground">
                  {layer.detailHeading}
                  {layer.detailHeadingAccent && <span className="block text-accent">{layer.detailHeadingAccent}</span>}
                </h3>
              )}
              <p className="text-base leading-relaxed text-foreground-muted lg:text-testing-body">{layer.description}</p>
              {layer.whyItMatters && layer.setsUsApart && (
                <dl className="mt-5 grid gap-7 border-t border-border-subtle/60 pt-5">
                  <div className="grid gap-3">
                    <dt className="text-xs leading-relaxed font-semibold tracking-widest text-accent uppercase">{content.whyLabel}</dt>
                    <dd className="text-base leading-relaxed text-foreground-muted lg:text-testing-body">{layer.whyItMatters}</dd>
                  </div>
                  <div className="grid gap-3">
                    <dt className="text-xs leading-relaxed font-semibold tracking-widest text-accent uppercase">{content.differenceLabel}</dt>
                    <dd className="text-base leading-relaxed text-foreground-muted lg:text-testing-body">{layer.setsUsApart}</dd>
                  </div>
                </dl>
              )}
              {layer.detailAction && (
                <Button href={layer.detailAction.href} className="mt-6 max-w-full px-5 text-sm font-semibold whitespace-normal">
                  {layer.detailAction.label}
                </Button>
              )}
            </div>
          </details>
        ))}

        <ArrowFillButton href="/catalog/" className="mt-6 border-action-secondary-border">
          Browse the catalog
        </ArrowFillButton>
      </div>
    </div>
  );
}
