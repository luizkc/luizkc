import { hasResumePageConfig, n2m, resumePageId } from "./";

export async function getResume() {
  if (!hasResumePageConfig) {
    return { parent: "" };
  }

  const mdblocks = await n2m.pageToMarkdown(resumePageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString;
}
