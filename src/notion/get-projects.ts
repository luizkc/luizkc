import { type DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { ProjectsSchema, type ProjectUI } from "./schemas";
import { notion, projectsDatabaseId } from "./";

export const getProjects = async () => {
  const response = await notion.databases.query({
    database_id: projectsDatabaseId,
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
        property: "Created time",
        direction: "ascending",
      },
    ],
  });
  const results = response.results as DatabaseObjectResponse[];
  const props = results.map((row) => row.properties);
  const parsedProps = ProjectsSchema.parse(props);
  return parsedProps.map((project) => ({
    title: project.title.rich_text[0].plain_text,
    description: project.Description.rich_text[0].plain_text,
    url: project.URL.url,
  })) as ProjectUI[];
};
