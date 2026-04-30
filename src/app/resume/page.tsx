import { Resume } from "~/components/resume";
import { getResume } from "~/notion/get-resume";

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function ResumePage() {
  const resume = await getResume();
  return <Resume md={resume.parent} />;
}
