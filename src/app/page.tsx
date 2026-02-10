import { HomeScreen } from "~/components/home/screen";
import { getProjects } from "~/notion/get-projects";

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function HomePage() {
  const projects = await getProjects();

  return <HomeScreen projects={projects} />;
}
