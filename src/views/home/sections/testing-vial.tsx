"use client";

import { animated, to, useReducedMotion, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useState, type PointerEvent } from "react";

import type { TestingContent } from "@/data/mocks/testing";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const assetPath = "/assets/method-testing-";

export function TestingVial({ content, selectedIndex }: { content: TestingContent; selectedIndex: number }) {
  const [hovered, setHovered] = useState(false);
  const staticVial = useMediaQuery("(width < 48rem)");
  const isOpen = !staticVial && hovered;
  const reducedMotion = useReducedMotion();
  const followPointer = !staticVial && reducedMotion === false;
  const { lift } = useSpring({
    lift: isOpen ? 1 : 0,
    immediate: staticVial || reducedMotion !== false,
    config: { tension: 160, friction: 26, clamp: true },
  });
  const [{ x, y }, backdropSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 270, friction: 32, clamp: true },
  }));

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (staticVial || event.pointerType !== "mouse") return;

    if (!hovered) setHovered(true);
    if (!followPointer) return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    backdropSpring.start({
      x: (2 * (event.clientX - left)) / width - 1,
      y: (2 * (event.clientY - top)) / height - 1,
    });
  }

  function resetPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;

    setHovered(false);
    backdropSpring.start({ x: 0, y: 0, immediate: !followPointer });
  }

  return (
    <div
      onPointerEnter={trackPointer}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <animated.figure
        className={cn(
          "relative isolate overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep",
          !staticVial && "pointer-events-none",
        )}
        style={{
          transform: followPointer
            ? to([x, y], (horizontal, vertical) =>
                `perspective(1100px) translate3d(${horizontal * 4}px, ${vertical * 3}px, 0) rotateX(${vertical * -3}deg) rotateY(${horizontal * 3}deg)`,
              )
            : undefined,
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-radial-[at_50%_45%] from-accent/10 via-transparent to-transparent" />
        <div className="relative flex items-center justify-between gap-3 px-4 py-3 text-[length:var(--testing-caption)] font-medium tracking-wider text-foreground-muted uppercase md:p-6 lg:h-testing-figure-header lg:px-testing-figure-inset lg:py-0 lg:text-testing-label">
          <span>{content.diagramLabel}</span>
          <span className="shrink-0 text-accent">{content.diagramRange}</span>
        </div>

        <div
          className="relative isolate grid h-[clamp(13.5rem,64vw,16rem)] place-items-center overflow-hidden md:h-testing-diagram lg:h-testing-diagram-fit"
          data-vial-state={isOpen ? "open" : "closed"}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-85 [mask-image:linear-gradient(to_bottom,transparent,black_38%)]">
            <Image
              src={`${assetPath}emerald-studio.webp`}
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-bottom"
            />
          </div>

          <div className="pointer-events-none relative aspect-[584/1442] h-[85%] -translate-y-4 md:h-[92%] md:translate-y-0">
            <Image
              src={`${assetPath}nad-body-flow.webp`}
              alt="Method Clinical NAD+ 500 mg vial"
              width={584}
              height={1057}
              className="absolute inset-x-0 top-[26.7%] h-auto w-full"
            />
            <animated.div
              aria-hidden="true"
              className="absolute top-0 left-[4.1%] w-[91.8%]"
              style={{ transform: lift.to((value) => `translateY(${36 * (1 - value)}%)`) }}
            >
              <Image src={`${assetPath}nad-cap.webp`} alt="" width={536} height={338} className="h-auto w-full" />
            </animated.div>
          </div>

          <ol aria-hidden="true" className="absolute inset-x-0 bottom-2 flex justify-center gap-2 md:inset-x-auto md:top-1/2 md:right-6 md:bottom-auto md:grid md:-translate-y-1/2 md:gap-1.5">
            {content.layers.map((layer, index) => (
              <li
                key={layer.title}
                className={cn(
                  "flex items-center gap-2 font-mono text-xs tabular-nums transition-colors duration-[var(--duration-fast)] motion-reduce:transition-none max-md:grid max-md:size-5 max-md:place-items-center max-md:rounded-full max-md:text-[0.625rem]",
                  index === selectedIndex ? "font-semibold text-accent max-md:bg-accent/10" : "text-foreground-muted",
                )}
              >
                <span className={cn("hidden h-px w-3 bg-current md:block", index !== selectedIndex && "opacity-30")} />
                {String(index + 1).padStart(2, "0")}
              </li>
            ))}
          </ol>
        </div>

        <figcaption className="relative flex min-h-11 flex-wrap items-center justify-between gap-2 border-t border-border-subtle px-4 py-3 text-xs text-foreground-muted md:min-h-12 md:px-6 md:py-6 lg:min-h-testing-caption-fit lg:px-testing-figure-inset lg:py-testing-inset">
          <span className="text-[length:var(--testing-caption)] tracking-wide uppercase lg:text-testing-label">{content.selectionLabel}</span>
          <strong className="text-sm font-semibold text-accent md:text-xl lg:text-testing-row-title">
            {String(selectedIndex + 1).padStart(2, "0")} / {content.layers[selectedIndex].shortLabel}
          </strong>
        </figcaption>
      </animated.figure>
    </div>
  );
}
