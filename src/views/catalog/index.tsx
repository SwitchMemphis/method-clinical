import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { catalog } from "@/data/mocks/catalog";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import { CatalogBrowser } from "./catalog-browser";

export const catalogMetadata = {
  ...generateMetadata({
    title: "Wholesale catalog | Method Clinical",
    description: "Browse the Method Clinical wholesale catalog preview.",
    url: "/catalog/",
  }),
  robots: { index: false, follow: false },
};

export function CatalogView() {
  return (
    <div className="bg-surface-section">
      <header className="flex w-full items-center justify-between gap-3 px-utility-gutter py-6">
        <Link href="/" aria-label="Method Clinical home">
          <Image src="/assets/flow-logo.png" width={548} height={175} alt="Method Clinical" className="h-auto w-utility-logo-compact sm:w-utility-logo" priority />
        </Link>
        <Link href="/" className="flex min-h-utility-target items-center gap-2 text-utility-body text-foreground-muted hover:text-accent">
          <ArrowLeft size={16} aria-hidden="true" /> Back to site
        </Link>
      </header>

      <main className="w-full px-utility-gutter pb-utility-section pt-6">
        <section className="relative isolate overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep md:flex md:min-h-64 md:items-center lg:min-h-72">
          <div className="relative z-10 p-6 pb-2 md:max-w-[55%] md:p-10">
            <p className="text-utility-label font-semibold tracking-widest text-accent uppercase">Provider portal · Catalog preview</p>
            <h1 className="mt-4 text-4xl leading-display font-extrabold tracking-tight md:text-6xl">Wholesale <span className="text-accent">catalog.</span></h1>
            <p className="mt-4 max-w-lg text-utility-body leading-relaxed text-foreground-muted">
              Browse the reference assortment with Method Clinical packaging mockups. Listings and specifications are for design review. Method Clinical availability and lot results are pending.
            </p>
          </div>
          <div aria-hidden="true" className="pointer-events-none relative h-48 [mask-image:linear-gradient(to_bottom,transparent,black_13%)] sm:h-56 md:absolute md:inset-y-0 md:right-0 md:h-full md:w-auto md:max-w-[62%] md:aspect-[5/2] md:[mask-image:linear-gradient(to_right,transparent,black_40%)]">
            <Image
              src="/assets/method-catalog-banner-purity-label.webp"
              alt=""
              fill
              preload
              sizes="(min-width: 48rem) 62vw, 100vw"
              className="object-cover object-[85%_center] md:object-right"
            />
          </div>
        </section>

        <CatalogBrowser products={catalog} />
      </main>
    </div>
  );
}
