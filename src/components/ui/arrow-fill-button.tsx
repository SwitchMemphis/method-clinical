// Adapted from the supplied Hyperiux Vault Arrow Fill Button.
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import styles from "./arrow-fill-button.module.css";

type ArrowFillButtonProps = {
  children: string;
  className?: string;
} & (
  | Omit<ComponentProps<typeof Link>, "children" | "className">
  | (Omit<ComponentProps<"button">, "children" | "className"> & { href?: never })
);

export function ArrowFillButton({
  children,
  className,
  ...props
}: ArrowFillButtonProps) {
  const classes = cn(
    styles.button,
    "relative isolate inline-flex min-h-[3.375rem] max-w-full items-center rounded-action border border-action-primary-border bg-action-primary text-base leading-tight font-semibold text-action-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed",
    className,
  );

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      <span aria-hidden="true" className={cn(styles.label, styles.fill)}>
        {children}
      </span>
    </>
  );

  if (props.href !== undefined) {
    return <Link {...props} className={classes}>{content}</Link>;
  }

  return <button type="button" {...props} className={classes}>{content}</button>;
}
