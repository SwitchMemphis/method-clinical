import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import { AccountAccessOptions } from "./account-access-options";

export const loginMetadata = generateMetadata({
  title: "Sign in | Mint Clinical",
  description: "Sign in to the Mint Clinical provider portal.",
  url: "/login/",
});

const inputClass =
  "min-h-utility-control w-full rounded-panel border border-border-subtle bg-surface-section px-4 py-3 text-utility-body placeholder:text-foreground-muted";

export function LoginView() {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-surface-section">
      <Image src="/assets/clinic-growth-analytical-lab.webp" alt="" fill sizes="100vw" priority className="-z-20 object-cover object-right" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-surface-section/90 via-surface-section/45 to-surface-section/90 lg:bg-linear-to-r lg:from-surface-section/90 lg:via-surface-section/35 lg:to-surface-section/50" />
      <header className="mx-auto flex w-full max-w-utility-content items-center justify-between gap-3 px-utility-gutter py-6">
        <Link href="/" aria-label="Mint Clinical home" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Image src="/assets/mint-clinical-wordmark.png" width={548} height={175} alt="Mint Clinical" className="h-auto w-utility-logo-compact sm:w-utility-logo" priority />
        </Link>
        <Link href="/" className="flex min-h-utility-target items-center gap-2 text-utility-body text-foreground hover:text-accent">
          <ArrowLeft size={16} aria-hidden="true" /> Back to site
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-utility-content flex-1 items-center gap-10 px-utility-gutter pt-8 pb-utility-section lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
        <aside aria-label="About the provider portal" className="@container hidden min-w-0 lg:block">
          <p className="text-utility-label font-semibold tracking-widest text-accent uppercase">Mint Clinical provider portal</p>
          <p className="mt-4 text-[length:min(3rem,8.5cqi)] leading-display font-extrabold tracking-tight whitespace-nowrap">
            Wholesale supply for <span className="block text-accent">licensed providers.</span>
          </p>
          <p className="mt-5 max-w-sm text-utility-body leading-relaxed text-foreground-muted">Seven-layer tested, with a Certificate of Analysis on every lot.</p>
        </aside>

        <section aria-labelledby="login-heading" className="mx-auto w-full max-w-lg rounded-card border border-border-subtle bg-surface-section-deep/95 p-6 shadow-xl backdrop-blur-sm sm:p-9 lg:mr-0">
          <p className="text-utility-label font-semibold tracking-widest text-accent uppercase">Provider portal</p>
          <h1 id="login-heading" className="mt-3 text-4xl leading-display font-extrabold tracking-tight">Sign in</h1>
          <p className="mt-3 text-utility-body leading-relaxed text-foreground-muted">Use your work email to access your wholesale account.</p>

          <fieldset disabled aria-describedby="login-preview" className="mt-7 grid min-w-0 gap-5">
            <legend className="sr-only">Sign-in preview</legend>
            <label className="grid gap-2 text-utility-body font-medium">
              Email address
              <input type="email" placeholder="you@clinic.com" className={inputClass} />
            </label>
            <label className="grid gap-2 text-utility-body font-medium">
              Password
              <input type="password" placeholder="Your password" className={inputClass} />
            </label>
            <Button disabled className="w-full text-utility-body font-semibold">
              <span className="text-surface-section">Sign in</span>
            </Button>
          </fieldset>
          <AccountAccessOptions />

          <div className="mt-7 border-t border-border-subtle pt-6">
            <h2 className="text-utility-section-title font-semibold">New to Mint Clinical?</h2>
            <Link href="/register/" className="inline-flex min-h-utility-target items-center gap-2 text-utility-body font-semibold text-accent underline-offset-4 hover:underline">
              Register your clinic <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
