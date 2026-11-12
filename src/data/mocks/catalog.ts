import reference from "./catalog-reference.json";

export interface CatalogProduct {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  formula: string;
  strengths: string[];
  purity: string;
  images: string[];
  specs: Partial<Record<string, string>>;
}

export const catalog: readonly CatalogProduct[] = reference;
export const categories = [
  "GLP-1 & Metabolic", "Research Peptides", "Peptide Blends", "Liquid Sprays",
  "Dissolving Strips", "Bioregulators", "Lab Supplies",
];

export function productForm(product: CatalogProduct) {
  const form = product.specs["Physical Form"] ?? "";
  if (/nasal spray/i.test(product.name)) return "Liquid / spray";
  if (/lyophilized/i.test(form)) return "Lyophilized (vial)";
  if (/liquid|spray/i.test(form) || /spray/i.test(product.name)) return "Liquid / spray";
  return "";
}

export const catalogProductUrl = (slug: string) => `/catalog/${slug}/`;
