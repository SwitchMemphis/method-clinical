"use client";

// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Burger menu — the small-screen half of the header.
 *
 * Below `lg` the desktop bar cannot fit four links, a logo and a pill CTA, so
 * the nav collapses behind a single toggle. Opening it floods the whole screen
 * in the brand green — the preloader's curtain colour — as a circle growing out
 * of the toggle, then the links rise out of their line masks one after another
 * in large light display type. Closing is the same film run backwards, faster.
 *
 * Motion is `@react-spring/web` throughout (hard rule #1): one transition drives
 * the clip-path circle, one spring per link drives its rise. The links never
 * fade — they slide out of an `overflow: hidden` mask — so their contrast holds
 * at every frame (axe samples mid-entrance). Reduced motion: `ReducedMotion`
 * sets react-spring's `skipAnimation`, so the panel simply appears.
 *
 * Behaviour: a real `<button>` with `aria-expanded` / `aria-controls`; Escape
 * closes; the page is scroll-locked (Lenis stopped through the scroll store)
 * while open; focus moves to the first link on open, Tab stays between the
 * toggle and the panel, and focus returns to the toggle on close; a link click
 * closes the panel first and then glides to its section. The panel unmounts when
 * closed, and `main` is `inert` while it covers the page.
 */

import { animated, useSprings, useTransition, type SpringValue } from "@react-spring/web";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from "react";

import { ArrowFillButton } from "@/components/ui/arrow-fill-button";
import type { CtaLink, NavLink, SocialLink } from "@/data/mocks/home";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

/** The curtain's opening — weighty, like the preloader's own clip. */
const OPEN_SPRING = { tension: 170, friction: 30 };
/** Closing runs the same path back, quicker: the user has already decided. */
const CLOSE_SPRING = { tension: 320, friction: 36 };
/** Each link's rise out of its mask. */
const LINK_SPRING = { tension: 260, friction: 28 };
/** Stagger between consecutive rows on the way in / out (ms). */
const ENTER_STAGGER = 55;
const LEAVE_STAGGER = 25;
/** The rows wait for the circle to cover most of the screen. */
const ENTER_LEAD = 140;
/** A link click waits for the panel to clear before gliding (ms). */
const NAV_AFTER_CLOSE = 260;

interface Origin {
  x: number;
  y: number;
  radius: number;
}

const FALLBACK_ORIGIN: Origin = { x: 0, y: 0, radius: 0 };

export interface MobileMenuProps {
  navLinks: readonly NavLink[];
  cta: CtaLink;
  socials: readonly SocialLink[];
  /** Same frosted-panel treatment as the rest of the header. */
  panelClassName: string;
}

export const MobileMenu = ({
  navLinks,
  cta,
  socials,
  panelClassName,
}: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<Origin>(FALLBACK_ORIGIN);
  /** Whether closing should hand focus back to the toggle. */
  const restoreFocus = useRef(false);

  const measureOrigin = () => {
    const toggle = toggleRef.current;
    if (!toggle) return;
    const rect = toggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    // Far enough to reach the furthest corner from the toggle.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    setOrigin({ x, y, radius });
  };

  const close = useCallback((returnFocus: boolean) => {
    restoreFocus.current = returnFocus;
    setOpen(false);
  }, []);

  const toggle = () => {
    if (open) {
      close(true);
      return;
    }
    measureOrigin();
    setOpen(true);
  };

  // Scroll lock, Escape, focus trap and `inert` on the page behind.
  useEffect(() => {
    if (!open) return;

    const { stop, start } = useScroll.getState();
    const toggleButton = toggleRef.current;
    stop();
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel || !toggleButton) return;
      const focusables = [
        toggleButton,
        ...panel.querySelectorAll<HTMLElement>("a[href], button"),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // Into the panel once it exists (it mounts in this same commit).
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus({
      preventScroll: true,
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      start();
      if (restoreFocus.current) toggleButton?.focus({ preventScroll: true });
      restoreFocus.current = false;
    };
  }, [open, close]);

  // Same-page anchors: close first, then glide once the page is scrollable.
  const handleNavClick = (event: ReactMouseEvent<HTMLElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (!href?.startsWith("#")) {
      if (anchor) close(false);
      return;
    }
    event.preventDefault();
    close(false);
    window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    }, NAV_AFTER_CLOSE);
  };

  const transitions = useTransition(open, {
    from: { reveal: 0 },
    enter: { reveal: 1, config: OPEN_SPRING },
    leave: { reveal: 0, config: CLOSE_SPRING },
  });

  return (
    <div className="pointer-events-auto">
      {transitions(
        (style, isOpen) =>
          isOpen && (
            <MenuPanel
              id={panelId}
              ref={panelRef}
              open={open}
              reveal={style.reveal}
              origin={origin}
              navLinks={navLinks}
              cta={cta}
              socials={socials}
              onNavClick={handleNavClick}
            />
          ),
      )}

      {/* Above the panel, so the same control closes what it opened. */}
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
        className={`${panelClassName} relative z-10 flex size-11 items-center justify-center`}
      >
        <span aria-hidden="true" className="flex flex-col gap-[0.3125rem]">
          <span
            className={`block h-px w-5 bg-foreground transition-transform duration-[var(--duration-normal)] ease-entrance ${
              open ? "translate-y-[0.34375rem] rotate-45 bg-action-primary-foreground!" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-opacity duration-[var(--duration-fast)] ease-entrance ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-transform duration-[var(--duration-normal)] ease-entrance ${
              open ? "-translate-y-[0.34375rem] -rotate-45 bg-action-primary-foreground!" : ""
            }`}
          />
        </span>
      </button>
    </div>
  );
};

