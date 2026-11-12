"use client";

import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import Link from "next/link";
import type { ComponentPropsWithRef, PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ShimmerAppearance = {
  children: ReactNode;
  variant?: "default" | "secondary";
  size?: "default" | "sm" | "lg";
  shimmerColor?: string;
};

export type ShimmerButtonProps = ShimmerAppearance & (
  | (Omit<ComponentPropsWithRef<typeof Link>, "href"> & { href: string })
  | (ComponentPropsWithRef<"button"> & { href?: undefined })
);

const SIZE_CLASSES = {
  default: "min-h-utility-target px-5 py-2 text-base",
  sm: "min-h-utility-target px-4 py-2 text-sm",
  lg: "min-h-12 px-8 py-3 text-lg",
};

const VARIANT_CLASSES = {
  default: "border-action-primary-border bg-action-primary text-action-primary-foreground hover:bg-action-primary-border disabled:hover:bg-action-primary",
  secondary: "border-action-secondary-border bg-action-secondary text-action-secondary-foreground hover:bg-action-secondary-border disabled:hover:bg-action-secondary",
};

export function ShimmerButton({
  children,
  variant = "default",
  size = "default",
  shimmerColor = "var(--action-primary-border)",
  className,
  ...props
}: ShimmerButtonProps) {
  const reducedMotion = useReducedMotion();
  const [{ x, opacity }, spring] = useSpring(() => ({
    x: -18,
    opacity: 0,
    config: { tension: 280, friction: 28 },
  }));

  function followPointer(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType === "touch") return;

    const { left, width } = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - left) / width * 100;
    if (Number.isFinite(position)) {
      const rounded = Math.round(position / 5) * 5;
      void spring.start({ x: Math.max(0, Math.min(100, rounded)), opacity: 1 });
    }
  }

  function hideShimmer() {
    void spring.start({ opacity: 0 });
  }

  const classes = cn(
    "relative isolate inline-flex items-center justify-center overflow-hidden rounded-action border font-semibold leading-body whitespace-nowrap transition-colors duration-[var(--duration-fast)] ease-entrance",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50",
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  );

  const content = (
    <>
      <animated.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-2 w-1/2 -translate-x-1/2 -skew-x-20 motion-reduce:hidden"
        style={{
          left: x.to((position) => `${position}%`),
          opacity,
          backgroundImage: `linear-gradient(90deg, transparent, ${shimmerColor}, color-mix(in srgb, ${shimmerColor}, white 70%), ${shimmerColor}, transparent)`,
        }}
      />
      <span className="relative text-trim">{children}</span>
    </>
  );

  if (props.href !== undefined) {
    const { href, prefetch, onPointerMove, onPointerLeave, ...linkProps } = props;
    return (
      <Link
        {...linkProps}
        href={href}
        prefetch={prefetch ?? (href.startsWith("#") ? false : undefined)}
        className={classes}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (!event.defaultPrevented) followPointer(event);
        }}
        onPointerLeave={(event) => {
          hideShimmer();
          onPointerLeave?.(event);
        }}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, onPointerMove, onPointerLeave, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={classes}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!disabled && !event.defaultPrevented) followPointer(event);
      }}
      onPointerLeave={(event) => {
        hideShimmer();
        onPointerLeave?.(event);
      }}
    >
      {content}
    </button>
  );
}
