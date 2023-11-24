import RSS from "rss";

import { getBaseUrl } from "./getbaseUrl";

import { getArticles } from "~/notion/get-articles";

export async function generateRssFeed() {
  const articles = await getArticles();
  const baseUrl = getBaseUrl();

  const feedOptions = {
    title: "luiz•kc",
    description: "the best articles you'll ever read",
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    image_url: `${baseUrl}/favicon.ico`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, luizkc`,
  };

  const feed = new RSS(feedOptions);

  articles.map((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${baseUrl}/blog/${article.slug}`,
      date: article.created,
    });
  });
  return feed.xml({ indent: true });
}
