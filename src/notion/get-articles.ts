import { type DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { type ArticleListUI, pageSchema } from "./schemas";
import { blogDatabaseId, notion } from ".";

export const getArticles = async () => {
  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    filter: {
      or: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });
  const results = response.results as DatabaseObjectResponse[];
  const parsedProps = pageSchema.parse(results);
  return parsedProps.map((article) => ({
    title: article.properties.Name.title[0].plain_text,
    description: article.properties.Description.rich_text[0].plain_text,
    created: article.properties.Created.created_time,
    slug: article.properties.slug.formula.string,
    id: article.id,
    cover: article.cover.external?.url ?? article.cover.file?.url,
  })) as ArticleListUI[];
};
