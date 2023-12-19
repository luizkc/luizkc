"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { default as NextLink } from "next/link";

import { parentVariants } from "~/lib/animations";
import { type getArticles } from "~/notion/get-articles";

const Link = motion(NextLink);

export interface ArticleListProps {
  articles: Awaited<ReturnType<typeof getArticles>>;
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <>
      <motion.h2
        variants={parentVariants}
        className="font-serif font-normal italic"
      >
        Blog
      </motion.h2>
      <motion.div className="flex flex-col gap-4">
        {articles.map(
          ({
            properties: {
              created,
              slug,
              Name: { title },
            },
            id,
          }) => (
            <motion.article
              variants={parentVariants}
              key={id}
              className="flex justify-between"
            >
              <Link
                href={`/blog/${
                  (slug.formula.type === "string" && slug.formula.string) ?? ""
                }`}
                target="_self"
                className="focus:outline-offset-6 flex w-fit max-w-[210px] items-center gap-2 text-muted-foreground decoration-1 underline-offset-8 transition-colors hover:text-foreground sm:max-w-none"
              >
                <motion.span>{title[0].plain_text}</motion.span>
              </Link>
              <motion.span>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(created.created_time))}
              </motion.span>
            </motion.article>
          ),
        )}
        <motion.span variants={parentVariants}>
          <Link
            href="/blog"
            target="_self"
            className=" focus:outline-offset-6 flex w-fit items-center gap-2 border-b border-muted-foreground text-muted-foreground text-muted-foreground no-underline decoration-1 underline-offset-8 transition-colors transition-colors hover:border-accent-foreground hover:text-foreground hover:text-foreground"
          >
            All posts <MoveRight size={16} />
          </Link>
        </motion.span>
      </motion.div>
    </>
  );
}