interface MenuPanelProps {
  id: string;
  ref: Ref<HTMLDivElement>;
  open: boolean;
  reveal: SpringValue<number>;
  origin: Origin;
  navLinks: readonly NavLink[];
  cta: CtaLink;
  socials: readonly SocialLink[];
  onNavClick: (event: ReactMouseEvent<HTMLElement>) => void;
}

const MenuPanel = ({
  id,
  ref,
  open,
  reveal,
  origin,
  navLinks,
  cta,
  socials,
  onNavClick,
}: MenuPanelProps) => {
  // Every row of the panel: the links, then the CTA, then the socials line.
  const rowCount = navLinks.length + 2;
  const [rows] = useSprings(
    rowCount,
    (index) => ({
      from: { y: 110 },
      to: { y: open ? 0 : 110 },
      delay: open
        ? ENTER_LEAD + index * ENTER_STAGGER
        : (rowCount - 1 - index) * LEAVE_STAGGER,
      config: LINK_SPRING,
    }),
    [open],
  );

  const rise = (index: number) => ({
    transform: rows[index].y.to((value) => `translate3d(0, ${value}%, 0)`),
  });

  return (
    <animated.div
      ref={ref}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onClickCapture={onNavClick}
      className="fixed inset-0 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-accent px-5 pt-28 pb-10 text-action-primary-foreground will-change-[clip-path] md:px-10"
      style={{
        clipPath: reveal.to(
          (value) =>
            `circle(${value * origin.radius}px at ${origin.x}px ${origin.y}px)`,
        ),
      }}
    >
      <nav aria-label="Primary" className="flex flex-1 flex-col">
        <ul className="flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <li key={link.href} className="overflow-hidden">
              <animated.div style={rise(index)}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="group/menu-link relative isolate flex w-fit max-w-full text-[clamp(2.5rem,12vw,4rem)] leading-display font-light tracking-[-0.03em] focus-visible:outline-none"
                >
                  <span className="flex min-w-0 items-baseline gap-4 py-2 pr-6 pl-3 md:pr-9 [text-box:normal]">
                    <span className="shrink-0 text-sm leading-body font-medium tracking-normal opacity-85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-balance [text-box:normal]">{link.label}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex min-w-0 items-baseline gap-4 rounded-action bg-surface-section-deep py-2 pr-6 pl-3 text-accent md:pr-9 [text-box:normal] [clip-path:inset(50%_0_50%_100%_round_var(--raw-radius-pill))] transition-[clip-path] duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover/menu-link:[clip-path:inset(0_round_var(--raw-radius-pill))] group-focus-visible/menu-link:[clip-path:inset(0_round_var(--raw-radius-pill))] motion-reduce:transition-none"
                  >
                    <span className="shrink-0 text-sm leading-body font-medium tracking-normal opacity-85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-balance [text-box:normal]">{link.label}</span>
                  </span>
                </Link>
              </animated.div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex w-full flex-col gap-6 md:max-w-sm">
        <div className="-m-1.5 overflow-hidden p-1.5">
          <animated.div style={rise(navLinks.length)}>
            <ArrowFillButton href={cta.href} className="w-full border-action-secondary-border text-xl font-light focus-visible:outline-background">
              {cta.label}
            </ArrowFillButton>
          </animated.div>
        </div>
        <div className="overflow-hidden">
          <animated.ul
            style={rise(navLinks.length + 1)}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {socials.map((social) => (
              <li key={social.icon}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-6 items-center text-base leading-body font-light opacity-85 transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-100"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </animated.ul>
        </div>
      </div>
    </animated.div>
  );
};
