"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Section headings whose words slide up from behind a mask, one after the
 * other. More crafted than fading the whole block in at once — the kind of
 * detail that reads as "someone made this" rather than "a template did".
 */
export function AnimatedHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <h2 className={className}>{text}</h2>;
  }

  return (
    <motion.h2
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.07 }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] pr-[0.26em]"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              show: {
                y: 0,
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
            {/* A real space, kept out of the visual flow by the mask but
                present in the accessible name and in copied text — without it
                a screen reader announces "Thingsbroughttolife". */}
            <span className="sr-only"> </span>
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
