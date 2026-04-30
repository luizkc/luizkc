import { motion } from "motion/react";

export function Logo() {
  return (
    <motion.span className="select-none text-foreground hover:cursor-default">
      luiz •{" "}
      <span className=" font-serif italic text-muted-foreground">kc</span>
    </motion.span>
  );
}
