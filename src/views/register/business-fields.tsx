"use client";

import { useState } from "react";
import { CREDENTIAL_FIELDS, REGISTRATION_CONTENT } from "@/data/mocks/registration";
import { Choice, Field, controlClass, labelClass } from "./form-fields";

export function BusinessFields() {
  const [owner, setOwner] = useState("");
  const [reseller, setReseller] = useState("");
  return <>
    <div className="grid min-w-0 grid-cols-2 items-end gap-x-3 sm:col-span-2">
      <Field name="company" label="Company name" autoComplete="organization" required />
      <label className={labelClass} htmlFor="businessType"><span>Business type <span className="font-normal text-foreground-muted">(optional)</span></span>
        <select name="businessType" id="businessType" className={controlClass} defaultValue=""><option value="">Select your business type</option>{REGISTRATION_CONTENT.types.map(type => <option key={type}>{type}</option>)}</select>
      </label>
    </div>
    {CREDENTIAL_FIELDS.map(field => <Field key={field.name} {...field} />)}
    <Choice name="npiOwner" label="Does the NPI owner match the contact for this account?" value={owner} onChange={setOwner} />
    {owner === "No" && <Field name="npiOwnerName" label="NPI owner’s full name" required full />}
    <Choice name="reseller" label="Does your business have a reseller’s license?" value={reseller} onChange={setReseller} />
    {reseller === "Yes" && <>
      <Field name="resellerPermit" label="Reseller’s permit number" required full />
      <label htmlFor="certificate" className={`${labelClass} sm:col-span-2`}>
        <span>Reseller’s certificate <span className="text-accent">*</span></span>
        <input id="certificate" name="certificate" type="file" required accept=".pdf,.png,.jpg,.jpeg" aria-describedby="certificate-help" className={`${controlClass} file:mr-3 file:rounded-panel file:border-0 file:bg-testing-selected file:px-3 file:py-2 file:text-accent`}
          onChange={event => {
            const file = event.currentTarget.files?.[0];
            const validType = !file || /\.(pdf|png|jpe?g)$/i.test(file.name);
            event.currentTarget.setCustomValidity(!validType ? "Choose a PDF, PNG or JPG file." : file && file.size > 15 * 1024 * 1024 ? "Choose a file smaller than 15 MB." : "");
            event.currentTarget.reportValidity();
          }} />
        <span id="certificate-help" className="text-utility-small font-normal text-foreground-muted">PDF, PNG or JPG, up to 15 MB. Selected files stay in this browser and are not uploaded.</span>
      </label>
    </>}
  </>;
}
