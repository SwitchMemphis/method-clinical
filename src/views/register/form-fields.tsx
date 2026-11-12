import type { ReactNode } from "react";
import type { RegistrationField } from "@/data/mocks/registration";
import { cn } from "@/lib/utils";

export const controlClass = "min-h-utility-target w-full min-w-0 rounded-panel border border-border-subtle bg-surface-section px-3 py-2 text-utility-body text-foreground placeholder:text-foreground-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const labelClass = "flex flex-col gap-1 text-registration-label font-medium leading-normal text-foreground sm:text-utility-body";

export function Field({ name, label, full, required, className, ...props }: RegistrationField & { className?: string }) {
  return <label className={`${labelClass} ${cn(full && "sm:col-span-2", className)}`} htmlFor={name}>
    <span>{label}{required ? <span className="text-accent"> *</span> : <span className="font-normal text-foreground-muted"> (optional)</span>}</span>
    <input {...props} id={name} name={name} required={required} className={controlClass} />
  </label>;
}

export function FormSection({ number, title, children, gridClassName }: { number: number; title: string; children: ReactNode; gridClassName?: string }) {
  return <fieldset id={`registration-${number}`} className="min-w-0 scroll-mt-8">
    <legend className="mb-2 flex w-full items-center gap-2 text-registration-section-title font-semibold sm:mb-3">
      <span aria-hidden="true" className="flex size-6 shrink-0 items-center sm:size-7 justify-center rounded-panel bg-action-primary text-utility-small font-semibold text-action-primary-foreground">{number}</span>
      {title}
    </legend>
    <div className={cn("grid min-w-0 gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-3", gridClassName)}>{children}</div>
  </fieldset>;
}

export function Choice({ name, label, value, onChange }: { name: string; label: string; value: string; onChange: (value: string) => void }) {
  return <fieldset className="sm:col-span-2">
    <legend className="mb-2 text-registration-label font-medium leading-normal">{label} <span className="text-accent">*</span></legend>
    <div className="grid grid-cols-2 gap-3">
      {["Yes", "No"].map(option => <label key={option} className="flex min-h-utility-target cursor-pointer items-center justify-center gap-3 rounded-panel border border-border-subtle bg-surface-section px-4 text-utility-body has-checked:border-accent has-checked:bg-testing-selected has-checked:text-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent">
        <input type="radio" name={name} value={option} required checked={value === option} onChange={() => onChange(option)} className="accent-accent" />{option}
      </label>)}
    </div>
  </fieldset>;
}
