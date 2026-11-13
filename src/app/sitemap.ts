import type { MetadataRoute } from "next";

import { RESOURCES, resourcePath } from "@/data/resources";
import { siteConfig } from "@/lib/site";

/**
 * Generates `/sitemap.xml` — one entry per public route.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/resources/`, changeFrequency: "monthly", priority: 0.6 },
    ...RESOURCES.map(({ slug }) => ({ url: `${siteConfig.url}${resourcePath(slug)}`, changeFrequency: "yearly" as const, priority: 0.5 })),
    ...["register", "policies"].map(path => ({ url: `${siteConfig.url}/${path}/`, changeFrequency: "monthly" as const, priority: 0.3 })),
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

export const dynamic = "force-static";
