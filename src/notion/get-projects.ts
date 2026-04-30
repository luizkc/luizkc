import { hasProjectsDatabaseConfig, notion, projectsDatabaseId } from "./";
import { NotionApiResult } from "./schemas.notion";
import { projectsSchema } from "./schemas.user";

export const getProjects = async () => {
  if (!hasProjectsDatabaseConfig) {
    return [];
  }

  const response = await notion.databases.query({
    database_id: projectsDatabaseId,
    filter: {
      or: [
        {
          property: "published",
          checkbox: {
            equals: true,
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
  const results = NotionApiResult.parse(response.results);
  const parsedProps = projectsSchema.parse(results);
  return parsedProps;
};
