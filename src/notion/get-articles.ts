import { type DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { type ArticleListUI, pageSchema } from "./schemas";
import { blogDatabaseId, notion } from ".";

import { getBase64 } from "~/lib/getBase64";

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
  const articles = (await Promise.all(
    parsedProps.map(async (article) => ({
      title: article.properties.Name.title[0].plain_text,
      description: article.properties.Description.rich_text[0].plain_text,
      created: article.properties.Created.created_time,
      slug: article.properties.slug.formula.string,
      id: article.id,
      cover: {
        src: article.cover.external?.url ?? article.cover.file?.url ?? "",
        blurData:
          (await getBase64(
            article.cover.external?.url ?? article.cover.file?.url ?? "",
          )) ?? "",
      },
    })),
  )) satisfies ArticleListUI[];
  return articles;
};
