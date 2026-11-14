"use client";

import { ArrowDown, Building2, ClipboardCheck, FlaskConical, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

import type { SourcingContent } from "@/data/mocks/home";
import { TESTING_CONTENT } from "@/data/mocks/testing";

const statementIcons = [Building2, MapPin, FlaskConical, ClipboardCheck];
const cardBackgrounds = ["facilities", "usa", "cgmp", "iso"] as const;
const cardStyles = [
  "border-accent bg-accent text-surface-section",
  "border-border-subtle bg-surface-glass-subtle",
  "border-accent/30 bg-accent/15",
];

export function Sourcing({ content }: { content: SourcingContent }) {
  const accentIndex = content.title.indexOf(content.titleAccent);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const rail = railRef.current;
    if (!section || !panel || !rail) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let travel = 0;
    let scrub = 0;
    let frame = 0;
    let previous = 0;

    function update() {
      frame = 0;
      if (!motion.matches || !section || !rail) return;
      const progress = scrub > 0
        ? Math.min(Math.max(-section.getBoundingClientRect().top / scrub, 0), 1)
        : 0;
      const position = -progress * travel;
      if (position === previous) return;
      rail.style.translate = `${position}px`;
      previous = position;
    }

    function scheduleUpdate() {
      if (motion.matches && !frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      if (!section || !panel || !rail) return;
      if (!motion.matches) {
        section.style.removeProperty("min-height");
        rail.style.removeProperty("translate");
        previous = 0;
        return;
      }

      travel = Math.max(0, rail.scrollWidth - rail.clientWidth);
      scrub = travel * 0.85;
      const readingRoom = travel ? Math.min(100, panel.clientHeight * 0.12) : 0;
      section.style.minHeight = `${panel.offsetHeight + scrub + readingRoom}px`;
      scheduleUpdate();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    observer.observe(rail);
    for (const card of rail.children) observer.observe(card);
    motion.addEventListener("change", measure);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", measure);
      window.removeEventListener("scroll", scheduleUpdate);
      cancelAnimationFrame(frame);
      section.style.removeProperty("min-height");
      rail.style.removeProperty("translate");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="sourcing-heading"
      className="relative z-10 scroll-mt-24 motion-safe:min-h-[400svh]"
    >
      <div
        ref={panelRef}
        className="relative isolate flex flex-col gap-8 overflow-clip rounded-t-section bg-surface-section px-5 pt-24 pb-5 md:gap-12 md:px-10 md:pb-10 motion-safe:sticky motion-safe:top-0 motion-safe:min-h-svh motion-safe:justify-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-[at_75%_0%] from-accent/15 via-transparent to-transparent"
        />
        <header>
          <h2 id="sourcing-heading" className="text-4xl leading-display font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {accentIndex >= 0 ? (
              <>
                {content.title.slice(0, accentIndex)}
                <span className="text-accent">{content.titleAccent}</span>
                <br className="sm:hidden" />
                <span className="hidden sm:inline">{" "}</span>
                {content.title.slice(accentIndex + content.titleAccent.length).trimStart()}
              </>
            ) : content.title}
          </h2>
        </header>

        <ol
          ref={railRef}
          className="grid auto-rows-fr items-stretch gap-3 md:gap-4 motion-safe:flex motion-safe:will-change-transform motion-reduce:md:grid-cols-3"
        >
          {content.statements.map(({ title, description, scrollCue }, index) => {
            const Icon = statementIcons[index];
            const background = cardBackgrounds[index];
            const headingColor = Icon === MapPin ? "text-accent" : "";
            return (
              <li
                key={title}
                className={`relative isolate @container overflow-hidden flex min-h-72 text-accent flex-col justify-center gap-3 rounded-card border p-6 md:min-h-80 md:gap-4 md:p-8 motion-safe:w-[90%] motion-safe:shrink-0 motion-safe:sm:w-[62%] motion-safe:lg:w-[36%] ${background ? "border-accent/25 bg-surface-section" : cardStyles[index % cardStyles.length]}`}
              >
                {background && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-right"
                    style={{
                      backgroundSize: background === "cgmp" ? "100% 100%, auto max(100%, 122cqw)" : undefined,
                      backgroundImage: `linear-gradient(90deg, ${background === "cgmp"
                        ? "rgba(5, 22, 15, .78), rgba(5, 22, 15, .65) 60%, rgba(5, 22, 15, .37)"
                        : "rgba(5, 22, 15, .93), rgba(5, 22, 15, .80) 60%, rgba(5, 22, 15, .57)"}), url(/assets/mint-standard/${background}.webp)`,
                    }}
                  />
                )}
                <div className={`flex flex-col gap-3 ${headingColor}`}>
                  {Icon && <Icon aria-hidden="true" className="size-7" strokeWidth={1.5} />}
                  <h3 className="text-2xl leading-snug font-bold tracking-tight [text-box:normal] md:text-3xl">
                    {title}
                  </h3>
                </div>
                {description && (
                  <p className="max-w-lg text-lg leading-snug text-white [text-box:normal] md:text-xl">
                    {description}
                  </p>
                )}
                {scrollCue && (
                  <>
                    <ol aria-label="Seven testing layers" className="grid gap-1.5 py-1">
                      {TESTING_CONTENT.layers.map(({ shortLabel }, layer) => (
                        <li key={shortLabel} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs md:text-sm">
                          <span aria-hidden="true" className="font-mono text-accent">
                            {String(layer + 1).padStart(2, "0")}
                          </span>
                          <span aria-hidden="true" className="h-1.5 rounded-full bg-linear-to-r from-accent/90 to-accent/15" />
                          <span className="text-white">{shortLabel}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="inline-flex items-center gap-3 self-start font-semibold">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-surface-section">
                        <ArrowDown aria-hidden="true" className="size-4" />
                      </span>
                      <span className="text-white">{scrollCue}</span>
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
