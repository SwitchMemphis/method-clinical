"use client";

import { useEffect, useRef, useState, type ComponentProps, type ComponentType } from "react";
import type React from "react";
import TextEngine from "spring-text-engine";

import { usePreload } from "./preloader/preload-context";
import { useRevealPending } from "./preloader/reveal-on-ready";
import { useRobot } from "./robot-view";

/**
 * spring-text-engine, except that on the robot form (D-016) the text is plain
 * text in the same tag — the engine starts its letters hidden in the served
 * HTML. Swap a first-screen import:
 * `import { RobotText as TextEngine } from "@/components/common/robot-text"`.
 *
 * The identity transform keeps the engine's paint order: its letters are
 * transformed, which paints them in the positioned layer — above an overlay
 * (a legibility scrim) that plain in-flow text would sit under (evolve).
 */
const PAINT_AS_ENGINE = {
  transform: "translate(0)",
  // The engine lays each instance out as a wrapping flex row — so two inline
  // `<span>` engines stack as two lines (voxelia's headline "Play the board" /
  // "in real time." ran together without this), and `justify-*` classes align.
  display: "flex",
  flexWrap: "wrap",
  // A flex row drops the whitespace between a text run and an inline child
  // ("Light, <Accent>written</Accent>" read "Light,written" on artist);
  // pre-wrap keeps it inside the text's anonymous item.
  whiteSpace: "pre-wrap",
} as const;

/**
 * The engine sets each line as a flex row, so a `justify-*` class aligns its
 * lines; on plain text that class does nothing. Carry it over as `text-align`
 * (helion's centred hero line rendered left-aligned without this) — unless the
 * author already aligns the text with a `text-*` class: an inline style would
 * beat its responsive variants (lumea's `text-center lg:text-left` headline
 * rendered centred on desktop).
 */
const alignOf = (className = "") =>
  /(^|\s|:)text-(left|center|right|start|end|justify)(\s|$)/.test(className)
    ? undefined
    : /(^|\s)justify-center(\s|$)/.test(className)
      ? "center"
      : /(^|\s)justify-end(\s|$)/.test(className)
        ? "right"
        : undefined;

/**
 * How far below the viewport a `lazy` block may be before its engine mounts —
 * further than the engine's own in-view trigger, so the swap happens off
 * screen and the entrance plays as it always did.
 */
const LAZY_MARGIN = "150% 0px 150% 0px";

type RobotTextProps = ComponentProps<typeof TextEngine> & {
  /**
   * Below the fold: plain text until the block is within `LAZY_MARGIN` of the
   * viewport, then the engine. Every engine measures its lines at mount
   * (forced layouts), and a page of them hydrates in one long task (artist:
   * 18 engines, mobile TBT 2.6 s). Never on the first screen — the swap would
   * be visible there. Plain text is also what the served HTML holds, so the
   * copy is readable before hydration.
   */
  lazy?: boolean;
  /**
   * Mount one task after the rest of its commit, hidden until then (the
   * engine's own out-state). For a long engine revealed together with others:
   * dantora's hero mounts 28 word springs in its reveal commit, and splitting
   * the 20-word body off halves that long task. The body starts its entrance a
   * task later — a few ms against a 26 ms word stagger.
   */
  deferMount?: boolean;
};

const Plain = ({ tag, className, mode, children, innerRef, hidden }: RobotTextProps & { innerRef?: React.Ref<HTMLElement>; hidden?: boolean }) => {
  // Through `ComponentType`, not `ElementType`: with @react-three/fiber's JSX
  // augmentation a dynamic intrinsic tag types its children as `never` and a
  // project that type-checks its build (vesper) fails on it.
  const Tag = (tag ?? "div") as unknown as ComponentType<Record<string, unknown>>;
  return (
    <Tag
      ref={innerRef}
      className={className}
      style={{
        ...PAINT_AS_ENGINE,
        textAlign: alignOf(className),
        // At rest a scroll-scrubbed line (`mode="progress"`) is at progress 0 —
        // the engine's out-state, hidden. Showing it stacked house's whole
        // hero sequence on the first screen. (The text is still in the DOM.)
        visibility: hidden || mode === "progress" ? "hidden" : undefined,
      }}
    >
      {children}
    </Tag>
  );
};

/**
 * The visitor's first gesture toward moving the page. Until then nothing below
 * the first screen can come near, so a block only swaps if it is already on
 * screen; after it, the `LAZY_MARGIN` look-ahead applies. Without this the
 * blocks just under the hero (within 1.5 viewports at load) swapped in right
 * after the curtain lifted — a long task in the load window for a page nobody
 * had scrolled yet. `scroll` covers a restored or hash-anchored position.
 */
const ENGAGE_EVENTS = ["pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
let engaged = false;
const engageWaiters = new Set<() => void>();
const engage = () => {
  if (engaged) return;
  engaged = true;
  for (const type of ENGAGE_EVENTS) window.removeEventListener(type, engage, true);
  for (const wake of engageWaiters) wake();
  engageWaiters.clear();
};
const onEngaged = (wake: () => void): (() => void) => {
  if (engaged) {
    wake();
    return () => {};
  }
  if (engageWaiters.size === 0) {
    for (const type of ENGAGE_EVENTS) {
      window.addEventListener(type, engage, { capture: true, passive: true });
    }
  }
  engageWaiters.add(wake);
  return () => engageWaiters.delete(wake);
};

/** Mounts the engine once the plain block nears the viewport. */
const LazyEngine = (props: RobotTextProps) => {
  const { lazy: _lazy, deferMount: _defer, ...engine } = props;
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [moving, setMoving] = useState(engaged);
  // Not while the preloader's curtain is up: the page is covered and scroll is
  // locked until it lifts, so nothing can come near yet — and a swap then is a
  // long task billed before the hero's LCP.
  const { revealed } = usePreload();
  useEffect(() => {
    if (moving || !revealed) return;
    return onEngaged(() => setMoving(true));
  }, [moving, revealed]);
  useEffect(() => {
    const el = ref.current;
    if (!el || near || !revealed) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setNear(true); },
      { rootMargin: moving ? LAZY_MARGIN : "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, revealed, moving]);
  if (near) return <TextEngine {...engine} />;
  return <Plain {...props} innerRef={ref} />;
};

/** `deferMount`: the engine one macrotask after its commit. */
const DeferredEngine = (props: RobotTextProps) => {
  const { lazy: _lazy, deferMount: _defer, ...engine } = props;
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setGo(true), 0);
    return () => clearTimeout(id);
  }, []);
  if (go) return <TextEngine {...engine} />;
  return <Plain {...props} hidden />;
};

export const RobotText = (props: RobotTextProps) => {
  const robot = useRobot();
  // Behind the preloader's curtain the block is invisible and remounts on
  // reveal — the engine's first pass there would only cost a long task.
  const pending = useRevealPending();
  if (robot || pending) return <Plain {...props} />;
  if (props.lazy) return <LazyEngine {...props} />;
  if (props.deferMount) return <DeferredEngine {...props} />;
  const { lazy: _lazy, deferMount: _defer, ...engine } = props;
  return <TextEngine {...engine} />;
};
