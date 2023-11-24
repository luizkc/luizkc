import { motion } from "framer-motion";
import { default as NextLink } from "next/link";

import { parentVariants } from "~/lib/animations";
import { type getProjects } from "~/notion/get-projects";

const Link = motion(NextLink);

export interface ProjectsProps {
  projects: Awaited<ReturnType<typeof getProjects>>;
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <motion.h2
        variants={parentVariants}
        className="font-serif font-normal italic"
      >
        Projects
      </motion.h2>
      <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {projects.map(({ title, description, url }) => (
          <motion.div
            variants={parentVariants}
            key={title}
            className=" flex flex-col"
          >
            <Link
              href={url}
              target="_blank"
              className="focus:outline-offset-6 flex w-fit border-spacing-y-3.5 items-center gap-2 border-b border-muted-foreground text-muted-foreground no-underline transition-colors hover:border-accent-foreground hover:text-foreground"
            >
              <motion.span className="font-medium">{title}</motion.span>
            </Link>
            <motion.span className="pt-3">{description}</motion.span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
