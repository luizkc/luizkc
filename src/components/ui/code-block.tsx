"use client";

import { motion } from "motion/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { parentVariants } from "~/lib/animations";

import { CopyCode } from "./copy-code";

export function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  return (
    <motion.div variants={parentVariants} className="relative h-full w-full">
      <span className="absolute right-10 top-3 select-none text-xs text-muted-foreground hover:cursor-default">
        {language}
      </span>
      <CopyCode code={code} />
      <SyntaxHighlighter
        language={language}
        style={stackoverflowDark}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
}
