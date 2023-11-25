import type { Metadata } from "next";

import { getBaseUrl } from "~/lib/getbaseUrl";
import { n2m } from "~/notion";
import { getArticle } from "~/notion/get-article";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params
  const baseUrl = getBaseUrl();
  const article = await getArticle(params.slug);
  if (!article) {
    return {};
  }
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${article.properties.Name.title[0].plain_text} — luiz•kc`,
    description: article.properties.description.rich_text[0].plain_text,
    openGraph: {
      title: `${article.properties.Name.title[0].plain_text} — luiz•kc`,
      description: article.properties.description.rich_text[0].plain_text,
      authors: ["luizkc"],
      url: `${baseUrl}/blog/${params.slug}`,
      publishedTime: new Date(
        article.properties.created.created_time,
      ).toISOString(),
      images: [article.cover?.external?.url ?? article.cover?.file?.url ?? ""],
    },
  };
}

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const baseUrl = getBaseUrl();
  const article = await getArticle(params.slug);
  if (!article) {
    return <>{children}</>;
  }
  const mdblocks = await n2m.pageToMarkdown(article.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.properties.Name.title[0].plain_text,
    alternativeHeadline: article.properties.description.rich_text[0].plain_text,
    image: article.cover,
    author: "luiz•kc",
    award: "Best article ever written",
    editor: "luiz•kc",
    genre: "search engine optimization",
    keywords: "seo sales b2b",
    wordcount: mdString.parent.split(" ").length,
    publisher: "luiz•kc",
    url: `${baseUrl}/blog/${params.slug}`,
    datePublished: "2015-09-20",
    dateCreated: new Date(
      article.properties.created.created_time,
    ).toISOString(),
    dateModified: new Date(
      article.properties.edited.last_edited_time,
    ).toISOString(),
    description: article.properties.description.rich_text[0].plain_text,
    articleBody: mdString.parent,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
