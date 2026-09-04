import type { MetadataRoute } from "next";
import { legalSlugs, legalVersion } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // The legal documents share one reviewed publication date, so it is also the
  // honest lastModified for every legal route.
  const legalUpdated = new Date(legalVersion.lastUpdated);

  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/legal`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.5 },
    ...legalSlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: legalUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
