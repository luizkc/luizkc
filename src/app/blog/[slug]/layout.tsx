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
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      authors: ["luizkc"],
      url: `${baseUrl}/blog/${params.slug}`,
      publishedTime: new Date(article.created).toISOString(),
      images: [article.cover],
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
  const mdblocks = await n2m.pageToMarkdown(article.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    alternativeHeadline: article.description,
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
    dateCreated: new Date(article.created).toISOString(),
    dateModified: new Date(article.created).toISOString(),
    description: article.description,
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
