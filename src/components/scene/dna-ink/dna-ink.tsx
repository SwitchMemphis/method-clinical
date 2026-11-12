"use client";

// 📖 Docs: obsidian/frontend/components/dna-ink-scene.md

/**
 * DNA Ink — the client leaf that mounts the WebGL scene.
 *
 * Everything three.js lives in `@/lib/scene/dna-ink`; this component only
 * bridges it to React: create on mount, size from the element's own box, feed
 * the pointer, drive `render()` from the shared app ticker
 * (`src/lib/animation/ticker.ts` — one rAF for the whole page), dispose on
 * unmount. The canvas is decorative, so it is `aria-hidden` and transparent to
 * pointer events — content layered above it stays clickable.
 *
 * The live settings live here rather than in the scene so the dev controls
 * panel can drive them. Scene creation is keyed on `generation`, not on the
 * settings: a slider change goes through `applyConfig`, which touches uniforms
 * only, so dragging never remounts the canvas or drops the GL context.
 */

import { animated, to, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { useLoop } from "@/hooks/animation/use-render-loop";
import { DNA_INK_CONFIG, DnaInkScene, type DnaInkConfig } from "@/lib/scene/dna-ink";

import { DnaInkControls } from "./dna-ink-controls";
import {
  clearStoredConfig,
  readStoredConfig,
  writeStoredConfig,
} from "./dna-ink-controls.config";

/** `0` = run on every ticker frame; the scene does its own delta-time easing. */
const EVERY_FRAME = 0;

export interface DnaInkProps {
  /** Starting scene settings. Defaults to `DNA_INK_CONFIG`. */
  config?: DnaInkConfig;
  /**
   * Show the settings panel. **Off by default**, including in development —
   * the scene is tuned and the panel was overlaying the design. Pass `true` to
   * bring it back for a tuning session.
   *
   * Note that the panel is also what reads the stored `localStorage` override,
   * so with it off the committed `DNA_INK_CONFIG` is always what renders.
   */
  controls?: boolean;
  /** Classes for the canvas element itself. */
  className?: string;
  /**
   * Called once, after the first frame has actually been drawn — not on mount.
   * The preloader uses this to hold its curtain until the scene is really on
   * screen; see [[preloader]].
   */
  onReady?: () => void;
}

export const DnaInk = ({
  config = DNA_INK_CONFIG,
  controls = false,
  className,
  onReady,
}: DnaInkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<DnaInkScene | null>(null);
  const visibleRef = useRef(true);
  const [{ x: posterX, y: posterY }, posterMotion] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 160, friction: 26 },
  }));

  // Kept in a ref so the render loop never closes over a stale callback and so
  // firing it does not depend on `useLoop` re-subscribing.
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });
  const announcedRef = useRef(false);

  const [liveConfig, setLiveConfig] = useState(config);
  const [generation, setGeneration] = useState(0);

  // Read by the mount effect below, which must not re-run on every edit. Synced
  // in an effect (not during render) and declared first, so it is already fresh
  // by the time a `generation` bump rebuilds the scene in the same commit.
  const liveConfigRef = useRef(liveConfig);
  useEffect(() => {
    liveConfigRef.current = liveConfig;
  });

  // Restore panel edits from a previous session before the scene is built.
  useEffect(() => {
    if (!controls) return;
    setLiveConfig(readStoredConfig(config));
  }, [controls, config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: DnaInkScene | null = null;
    try {
      scene = new DnaInkScene(canvas, liveConfigRef.current);
    } catch {
      // Let the page reveal even if the browser cannot initialize WebGL.
      canvas.dataset.sceneUnavailable = "";
      onReadyRef.current?.();
    }
    if (scene) delete canvas.dataset.sceneUnavailable;
    sceneRef.current = scene;

    // Dev-only diagnostic handle. The scene's failure modes (a helix that
    // renders as a small faint knot) are indistinguishable by eye from several
    // different causes — appear, pixel scale and camera all produce it — so
    // being able to read the live uniforms from the console is what turns
    // guessing into measuring.
    if (scene && process.env.NODE_ENV === "development") {
      const registry = (window as unknown as Record<string, unknown>);
      const scenes = (registry.__dnaScenes as DnaInkScene[]) ?? [];
      scenes.push(scene);
      registry.__dnaScenes = scenes;
    }

    // Only resize on a whole-pixel change. `getBoundingClientRect` reports
    // sub-pixel values that drift while scrolling (sticky sections, compositor
    // rounding, a scrollbar appearing), and every one of those reached
    // `setSize` → new camera aspect → the helix visibly jumped mid-scroll.
    let lastWidth = 0;
    let lastHeight = 0;

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width === lastWidth && height === lastHeight) return;
      lastWidth = width;
      lastHeight = height;
      scene?.setSize(width, height);
    };
    syncSize();

    const resizeObserver = scene ? new ResizeObserver(syncSize) : null;
    resizeObserver?.observe(canvas);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handlePointerMove = (event: PointerEvent) => {
      // Check the event itself so a connected mouse works when touch is the
      // primary input. Tap-generated pointer movement never drives the scene.
      if (event.pointerType !== "mouse" || reducedMotion.matches || !visibleRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (scene) {
        scene.setPointer(x, -y);
      } else {
        posterMotion.start({
          x: Math.max(-1, Math.min(1, x)) * 12,
          y: Math.max(-1, Math.min(1, y)) * 8,
        });
      }
    };
    const handlePointerLeave = () => {
      scene?.clearPointer();
      if (!scene) posterMotion.start({ x: 0, y: 0, immediate: reducedMotion.matches });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    reducedMotion.addEventListener("change", handlePointerLeave);

    return () => {
      resizeObserver?.disconnect();
      reducedMotion.removeEventListener("change", handlePointerLeave);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
      if (process.env.NODE_ENV === "development") {
        const registry = window as unknown as Record<string, unknown>;
        const scenes = (registry.__dnaScenes as DnaInkScene[]) ?? [];
        registry.__dnaScenes = scenes.filter((entry) => entry !== scene);
      }
      scene?.dispose();
      sceneRef.current = null;
    };
    // `generation` is bumped by the panel's reload/reset to rebuild from scratch.
  }, [generation, posterMotion]);

  useEffect(() => {
    sceneRef.current?.applyConfig(liveConfig);
  }, [liveConfig]);

  /**
   * Render only while the canvas is on screen — two scenes at ~200k point
   * sprites each would otherwise both draw forever (optimize-3d-scene §4) — and
   * rewind it on the way out so every return opens on the same pose.
   *
   * Visibility is measured from the rect **every frame**, not from an
   * `IntersectionObserver`. The observer version latched: its first callback
   * fires with whatever the layout says at subscribe time, and if that reads as
   * "not intersecting" the scene never draws again, because a static element
   * produces no further callbacks. That left `uAppear` at 0 — which renders as
   * a small faint knot instead of a helix, and only recovered if you happened
   * to scroll away and back. One `getBoundingClientRect` per frame cannot latch.
   */
  useLoop(
    () => {
      const canvas = canvasRef.current;
      const scene = sceneRef.current;
      if (!canvas || !scene) return;

      const rect = canvas.getBoundingClientRect();
      const onScreen =
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight;

      if (!onScreen) {
        if (visibleRef.current) {
          visibleRef.current = false;
          scene.resetClock();
        }
        return;
      }

      visibleRef.current = true;
      // Nothing is drawn until the scene's staged build has finished.
      if (!scene.render()) return;

      // Announce readiness only after a frame has been drawn. Mount is far too
      // early — the GL context exists but nothing is on screen yet, which is
      // precisely the state the preloader is there to hide.
      if (!announcedRef.current) {
        announcedRef.current = true;
        onReadyRef.current?.();
      }
    },
    { framerate: EVERY_FRAME },
  );

  const handleChange = (next: DnaInkConfig) => {
    setLiveConfig(next);
    writeStoredConfig(next);
  };

  const handleReset = () => {
    clearStoredConfig();
    setLiveConfig(config);
    setGeneration((value) => value + 1);
  };

  return (
    <>
      <animated.canvas
        ref={canvasRef}
        className={className}
        aria-hidden="true"
        style={{
          backgroundPosition: to([posterX, posterY], (x, y) => `calc(50% + ${x}px) calc(50% + ${y}px)`),
        }}
      />
      {controls && (
        <DnaInkControls
          config={liveConfig}
          onChange={handleChange}
          onReload={() => setGeneration((value) => value + 1)}
          onReset={handleReset}
        />
      )}
    </>
  );
};
