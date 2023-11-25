import type { Metadata } from "next";

import { BlogLayout } from "~/components/blog/layout";

export const metadata: Metadata = {
  title: "luiz•kc — recent articles",
  description: "the best articles you'll ever read",
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogLayout>{children}</BlogLayout>;
}
