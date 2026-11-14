"use client";

import { useState } from "react";

const options = [
  {
    label: "Set / reset password",
    message: "Password setup and reset are unavailable in this preview.",
  },
  {
    label: "Email me a link",
    message: "Email sign-in links are unavailable in this preview.",
  },
];

export function AccountAccessOptions() {
  const [message, setMessage] = useState("");

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => setMessage(option.message)}
            className="min-h-utility-target cursor-pointer text-start text-utility-body font-medium text-accent underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-accent"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p id="login-preview" className="mt-2 text-utility-small leading-relaxed text-foreground-muted" role="status">
        {message || "Preview only. Account sign-in is unavailable."}
      </p>
      <p className="mt-3 border-t border-border-subtle pt-3 text-center text-utility-small leading-relaxed text-foreground-muted">
        Ordered as a guest before? Use the email address from your order when setting up access.
      </p>
    </div>
  );
}
