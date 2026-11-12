"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { categories, catalogProductUrl, productForm, type CatalogProduct } from "@/data/mocks/catalog";

import { MolecularFormula } from "./molecular-formula";

const referenceStrengths = ["1 mg", "2 mg", "5 mg", "10 mg", "10 iu", "10 mL", "15 mg", "16 mg", "20 mg", "30 mL", "30 mg", "40 mg"];
const forms = ["Lyophilized (vial)", "Liquid / spray"];
const filters = ["Categories", "Strength", "Form"] as const;
type FilterName = typeof filters[number];
const filterOptions = { Categories: categories, Strength: referenceStrengths, Form: forms };
const initialFilters: Record<FilterName, string[]> = { Categories: [], Strength: [], Form: [] };

export function CatalogBrowser({ products }: { products: readonly CatalogProduct[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(initialFilters);
  const needle = query.trim().toLowerCase();
  const matches = products.filter((p) =>
    [p.name, p.subtitle, p.category, p.formula].some((value) => value.toLowerCase().includes(needle))
    && (!selected.Categories.length || selected.Categories.includes(p.category))
    && (!selected.Form.length || selected.Form.includes(productForm(p)))
    && (!selected.Strength.length || selected.Strength.some((strength) =>
      p.strengths.some((value) => value.toLowerCase().split(/\s*(?:\/|\+|·)\s*/).includes(strength.toLowerCase())),
    )),
  );

  function toggle(group: FilterName, value: string) {
    setSelected((current) => ({
      ...current,
      [group]: current[group].includes(value)
        ? current[group].filter((option) => option !== value)
        : [...current[group], value],
    }));
  }

  function reset() {
    setSelected(initialFilters);
    setQuery("");
  }

  return (
    <section aria-label="Browse catalog" className="mt-8">
      <div aria-label="Browse by category" className="flex flex-wrap gap-1.5">
        {categories.map((category) => (
          <button key={category} type="button" aria-pressed={selected.Categories.includes(category)} onClick={() => toggle("Categories", category)} className="min-h-8 cursor-pointer rounded-full border border-border-subtle px-3 text-xs font-semibold pointer-coarse:min-h-11 text-foreground-muted hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-action-primary-foreground">
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[clamp(12rem,15vw,15rem)_minmax(0,1fr)]">
        <aside aria-label="Catalog filters" className="rounded-card border border-border-subtle bg-surface-section-deep p-4">
          <h2 className="flex items-center gap-2 font-semibold"><SlidersHorizontal size={16} aria-hidden="true" className="text-accent" /> Filter products</h2>
          <label className="mt-4 block">
            <span className="sr-only">Search products</span>
            <span className="relative block">
              <Search size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-foreground-muted" />
              <input type="search" placeholder="Search catalog" value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-11 w-full rounded-panel border border-border-subtle bg-surface-section px-3 pl-9 text-base focus-visible:outline-accent" />
            </span>
          </label>
          {filters.map((group) => (
            <details key={group} className="mt-4 border-t border-border-subtle pt-2">
              <summary className="cursor-pointer py-2 text-sm font-semibold">{group}{selected[group].length ? ` (${selected[group].length})` : ""}</summary>
              <div className="mt-1 grid gap-1">
                {filterOptions[group].map((option) => (
                  <label key={option} className="flex min-h-8 cursor-pointer items-center gap-2 text-sm text-foreground-muted">
                    <input type="checkbox" checked={selected[group].includes(option)} onChange={() => toggle(group, option)} className="accent-accent" /> {option}
                  </label>
                ))}
              </div>
            </details>
          ))}
          <button type="button" onClick={reset} className="mt-4 min-h-11 cursor-pointer text-sm text-accent underline underline-offset-4">Clear filters</button>
        </aside>

        <div className="min-w-0 rounded-card border border-border-subtle bg-surface-section-deep">
          <header className="flex flex-wrap items-baseline justify-between gap-2 p-5">
            <h2 className="text-xl font-semibold">{selected.Categories.length === 1 ? selected.Categories[0] : "All products"}</h2>
            <p role="status" className="text-sm text-foreground-muted">{matches.length} {matches.length === 1 ? "product" : "products"}</p>
          </header>
          {matches.length ? (
            <div className="overflow-x-auto rounded-b-card" tabIndex={0} role="region" aria-label="Product comparison table">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="border-y border-border-subtle bg-surface-section text-foreground-muted">
                  <tr>{["Product", "Molecular formula", "Available strengths", "Purity", "View"].map((label, i) => <th key={label} scope="col" className={`px-4 py-3 ${i === 1 || i === 3 ? "hidden md:table-cell" : ""}`}>{label}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {matches.map((p) => (
                    <tr key={p.slug}>
                      <th scope="row" className="px-4 py-4">
                        <Link href={catalogProductUrl(p.slug)} prefetch={false} className="flex items-center gap-3 hover:text-accent">
                          {p.images[0] ? (
                            <Image src={p.images[0]} alt="" width={48} height={48} className="size-10 shrink-0 rounded-panel border border-border-subtle object-contain sm:size-12" />
                          ) : (
                            <span aria-hidden="true" className="hidden size-12 shrink-0 place-items-center rounded-panel border border-border-subtle text-accent sm:grid"><FlaskConical size={18} /></span>
                          )}
                          <span>{p.name}{p.subtitle && <small className="mt-1 block font-normal text-foreground-muted">{p.subtitle}</small>}</span>
                        </Link>
                      </th>
                      <td className="hidden px-4 py-4 text-foreground-muted [overflow-wrap:anywhere] md:table-cell"><MolecularFormula value={p.formula} /></td>
                      <td className="px-4 py-4 text-foreground-muted">{p.strengths.join(" · ")}</td>
                      <td className="hidden px-4 py-4 text-foreground-muted md:table-cell">{p.purity}</td>
                      <td className="px-4 py-4"><Link href={catalogProductUrl(p.slug)} prefetch={false} aria-label={`View ${p.name}`} className="inline-flex min-h-11 items-center gap-1 font-semibold text-accent">View <ArrowUpRight size={14} aria-hidden="true" /></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="border-t border-border-subtle p-5 text-foreground-muted">No products match. Try another search or clear the filters.</p>}
        </div>
      </div>
    </section>
  );
}
