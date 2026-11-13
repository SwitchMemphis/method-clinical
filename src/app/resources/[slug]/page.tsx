import { notFound } from "next/navigation";

import { RESOURCES, resourcePath } from "@/data/resources";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";
import { ResourceArticleView } from "@/views/resources";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return RESOURCES.map(({ slug }) => ({ slug }));
}

async function findGuide(params: Props["params"]) {
  const { slug } = await params;
  const guide = RESOURCES.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({ params }: Props) {
  const guide = await findGuide(params);
  return pageMetadata({ title: `${guide.title} | Mint Clinical`, description: guide.summary, url: resourcePath(guide.slug) });
}

export default async function ResourceArticlePage({ params }: Props) {
  return <ResourceArticleView guide={await findGuide(params)} />;
}
