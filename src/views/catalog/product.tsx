import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, TestTubeDiagonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { catalogProductUrl, type CatalogProduct } from "@/data/mocks/catalog";
import { MolecularFormula } from "./molecular-formula";
import { ProductGallery } from "./product-gallery";
import { ProductOptions, ProductStrengthProvider } from "./product-options";

export function CatalogProductView({ product, related }: { product: CatalogProduct; related: readonly CatalogProduct[] }) {
  const facts = [
    ["Purity", product.purity],
    ["Form", /nasal spray/i.test(product.name) ? "Liquid nasal spray" : product.specs["Physical Form"] ?? "—"],
    ["Available strengths", product.strengths.join(" · ")],
    ["CAS number", product.specs["CAS Number"] ?? "—"],
  ];
  const analytical = [
    ["Molecular formula", product.specs["Molecular Formula"] ?? product.formula],
    ...Object.entries(product.specs).filter(([key]) => ["Molecular Weight", "Amino Acid Count", "Sequence"].includes(key)),
  ];

  return (
    <div className="bg-surface-section">
      <header className="mx-auto flex max-w-utility-content items-center justify-between gap-4 px-utility-gutter py-6">
        <Link href="/" aria-label="Mint Clinical home">
          <Image src="/assets/mint-clinical-wordmark-accent.png" width={548} height={175} alt="Mint Clinical" className="h-auto w-utility-logo-compact sm:w-utility-logo" priority />
        </Link>
        <Link href="/catalog/" className="flex min-h-11 items-center gap-2 text-sm text-foreground-muted hover:text-accent"><ArrowLeft size={16} aria-hidden="true" /> Catalog</Link>
      </header>

      <main className="mx-auto max-w-utility-content px-utility-gutter pb-utility-section pt-4">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-sm text-foreground-muted">
          <Link href="/catalog/" className="text-accent hover:underline">Catalog</Link><span aria-hidden="true">/</span><span>{product.category}</span><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span>
        </nav>

        <ProductStrengthProvider strengths={product.strengths}>
          <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            {product.images.length ? <ProductGallery productName={product.name} images={product.images} /> : (
              <div className="relative isolate grid min-h-48 place-items-center overflow-hidden rounded-card border border-border-subtle bg-surface-section-deep p-6">
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/assets/helix-scene-poster.webp')] bg-cover bg-center opacity-30" />
                <div className="text-center">
                  <TestTubeDiagonal aria-hidden="true" className="mx-auto size-16 text-accent lg:size-24" strokeWidth={1} />
                  <p className="mt-5 text-xs font-semibold tracking-widest text-foreground-muted uppercase">Packaging preview unavailable</p>
                </div>
              </div>
            )}

            <section aria-labelledby="product-title" className="min-w-0 rounded-card border border-border-subtle bg-surface-section-deep p-6 md:p-9">
              <p className="text-utility-label font-semibold tracking-widest text-accent uppercase">{product.category}</p>
              <h1 id="product-title" className="mt-3 text-3xl leading-display font-extrabold tracking-tight [overflow-wrap:anywhere] sm:text-4xl">{product.name}</h1>
              {product.subtitle && <p className="mt-3 text-foreground-muted">{product.subtitle}</p>}
              <dl className="mt-6 grid grid-cols-2 gap-4 rounded-panel border border-border-subtle bg-surface-section p-4 text-sm">
                {facts.map(([label, value]) => <div key={label} className="min-w-0"><dt className="font-semibold">{label}</dt><dd className="mt-1 text-foreground-muted">{value}</dd></div>)}
              </dl>
              {product.strengths.some((value) => value !== "—") && <ProductOptions />}
              <Button href="/register/" withArrow className="mt-6 max-w-full text-base font-semibold whitespace-normal">Register your clinic</Button>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">AP Labs reference data for design review. Mint Clinical availability, pricing, and lot results are pending.</p>
            </section>
          </div>
        </ProductStrengthProvider>

        <section aria-labelledby="product-details" className="mt-8 rounded-card border border-border-subtle bg-surface-section-deep p-6 md:p-8">
          <h2 id="product-details" className="text-2xl font-bold">Product details</h2>
          <details open className="mt-4 border-t border-border-subtle py-3">
            <summary className="cursor-pointer font-semibold">Overview</summary>
            <p className="mt-3 text-sm text-foreground-muted">{product.name} is listed in the {product.category} category in the reference catalog.</p>
          </details>
          <details className="border-t border-border-subtle py-3">
            <summary className="cursor-pointer font-semibold">Analytical data</summary>
            <dl className="mt-3 grid gap-4 text-sm sm:grid-cols-2">
              {analytical.map(([label, value]) => <div key={label} className="min-w-0"><dt className="font-semibold">{label}</dt><dd className="mt-1 text-foreground-muted [overflow-wrap:anywhere]">{label === "Molecular formula" && value ? <MolecularFormula value={value} /> : value}</dd></div>)}
            </dl>
            <p className="mt-4 text-sm text-foreground-muted">Mint Clinical Certificates of Analysis are pending.</p>
          </details>
          <details className="border-t border-border-subtle py-3">
            <summary className="cursor-pointer font-semibold">Storage &amp; handling</summary>
            <p className="mt-3 text-sm text-foreground-muted">Mint Clinical storage and handling documentation is pending.</p>
          </details>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related-products" className="mt-8">
            <h2 id="related-products" className="text-2xl font-bold">Related products</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => <li key={entry.slug}><Link href={catalogProductUrl(entry.slug)} prefetch={false} className="flex h-full min-h-14 items-center justify-between gap-3 rounded-panel border border-border-subtle p-4 font-medium hover:text-accent">{entry.name}<ArrowUpRight aria-hidden="true" size={16} className="shrink-0 text-accent" /></Link></li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
