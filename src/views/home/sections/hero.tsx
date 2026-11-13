// 📖 Docs: obsidian/frontend/components/home-sections.md

import { RobotText as TextEngine } from "@/components/common/robot-text";

import { RevealOnReady } from "@/components/common/preloader";
import { ArrowFillButton } from "@/components/ui/arrow-fill-button";
import type { HeroContent } from "@/data/mocks/home";
import {
  BODY_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

export interface HeroProps {
  content: HeroContent;
}

export const Hero = ({ content }: HeroProps) => {
  const accentIndex = content.titleAccent
    ? content.title.indexOf(content.titleAccent)
    : -1;
  const titleLead = content.title.slice(0, accentIndex);
  const mobileBreak = titleLead.indexOf(" ") + 1;
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col overflow-hidden bg-surface-section px-5 pt-32 pb-16 md:px-10 lg:z-10 lg:block lg:h-lvh lg:min-h-0 lg:bg-transparent lg:p-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
        <div className="absolute inset-0 bg-[url('/assets/mobile-hero-helix.4k.afcb2392.webp')] bg-cover bg-center" />
        <video
          aria-hidden="true"
          className="absolute inset-0 hidden size-full object-cover motion-safe:max-lg:block"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src="/assets/mobile-hero-helix.4k.3d8606b9.mp4" type="video/mp4" media="(width < 64rem) and (prefers-reduced-motion: no-preference)" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-surface-section/60 via-surface-section/70 to-surface-section/15" />
      </div>
      <RevealOnReady className="z-10 lg:absolute lg:top-[28.55%] lg:left-10 lg:w-[44.75rem]">
        <div className="flex flex-col gap-6 lg:gap-12">
          <div className="flex flex-col gap-4 lg:gap-8">
            <h1 aria-label={content.title} className="flex flex-col text-hero-heading leading-display font-extrabold tracking-tight lg:text-6xl">
              {accentIndex >= 0 && content.titleAccent ? (
                <>
                  <span className="block lg:hidden">
                    {mobileBreak > 0 && (
                      <TextEngine tag="span" {...HEADING_MOTION}>
                        {titleLead.slice(0, mobileBreak).trimEnd()}
                      </TextEngine>
                    )}
                    <TextEngine tag="span" {...HEADING_MOTION}>
                      {titleLead.slice(mobileBreak)}
                    </TextEngine>
                  </span>
                  <span className="hidden lg:block">
                    <TextEngine tag="span" {...HEADING_MOTION}>
                      {titleLead}
                    </TextEngine>
                  </span>
                  <TextEngine tag="span" className="text-accent" {...HEADING_MOTION}>
                    {content.title.slice(accentIndex)}
                  </TextEngine>
                </>
              ) : (
                <TextEngine tag="span" {...HEADING_MOTION}>{content.title}</TextEngine>
              )}
            </h1>
          </div>
          <TextEngine
            tag="p"
            className="max-w-lg text-hero-description leading-relaxed font-normal text-foreground-muted lg:w-hero-description lg:max-w-none"
            deferMount
            {...BODY_MOTION}
          >
            {content.description}
          </TextEngine>
          <ArrowFillButton href={content.action.href} className="self-start border-action-secondary-border">
            {content.action.label}
          </ArrowFillButton>
        </div>
      </RevealOnReady>
    </section>
  );
};
