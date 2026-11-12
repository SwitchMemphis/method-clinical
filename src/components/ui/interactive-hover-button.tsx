import React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export const interactiveHoverClasses =
  "group/action relative isolate overflow-hidden hover:bg-background focus-visible:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary";

export function InteractiveHoverContent({
  children,
  idleArrow,
}: {
  children: React.ReactNode;
  idleArrow?: React.ReactNode;
}) {
  return (
    <>
      <span className={cn(
        "relative z-10 flex min-w-0 flex-1 items-center gap-2.5 transition-opacity duration-300 group-hover/action:opacity-0 group-focus-visible/action:opacity-0 motion-safe:transition-[transform,opacity] motion-safe:group-hover/action:translate-x-5 motion-safe:group-focus-visible/action:translate-x-5 motion-reduce:transition-none",
        idleArrow ? "justify-between" : "justify-center",
      )}>
        <span className="text-trim">{children}</span>
        {idleArrow}
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 px-3 text-accent opacity-0 transition-opacity duration-300 group-hover/action:opacity-100 group-focus-visible/action:opacity-100 motion-safe:translate-x-5 motion-safe:transition-[transform,opacity] motion-safe:group-hover/action:translate-x-0 motion-safe:group-focus-visible/action:translate-x-0 motion-reduce:transition-none">
        <span className="text-trim">{children}</span>
        <ArrowRight className="size-4 shrink-0" />
      </span>
    </>
  );
}

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", children, className, disabled, type = "button", ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full border border-action-primary-border bg-action-primary px-8 py-2 font-semibold text-action-primary-foreground disabled:cursor-not-allowed",
        !disabled && interactiveHoverClasses,
        className,
      )}
    >
      {disabled ? children ?? text : <InteractiveHoverContent>{children ?? text}</InteractiveHoverContent>}
    </button>
  ),
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
