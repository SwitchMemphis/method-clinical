"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, controlClass, labelClass } from "@/views/register/form-fields";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function WholesalePricingForm() {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [reviewed, setReviewed] = useState(false);

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inquiry = event.currentTarget.querySelector("textarea");
    if (!inquiry?.value.trim()) {
      inquiry?.setCustomValidity("Enter what you would like pricing for.");
      inquiry?.reportValidity();
      return;
    }
    setReviewed(true);
  }

  return (
    <form
      aria-labelledby="wholesale-pricing-heading"
      aria-describedby="pricing-preview"
      onSubmit={review}
      onChange={() => setReviewed(false)}
      className="flex flex-col gap-3 rounded-card border border-border-subtle bg-surface-section-deep p-4 sm:p-5"
    >
      <p className="text-utility-small text-foreground-muted">All fields are required.</p>
      <Field name="pricing-name" label="Full name" autoComplete="name" pattern={".*\\S.*"} required />
      <Field name="pricing-business" label="Clinic or business name" autoComplete="organization" pattern={".*\\S.*"} required />
      <Field name="pricing-email" label="Work email" type="email" autoComplete="email" required />
      <Field
        name="pricing-phone"
        label="Phone number"
        type="tel"
        autoComplete="tel"
        pattern={"(?=(?:[^0-9]*[0-9]){7})[0-9+\\(\\) .\\-]+"}
        title="Enter a phone number with at least seven digits, including the area code."
        required
      />
      <label htmlFor="pricing-inquiry" className={labelClass}>
        <span>What would you like pricing for? <span className="text-accent">*</span></span>
        <textarea
          id="pricing-inquiry"
          name="pricing-inquiry"
          rows={4}
          required
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          className={`${controlClass} resize-y`}
        />
      </label>
      <Button type="submit" disabled={!ready} className="mt-1 w-full rounded-panel text-base font-semibold">
        Submit pricing request
      </Button>
      <p id="pricing-preview" className="text-center text-utility-small text-foreground-muted">
        Preview only. Use sample details. Entries stay in your browser.
      </p>
      {reviewed && (
        <p role="status" className="rounded-panel border border-border-subtle p-3 text-utility-small text-foreground">
          All required fields are complete. This preview did not send your request.
        </p>
      )}
    </form>
  );
}
