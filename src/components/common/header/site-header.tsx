"use client";

import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import mintStyles from "@/components/ui/mint-sheen.module.css";
import type { CtaLink, NavLink, SocialLink } from "@/data/mocks/home";

import { MobileMenu } from "./mobile-menu";

export interface SiteHeaderProps {
  navLinks: readonly NavLink[];
  cta: CtaLink;
  /** Shown at the foot of the full-screen mobile menu. */
  socials: readonly SocialLink[];
}

enum HeaderState { Top, Expanded, Compact }

export const SiteHeader = ({ navLinks, cta, socials }: SiteHeaderProps) => {
  const reducedMotion = useReducedMotion();
  const [{ morph }, spring] = useSpring(() => ({
    morph: HeaderState.Top,
    config: { tension: 240, friction: 30, clamp: true },
  }));

  useEffect(() => {
    let referenceY = Math.max(0, window.scrollY);
    let state = HeaderState.Top;

    function update(next: HeaderState, y: number) {
      state = next;
      referenceY = y;
      spring.start({ morph: next, immediate: reducedMotion !== false });
    }

    function onScroll() {
      const y = Math.max(0, window.scrollY);
      if (y <= 4) {
        if (state !== HeaderState.Top) update(HeaderState.Top, y);
      } else if (state === HeaderState.Top && y >= 24) {
        update(HeaderState.Compact, y);
      } else if (state === HeaderState.Compact) {
        referenceY = Math.max(referenceY, y);
        if (referenceY - y >= 16) update(HeaderState.Expanded, y);
      } else if (state === HeaderState.Expanded) {
        referenceY = Math.min(referenceY, y);
        if (y - referenceY >= 16) update(HeaderState.Compact, y);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, spring]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[60] px-3 md:top-4 md:px-10">
      <animated.div
        className="relative mx-auto flex min-h-14 items-center justify-between gap-1 pr-2 pl-4 md:gap-4 md:pr-4 md:pl-6"
        style={{
          width: morph.to((value) => {
            const top = Math.max(0, 1 - value);
            const compact = Math.max(0, value - 1);
            const expanded = 1 - top - compact;
            return `calc(${top} * 100% + ${expanded} * min(100% - 0.25rem, 54rem) + ${compact} * min(100% - 0.75rem, 44rem))`;
          }),
        }}
      >
        <animated.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-border-subtle bg-surface-glass backdrop-blur-glass"
          style={{ opacity: morph.to((value) => Math.min(1, value)) }}
        />

        <Link href="#hero" prefetch={false} className="pointer-events-auto relative flex min-h-11 min-w-0 items-center">
          <Image
            src="/assets/flow-logo.png"
            alt="Method Clinical"
            width={548}
            height={175}
            className="h-auto w-32 max-w-full object-contain md:w-36"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1 md:gap-2">
          <Link
            href={cta.href}
            prefetch={false}
            className={`pointer-events-auto relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-accent px-2.5 text-xs font-semibold text-action-primary-foreground sm:px-4 sm:text-sm ${mintStyles.sheen}`}
          >
            {cta.label}
          </Link>
          <MobileMenu navLinks={navLinks} cta={cta} socials={socials} panelClassName="rounded-full" />
        </div>
      </animated.div>
    </header>
  );
};
