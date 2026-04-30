import { notFound } from "next/navigation";

import { Article } from "~/components/blog/article";
import { n2m } from "~/notion";
import { getArticle } from "~/notion/get-article";

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function RemoteMdxPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return notFound();
  }
  const mdblocks = await n2m.pageToMarkdown(article.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return (
    <Article
      title={article.properties.Name.title[0].plain_text}
      md={mdString.parent}
    />
  );
}
