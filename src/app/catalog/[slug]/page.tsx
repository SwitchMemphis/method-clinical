import { notFound } from "next/navigation";

import { catalog } from "@/data/mocks/catalog";
import { CatalogProductView } from "@/views/catalog/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = catalog.find((entry) => entry.slug === slug);
  if (!product) notFound();
  return {
    title: `${product.name} | Method Clinical Catalog Preview`,
    robots: { index: false, follow: false },
  };
}

export default async function CatalogProductPage({ params }: Props) {
  const { slug } = await params;
  const product = catalog.find((entry) => entry.slug === slug);
  if (!product) notFound();
  return <CatalogProductView product={product} related={catalog.filter((entry) => entry.category === product.category && entry.slug !== slug).slice(0, 5)} />;
}
