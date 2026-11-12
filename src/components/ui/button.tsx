// 📖 Docs: obsidian/frontend/components/ui.md

/**
 * Pill action — the design's only button shape.
 *
 * Figma nodes `1546:199` (primary), `1546:201` (secondary) and `1572:533`
 * (primary with the trailing arrow disc). Renders a real `<a>` when `href` is
 * given and a real `<button>` otherwise, so the element always matches what it
 * does ([[html-semantics]]).
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { InteractiveHoverContent, interactiveHoverClasses } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

import { ArrowUpRightIcon } from "@/components/ui/icons";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Renders an `<a>`; omit for a `<button>`. */
  href?: string;
  /** Trailing arrow disc, as on the header's "Contact Us". */
  withArrow?: boolean;
  /** Use stationary copy with color and press feedback. */
  motion?: "slide" | "subtle";
  /** Only meaningful without `href`. */
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-action border text-xl leading-body font-light whitespace-nowrap transition-colors duration-[var(--duration-fast)] ease-entrance";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-action-primary border-action-primary-border text-action-primary-foreground",
  secondary:
    "bg-action-secondary border-action-secondary-border text-action-secondary-foreground",
};

const SUBTLE_MOTION_CLASSES: Record<ButtonVariant, string> = {
  primary: "hover:bg-[color-mix(in_srgb,var(--action-primary),white_12%)]",
  secondary: "hover:border-accent/65 hover:bg-accent/10",
};

// Heights come straight from the mockup's frames — 48 for a plain pill
// (`1546:199`), 54 for the arrow variant (`1572:533`), where the 48px disc sits
// with only 3px either side. Driving height by padding instead lands at 80 and
// throws the header off by half its height.
const SIZE_CLASSES = {
  plain: "min-h-12 px-8 py-2",
  arrow: "min-h-[3.375rem] gap-2.5 pr-0.5 pl-8",
};

export const Button = ({
  children,
  variant = "primary",
  href,
  withArrow = false,
  motion = "slide",
  type = "button",
  className,
  disabled = false,
}: ButtonProps) => {
  const subtleMotion = motion === "subtle";
  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    withArrow ? SIZE_CLASSES.arrow : SIZE_CLASSES.plain,
    disabled && "cursor-not-allowed",
    !disabled && !subtleMotion && interactiveHoverClasses,
    !disabled && subtleMotion && [
      "transition-[background-color,border-color,scale] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary motion-safe:active:scale-[.98] motion-reduce:transition-none",
      SUBTLE_MOTION_CLASSES[variant],
    ],
    className,
  );

  const arrow = withArrow && (
    <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-action-secondary text-action-secondary-foreground">
      <ArrowUpRightIcon className="size-4" />
    </span>
  );
  const content = disabled || subtleMotion ? (
    <><span className="text-trim">{children}</span>{arrow}</>
  ) : (
    <InteractiveHoverContent idleArrow={arrow}>{children}</InteractiveHoverContent>
  );

  if (href) {
    return (
      // A same-page anchor (`#contact`) has nothing to prefetch but this page.
      <Link
        href={href}
        prefetch={href.startsWith("#") ? false : undefined}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};
