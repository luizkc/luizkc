import { Markdown } from "../ui/markdown";

export function Article({ title, md }: { title: string; md: string }) {
  return (
    <article className="prose prose-zinc dark:prose-invert prose-pre:bg-inherit prose-pre:p-0">
      <h1 className="pt-8 font-serif font-normal italic">
        {title} <br />
        {/* <span className="font-sans text-muted-foreground text-xs font-light">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(article.created))}
        </span> */}
      </h1>
      <Markdown md={md} />
    </article>
  );
}
