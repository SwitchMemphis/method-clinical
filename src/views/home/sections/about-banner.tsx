"use client";

// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Parallax banner for the About block.
 *
 * The image is taller than its frame and drifts against the scroll, so the
 * crop shifts as the block passes. Progress is read once per frame from the
 * shared ticker (never in a scroll handler that also writes styles) and drives
 * a spring, so the drift eases rather than tracking raw scroll — hard rule #1.
 */

import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useRef } from "react";

import { useLoop } from "@/hooks/animation/use-render-loop";

const DRIFT_CONFIG = { tension: 180, friction: 40 };
const EVERY_FRAME = 0;
/** Extra image height, as a fraction of the frame — also the travel range. */
const OVERSCAN = 0.25;

export interface AboutBannerProps {
  src: string;
  className?: string;
}

export const AboutBanner = ({ src, className = "" }: AboutBannerProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef<number | null>(null);
  const [{ shift }, api] = useSpring(() => ({
    shift: 0,
    config: DRIFT_CONFIG,
  }));

  useLoop(
    () => {
      const frame = frameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      if (span <= 0) return;

      // 0 when the frame is just below the fold, 1 when it has just left above.
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / span, 0),
        1,
      );
      // Off screen the progress is pinned at 0 or 1 — don't restart the
      // spring every frame for a value that has not moved.
      if (progress === lastProgressRef.current) return;
      lastProgressRef.current = progress;
      api.start({ shift: progress - 0.5 });
    },
    { framerate: EVERY_FRAME },
  );

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <animated.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          top: `${-OVERSCAN * 100}%`,
          height: `${(1 + OVERSCAN * 2) * 100}%`,
          transform: shift.to(
            (value) => `translate3d(0, ${value * OVERSCAN * 100}%, 0)`,
          ),
        }}
      >
        {/* Lazy, not `priority`: the block is the fourth on the page, and a
            preloaded 2560-wide candidate competed with the hero for a phone's
            first seconds of bandwidth. `sizes` follows the frame — full width
            below `lg`, the artboard's 85rem above. */}
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 85rem, 100vw"
          className="object-cover"
        />
      </animated.div>
    </div>
  );
};
