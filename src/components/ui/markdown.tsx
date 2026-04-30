import { default as NextImage } from "next/image";
import { default as NextLink } from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { type ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

import { CodeBlock } from "~/components/ui/code-block";

type CodeChildren = ComponentPropsWithoutRef<"code">["children"];

interface MarkdownProps {
  md: string;
}

function getCodeText(children: CodeChildren) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children).replace(/\n$/, "");
  }

  if (Array.isArray(children)) {
    return children
      .map((child) =>
        typeof child === "string" || typeof child === "number"
          ? String(child)
          : "",
      )
      .join("")
      .replace(/\n$/, "");
  }

  return "";
}

export function Markdown({ md }: MarkdownProps) {
  return (
    <MDXRemote
      source={md}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMdx],
          format: "mdx",
        },
      }}
      components={{
        a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => (
          <NextLink
            href={href}
            target="_blank"
            className="focus:outline-offset-6 mr-0.5 w-fit border-spacing-y-3.5 gap-2 border-b border-muted-foreground no-underline transition-colors hover:border-accent-foreground"
            {...props}
          />
        ),
        img: ({ alt, src }: ComponentPropsWithoutRef<"img">) => {
          if (typeof src !== "string") {
            return null;
          }

          return (
            <NextImage
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="!static overflow-hidden rounded-md object-cover"
              fill
              src={src}
              alt={alt ?? "image"}
            />
          );
        },
        code: ({
          className,
          children,
          ...props
        }: ComponentPropsWithoutRef<"code">) => {
          const match = /language-(\w+)/.exec(className ?? "");
          return match ? (
            <CodeBlock code={getCodeText(children)} language={match[1]} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
