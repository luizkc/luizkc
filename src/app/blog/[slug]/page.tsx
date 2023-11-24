import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

import { Article } from "~/components/blog/article";
import { n2m } from "~/notion";
import { getArticle } from "~/notion/get-article";

export const revalidate = 6000;
export const dynamic = "force-static";

export default async function RemoteMdxPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  const mdblocks = await n2m.pageToMarkdown(article.id);
  const mdString = n2m.toMarkdownString(mdblocks);
  const md = await serialize(mdString.parent, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMdx],
      format: "mdx",
    },
  });

  return <Article title={article.title} md={md.compiledSource} />;
}
