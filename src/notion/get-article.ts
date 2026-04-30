import { blogDatabaseId, hasBlogDatabaseConfig, notion } from ".";
import { NotionApiResult } from "./schemas.notion";
import { articleSchema } from "./schemas.user";

export const getArticle = async (slug: string) => {
  if (!hasBlogDatabaseConfig) {
    return null;
  }

  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "slug",
          formula: {
            string: {
              equals: slug,
            },
          },
        },
      ],
    },
    sorts: [
      {
        property: "created",
        direction: "descending",
      },
    ],
  });
  if (response.results.length === 0) {
    return null;
  }
  const results = NotionApiResult.parse(response.results);
  const parsed = articleSchema.parse(results[0]);
  return parsed;
};
