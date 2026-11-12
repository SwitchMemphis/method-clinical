"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_FIELDS, REGISTRATION_CONTENT as content } from "@/data/mocks/registration";
import { BusinessFields } from "./business-fields";
import { Choice, Field, FormSection, controlClass, labelClass } from "./form-fields";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

const contactFieldSpans: Record<string, string> = {
  suffix: "col-span-2 sm:col-span-2",
  phone: "col-span-2 sm:col-span-4",
  email: "col-span-2 sm:col-span-6",
};

interface ApplicationPreview { company: string; contact: string; email: string }

export function RegistrationForm() {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [referral, setReferral] = useState("");
  const [preview, setPreview] = useState<ApplicationPreview | null>(null);
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPreview({ company: String(data.get("company") ?? ""), contact: `${data.get("firstName")} ${data.get("lastName")}`, email: String(data.get("email") ?? "") });
  }
  return <form onSubmit={review} onChange={() => setPreview(null)} className="flex min-w-0 flex-col gap-4 rounded-card border border-border-subtle bg-surface-section-deep p-3 sm:gap-6 sm:p-6" aria-label="Clinic registration" aria-describedby="registration-preview">
    <p className="-mb-3 hidden text-utility-small leading-relaxed text-foreground-muted sm:block">{content.desktopHelper}</p>
    <FormSection number={1} title={content.steps[0]} gridClassName="grid-cols-2 sm:grid-cols-6">
      {CONTACT_FIELDS.map(field => <Field key={field.name} {...field} className={contactFieldSpans[field.name] ?? "sm:col-span-3"} />)}
    </FormSection>
    <FormSection number={2} title={content.steps[1]}><BusinessFields /></FormSection>
    <FormSection number={3} title={content.steps[2]}>
      <Field name="address" label="Address line 1" autoComplete="address-line1" required full />
      <Field name="address2" label="Suite, unit or address line 2" autoComplete="address-line2" full />
      <Field name="city" label="City" autoComplete="address-level2" required />
      <label className={labelClass} htmlFor="state"><span>State <span className="text-accent">*</span></span>
        <select id="state" name="state" autoComplete="address-level1" required defaultValue="" className={controlClass}><option value="">Select state</option>{content.states.map(state => <option key={state}>{state}</option>)}</select>
      </label>
      <Field name="zip" label="ZIP code" autoComplete="postal-code" required inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a five-digit ZIP code or ZIP+4." maxLength={10} />
    </FormSection>
    <FormSection number={4} title={content.steps[3]}>
      <Choice name="hasRep" label="Is a sales representative working with you?" value={referral} onChange={setReferral} />
      {referral === "Yes" && <Field name="salesRep" label="Sales representative name or code" required full />}
    </FormSection>
    <FormSection number={5} title={content.steps[4]}>
      <label className={`${labelClass} sm:col-span-2`} htmlFor="notes"><span>Anything else we should know? <span className="font-normal text-foreground-muted">(optional)</span></span>
        <textarea id="notes" name="notes" rows={4} maxLength={3000} className={`${controlClass} resize-y`} placeholder="Tell us about your practice or what you’re looking for." />
      </label>
    </FormSection>
    <div className="flex flex-col gap-4 pt-2">
      <Button type="submit" disabled={!ready} motion="subtle" className="min-h-utility-control w-full rounded-panel px-4 text-base font-semibold whitespace-normal">{content.review}</Button>
      <p id="registration-preview" className="text-center text-utility-small leading-relaxed text-foreground-muted">{content.preview} <Link className="underline underline-offset-4 hover:text-accent" href="/privacy-policy/">Privacy notice</Link></p>
    </div>
    {preview && <section role="status" aria-live="polite" className="flex flex-col gap-4 rounded-panel border border-accent bg-surface-section p-5">
      <h2 className="text-registration-section-title font-semibold text-accent">{content.reviewTitle}</h2>
      <p className="text-utility-body leading-relaxed">{preview.company}<br />{preview.contact}<br />{preview.email}</p>
      <p className="text-utility-body leading-relaxed text-foreground-muted">{content.reviewNotice}</p>
    </section>}
  </form>;
}
