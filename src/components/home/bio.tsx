"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { parentVariants } from "~/lib/animations";
import { calculateAge } from "~/lib/utils";

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
        . I&apos;m {calculateAge("1996-06-10")} y/o and I&apos;m a creative
        full-stack developer. I like{" "}
        <motion.strong>triathlon sports</motion.strong> and{" "}
        <motion.strong>building things</motion.strong>. I enjoy{" "}
        <motion.strong>babysitting LLMs</motion.strong>,{" "}
        <motion.strong>web development</motion.strong> and I&apos;m a
        professional <motion.strong>vibe coder</motion.strong> (and vibe code
        refactorer).
      </motion.span>
      <br />
      <br />
      <motion.span variants={parentVariants}>
        Right now I&apos;m a founding engineer at{" "}
        <Link
          href="https://vallor.ai"
          target="_blank"
          className="focus:outline-offset-6 w-fit gap-2 text-muted-foreground underline decoration-1 underline-offset-8 transition-colors hover:text-foreground"
        >
          Vallor
        </Link>
        .
      </motion.span>
    </p>
  );
}
