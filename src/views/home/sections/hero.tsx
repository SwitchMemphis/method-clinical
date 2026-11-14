// 📖 Docs: obsidian/frontend/components/home-sections.md

import { RobotText as TextEngine } from "@/components/common/robot-text";

import { RevealOnReady } from "@/components/common/preloader";
import { ArrowFillButton } from "@/components/ui/arrow-fill-button";
import type { HeroContent } from "@/data/mocks/home";
import {
  BODY_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { HeroVideo } from "./hero-video";
import { HeroScrollCue } from "./hero-scroll-cue";

export interface HeroProps {
  content: HeroContent;
}

export const Hero = ({ content }: HeroProps) => {
  const accentIndex = content.titleAccent
    ? content.title.indexOf(content.titleAccent)
    : -1;
  const titleLead = content.title.slice(0, accentIndex);
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-surface-section px-5 pt-32 pb-16 md:px-10 lg:z-10 lg:block lg:h-lvh lg:min-h-0 lg:bg-transparent lg:p-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
        <div className="absolute inset-0 bg-[url('/assets/mobile-hero-helix.4k.afcb2392.webp')] bg-cover bg-center" />
        <HeroVideo />
        <div className="absolute inset-0 bg-linear-to-b from-surface-section/60 via-surface-section/70 to-surface-section/15" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-surface-section" />
      </div>
      <RevealOnReady className="z-10 lg:absolute lg:top-[28.55%] lg:left-10 lg:w-[44.75rem]">
        <div className="flex flex-col gap-6 lg:gap-12">
          <div className="flex flex-col gap-4 lg:gap-8">
            <h1 aria-label={content.title} className="flex flex-col text-hero-heading text-foreground leading-display font-semibold tracking-tight lg:text-hero-heading-desktop">
              {accentIndex >= 0 && content.titleAccent ? (
                <>
                  <TextEngine tag="span" {...HEADING_MOTION}>{titleLead.trimEnd()}</TextEngine>
                  <TextEngine tag="span" className="text-accent text-hero-heading-accent lg:text-hero-heading-accent-desktop" {...HEADING_MOTION}>
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
            className="max-w-lg text-balance text-hero-description leading-relaxed font-normal text-foreground-muted lg:w-hero-description lg:max-w-none"
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
      <HeroScrollCue />
    </section>
  );
};
