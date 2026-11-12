"use client";

// Adapted from starc007 / beui.dev, Expanding Arrow Button (21st demo 29292).
// The expanding accent and dotted chevrons use this project's spring engine.
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ARROW_OPACITY = [1, 0.78, 0.54, 0.32, 0.16];
function DottedChevron() {
  return (
    <svg
      viewBox="0 0 20 28"
      fill="currentColor"
      aria-hidden="true"
      className="h-6 w-4"
    >
      <circle cx="4" cy="4" r="2" />
      <circle cx="10" cy="9" r="2" />
      <circle cx="16" cy="14" r="2" />
      <circle cx="10" cy="19" r="2" />
      <circle cx="4" cy="24" r="2" />
    </svg>
  );
}
export function ExpandingArrowButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const spring = useSpring({
    progress: active ? 1 : 0,
    config: { tension: 280, friction: 28 },
  });
  return (
    <Link
      href={href}
      prefetch={false}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn(
        "relative inline-flex min-h-14 w-fit max-w-full items-center overflow-hidden rounded-action border border-border-subtle bg-surface-section text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface-section",
        className,
      )}
    >
      <animated.span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 z-10 overflow-hidden rounded-action bg-accent text-background"
        style={{
          width: spring.progress.to(
            (p) =>
              `calc(var(--arrow-rest) + (100% - var(--arrow-offset)) * ${p})`,
          ),
        }}
      >
        <animated.span
          className="absolute inset-0 grid place-items-center"
          style={{ opacity: spring.progress.to((p) => 1 - p) }}
        >
          <DottedChevron />
        </animated.span>
        <animated.span
          className="absolute inset-0 flex items-center justify-around px-3"
          style={{ opacity: spring.progress }}
        >
          {ARROW_OPACITY.map((opacity) => (
            <span key={opacity} style={{ opacity }}>
              <DottedChevron />
            </span>
          ))}
        </animated.span>
      </animated.span>
      <animated.span
        className="relative whitespace-nowrap py-4 pr-4 pl-14 text-sm font-medium md:pr-7 md:pl-16 md:text-base"
        style={{ opacity: spring.progress.to((p) => 1 - p) }}
      >
        {children}
      </animated.span>
    </Link>
  );
}
