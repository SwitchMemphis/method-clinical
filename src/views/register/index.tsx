import Image from "next/image";
import Link from "next/link";
import { REGISTRATION_CONTENT as content } from "@/data/mocks/registration";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import { RegistrationForm } from "./registration-form";

export const registrationMetadata = generateMetadata({ title: "Register your clinic | Method Clinical", description: content.description, url: "/register/" });

export function RegisterView() {
  return (
    <div className="bg-surface-section px-utility-gutter pb-utility-section pt-2 sm:pt-4">
      <main className="mx-auto max-w-registration-content">
        <header className="mb-4 flex flex-col items-center gap-2 text-center sm:mb-6 sm:gap-3">
          <Link href="/" aria-label="Method Clinical home" className="flex min-h-utility-target items-center sm:mb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src="/assets/flow-logo.png" width={548} height={175} alt="Method Clinical" className="h-auto w-registration-logo" priority />
          </Link>
          <h1 className="text-registration-title leading-display font-extrabold tracking-tight sm:text-registration-title-desktop">{content.title}</h1>
          <p className="text-utility-label leading-normal text-foreground-muted">{content.description}<span className="block">{content.eligibility}</span><span className="block sm:hidden">{content.helper}</span></p>
        </header>
        <RegistrationForm />
      </main>
    </div>
  );
}
