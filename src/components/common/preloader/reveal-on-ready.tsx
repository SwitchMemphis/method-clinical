"use client";

// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Holds a subtree's entry animations until the preloader curtain has lifted.
 *
 * The hero is in view from the very first frame, so its `TextEngine` reveals
 * fire immediately — behind the curtain — and are long finished by the time
 * anyone sees the page. Two things are needed to fix that, and **both** matter:
 *
 * 1. `key` swaps when `revealed` flips, which remounts the subtree and re-arms
 *    every mount- and in-view-triggered animation inside it. This is what makes
 *    the reveal play at all.
 * 2. The subtree is `opacity-0` until then. Without it the first, pointless
 *    pass still ends at full opacity, and the frame in which the curtain is
 *    removed paints that finished text one tick before the remount resets it —
 *    read, correctly, as the animation playing twice.
 *
 * A remount, rather than conditional rendering: `children` are still
 * server-rendered inside this component, so the copy is in the initial HTML for
 * crawlers and for anyone without JavaScript. `opacity` is a binary state flip,
 * not a transition, so no animation rule applies to it.
 *
 * `className` lands on the same element, which is what lets this replace a
 * positioning wrapper rather than adding a second one — important in the hero,
 * where every block is absolutely placed at its artboard coordinates.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { usePreload } from "./preload-context";

/**
 * True inside a `RevealOnReady` whose curtain has not lifted yet. The subtree
 * is invisible then and is remounted on reveal, so the engines in it
 * (`RobotText`, `Spring`) render their plain, at-rest element instead of
 * starting springs nobody sees — the hero's first pass was a long task at
 * hydration (optimize-load §TBT).
 */
const RevealPendingContext = createContext(false);
export const useRevealPending = (): boolean => useContext(RevealPendingContext);

export interface RevealOnReadyProps {
  children: ReactNode;
  /** Layout classes for the wrapper — positioning, width, stacking. */
  className?: string;
}

/**
 * Runs `done` once the browser has reported a paint of the served page — an
 * LCP entry (buffered, so one painted before hydration counts), then a task
 * after the next frame. Two bare rAFs lost that race under load (kimi), and
 * the LCP fell back to the reveal. Without the LCP API (Safari): rAF → task.
 */
const afterReportedPaint = (done: () => void): (() => void) => {
  let timer = 0;
  let frame = 0;
  let po: PerformanceObserver | null = null;
  const next = () => {
    po?.disconnect();
    po = null;
    frame = requestAnimationFrame(() => {
      timer = window.setTimeout(done, 0);
    });
  };
  if (
    typeof PerformanceObserver !== "undefined" &&
    PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")
  ) {
    po = new PerformanceObserver(next);
    po.observe({ type: "largest-contentful-paint", buffered: true });
  } else {
    next();
  }
  return () => {
    po?.disconnect();
    cancelAnimationFrame(frame);
    clearTimeout(timer);
  };
};

export const RevealOnReady = ({ children, className }: RevealOnReadyProps) => {
  const { loaded, revealed } = usePreload();
  // The served copy rests *visible* under the opaque curtain, so the phone's
  // LCP (the headline) is the first paint, not the end of the curtain's exit
  // (optimize-load §LCP, lever 1). Once that paint is reported it switches to
  // its hidden start state — still covered — and the reveal plays as before.
  // `loaded` (the curtain about to clip away) forces the switch regardless.
  const [atRest, setAtRest] = useState(true);
  useEffect(() => afterReportedPaint(() => setAtRest(false)), []);
  const hidden = !revealed && (!atRest || loaded);
  const classes = [className, hidden ? "opacity-0" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      key={revealed ? "revealed" : "loading"}
      className={classes || undefined}
    >
      <RevealPendingContext.Provider value={!revealed}>
        {children}
      </RevealPendingContext.Provider>
    </div>
  );
};
