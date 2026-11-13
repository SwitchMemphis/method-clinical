"use client";

import { animated, useReducedMotion } from "@react-spring/web";
import { Building2, FlaskConical, MapPin } from "lucide-react";
import { useRef } from "react";

import { useRobot } from "@/components/common/robot-view";
import type { SourcingContent } from "@/data/mocks/home";
import { useProgressTrigger } from "@/hooks/animation/use-progress-trigger";

const statementIcons = [Building2, MapPin, FlaskConical];

export function Sourcing({ content }: { content: SourcingContent }) {
  const accentIndex = content.title.indexOf(content.titleAccent);
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const robot = useRobot();
  const drift = !robot && reducedMotion === false;
  const { interpolatedProgress } = useProgressTrigger({
    enabled: drift,
    elementRef: section,
    config: { tension: 150, friction: 34 },
  });

  return (
    <section
      ref={section}
      id="why"
      aria-labelledby="sourcing-heading"
      className="relative z-10 isolate scroll-mt-24 overflow-hidden bg-surface-section px-4 pt-12 pb-16 md:px-10 md:pt-16 md:pb-24 lg:bg-transparent lg:pb-12"
    >
      <animated.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-cover bg-no-repeat opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] md:inset-y-0 md:left-[42%] md:h-auto md:opacity-90 md:[mask-image:linear-gradient(to_right,transparent,black_30%)] lg:hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, var(--surface-section), transparent 18%, transparent 72%, var(--surface-section)), url('/assets/helix-scene-poster.webp')",
          backgroundPosition: drift
            ? interpolatedProgress.to((progress) => `center ${38 + progress * 15}%`)
            : "center 45%",
        }}
      />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-card border border-border-subtle bg-surface-glass-subtle p-5 backdrop-blur-glass sm:p-8 md:rounded-section md:p-12 lg:px-12 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-[at_50%_0%] from-accent/10 via-transparent to-transparent"
        />
        <header className="relative mx-auto max-w-3xl text-center">
          <h2 id="sourcing-heading" className="text-4xl leading-display font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {accentIndex >= 0 ? (
              <>
                {content.title.slice(0, accentIndex)}
                <span className="text-accent">{content.titleAccent}</span>
                {content.title.slice(accentIndex + content.titleAccent.length)}
              </>
            ) : content.title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-foreground-muted sm:text-base">
            {content.reviewNote}
          </p>
        </header>

        <ol className="relative mt-10 grid gap-5 md:mt-12 lg:grid-cols-3 lg:gap-7">
          {content.statements.map(({ title, description }, index) => {
            const Icon = statementIcons[index] ?? Building2;
            return (
              <li key={title} className="grid content-start gap-5 rounded-card border border-border-subtle/70 bg-surface-section/80 p-6 lg:p-7">
                <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <div className="grid gap-3">
                  <h3 className="text-xl leading-snug font-bold tracking-tight [text-box:normal] lg:text-2xl">
                    {title}
                  </h3>
                  <p className="text-utility-body leading-relaxed text-foreground-muted [text-box:normal]">
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}
