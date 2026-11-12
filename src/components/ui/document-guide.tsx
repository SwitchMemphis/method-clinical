"use client";

import { DOCUMENT_CONTENT } from "@/data/mocks/lower-page";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowUpRight, FileText, Plus } from "lucide-react";
import { DOCUMENT_GUIDE } from "@/data/mocks/document-guide";
import { cn } from "@/lib/utils";
import { ExpandingArrowButton } from "./expanding-arrow-button";

// Feature 108's accessible selector/media composition, adapted into a document reader.
export function DocumentGuide() {
  return (
    <Tabs.Root
      defaultValue="product"
      orientation="vertical"
      className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-20"
    >
      <div>
        <Tabs.List
          aria-label="Certificate of Analysis guide"
          className="flex flex-col border-t border-border-subtle"
        >
          {DOCUMENT_GUIDE.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              className="group border-b border-border-subtle py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              <span className="flex items-center gap-5">
                <span className="text-xs text-foreground-muted group-data-[state=active]:text-accent">
                  {item.number}
                </span>
                <span className="flex-1 text-xl font-light text-foreground-muted group-data-[state=active]:text-foreground md:text-2xl">
                  {item.title}
                </span>
                <Plus
                  className="size-5 text-foreground-muted group-data-[state=active]:rotate-45 group-data-[state=active]:text-accent"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-4 hidden max-w-md pl-9 text-base leading-relaxed text-foreground-muted group-data-[state=active]:block">
                {item.description}
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="mt-9">
          <ExpandingArrowButton href="#contact">
            {DOCUMENT_CONTENT.action}
          </ExpandingArrowButton>
        </div>
      </div>
      <div className="relative rounded-card bg-surface-section-deep p-5 md:p-9">
        <div className="mb-7 flex items-center justify-between text-xs uppercase tracking-widest text-foreground-muted">
          <span className="flex items-center gap-2">
            <FileText aria-hidden="true" className="size-4 text-accent" />
            Document guide
          </span>
          <span>MC / COA</span>
        </div>
        {DOCUMENT_GUIDE.map((item) => (
          <Tabs.Content
            value={item.id}
            key={item.id}
            className="outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="rounded-panel bg-foreground p-6 text-background md:p-9">
              <div className="flex items-center justify-between border-b border-background/20 pb-5">
                <span className="text-sm font-medium">Method Clinical</span>
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </div>
              <p className="mt-7 text-xs uppercase tracking-widest opacity-60">
                A guide to your documentation
              </p>
              <h3 className="mt-3 text-3xl leading-display font-light tracking-tight">
                Certificate
                <br />
                of Analysis
              </h3>
              <div className="mt-8 space-y-2">
                {DOCUMENT_GUIDE.map((row) => (
                  <div
                    key={row.id}
                    className={cn(
                      "flex min-h-14 items-center gap-4 rounded-panel px-3 text-sm",
                      row.id === item.id
                        ? "bg-background text-accent"
                        : "border border-background/15 text-background/70",
                    )}
                  >
                    <span className="text-xs opacity-70">{row.number}</span>
                    <span className="flex-1">{row.title}</span>
                    {row.id === item.id ? (
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-px w-8 bg-current opacity-30"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-background/20 pt-4 text-xs leading-relaxed opacity-65">
                {DOCUMENT_CONTENT.previewNote}
              </div>
            </div>
            <p className="mt-5 flex items-center gap-3 text-sm text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              {item.caption}
            </p>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
