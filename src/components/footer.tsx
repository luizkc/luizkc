"use client";

import { motion } from "framer-motion";
import { FileText, Github, Linkedin, Network, Rss, Send } from "lucide-react";
import { default as NextLink } from "next/link";

import { ModeToggle } from "./ui/mode-toggle";
import { Logo } from "./logo";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { parentVariants } from "~/lib/animations";

const Link = motion(NextLink);

export function Footer() {
  return (
    <motion.div variants={parentVariants} className="max-w-2xl">
      <motion.hr className="mb-4 border-muted-foreground" />
      <motion.footer className="flex justify-between">
        <Link className="no-underline" href="/" target="_self">
          <Logo />
        </Link>
        <motion.div className="flex items-center gap-4">
          <ModeToggle />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link href="/resume" target="_self">
                  <FileText size={16} />
                  <span className="sr-only">hire me plz</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>hire me plz</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="/rss.xml"
                  target="_self"
                  className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
                >
                  <span className="sr-only">blog stuff</span>
                  <Rss className=" h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>blog stuff</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="hidden sm:inline">
                <Link
                  href="/sitemap.xml"
                  target="_self"
                  className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
                >
                  <span className="sr-only">sitemap</span>
                  <Network className=" h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>sitemap</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="mailto:hi@luizkc.com"
                  target="_self"
                  className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
                >
                  <span className="sr-only">boring email stuff</span>
                  <Send className=" h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>boring email link</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="https://www.github.com/luizkc"
                  target="_blank"
                  className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
                >
                  <span className="sr-only">nerd stuff</span>
                  <Github className=" h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>nerd stuff</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="https://www.linkedin.com/in/luizkc/"
                  target="_blank"
                  className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
                >
                  <span className="sr-only">rarely check this</span>
                  <Linkedin className=" h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>rarely check this</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="https://x.com/luizkc"
                  target="_blank"
                  className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
                >
                  <span className="sr-only">talk here</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-x"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.title>X (formerly known as Twitter)</motion.title>
                    <motion.path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    ></motion.path>
                    <motion.path d="M4 4l11.733 16h4.267l-11.733 -16z"></motion.path>
                    <motion.path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></motion.path>
                  </motion.svg>
                </Link>
              </TooltipTrigger>
              <TooltipContent>talk here</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </motion.footer>
    </motion.div>
  );
}
