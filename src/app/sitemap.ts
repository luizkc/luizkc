import { type MetadataRoute } from "next";

import { getBaseUrl } from "~/lib/getbaseUrl";
import { getArticles } from "~/notion/get-articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const baseUrl = getBaseUrl();
  const articleMap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.created),
    changeFrequency: "never" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articleMap,
  ];
}
