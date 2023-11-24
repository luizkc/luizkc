"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { parentVariants } from "~/lib/animations";

export function Bio() {
  return (
    <p className=" mt-0">
      <motion.span variants={parentVariants}>
        Hi there, I&apos;m <motion.strong>Luiz</motion.strong> aka{" "}
        <motion.strong>
          luiz •{" "}
          <motion.span className=" font-serif font-normal italic text-foreground">
            kc
          </motion.span>
        </motion.strong>
        . I&apos;m {new Date().getFullYear() - 1996} y/o and I&apos;m a creative
        full-stack developer. I like{" "}
        <motion.strong>triathlon sports</motion.strong> and{" "}
        <motion.strong>building things</motion.strong>. I enjoy{" "}
        <motion.strong>making GPTs</motion.strong>,{" "}
        <motion.strong>web development</motion.strong> and I live on the{" "}
        <motion.strong>edge</motion.strong> (bad developer joke).
      </motion.span>
      <br />
      <br />
      <motion.span variants={parentVariants}>
        Right now I&apos;m working at{" "}
        <strong>
          <Link
            href="https://www.linkedin.com/company/dr-smood-group-inc/"
            target="_blank"
            className="focus:outline-offset-6 mr-0.5 w-fit border-spacing-y-3.5 gap-2 border-b border-muted-foreground no-underline transition-colors hover:border-accent-foreground"
          >
            Dr Smood group
          </Link>
        </strong>
        , making blazingly fast, beautiful, and modern storefronts.
      </motion.span>
    </p>
  );
}
