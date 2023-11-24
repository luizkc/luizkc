import { type DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { type ArticleUI, pageSchema } from "./schemas";
import { blogDatabaseId, notion } from ".";

import { getBase64 } from "~/lib/getBase64";

export const getArticle = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    filter: {
      and: [
        {
          property: "Published",
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
        property: "Created",
        direction: "descending",
      },
    ],
  });
  const results = response.results as DatabaseObjectResponse[];
  const parsedProps = pageSchema.parse(results);
  const articles = (await Promise.all(
    parsedProps.map(async (r) => ({
      title: r.properties.Name.title[0].plain_text,
      description: r.properties.Description.rich_text[0].plain_text,
      created: r.properties.Created.created_time,
      id: r.id,
      slug: r.properties.slug.formula.string,
      cover: {
        src: r.cover.external?.url ?? r.cover.file?.url ?? "",
        blurData:
          (await getBase64(r.cover.external?.url ?? r.cover.file?.url ?? "")) ??
          "",
      },
    })),
  )) satisfies ArticleUI[];
  return articles[0];
};
