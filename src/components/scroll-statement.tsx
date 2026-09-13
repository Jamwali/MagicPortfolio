"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

// Words fade up from this floor rather than from 0.16. The statement is set at
// 28px and up in semibold, so the ratio that applies is 3:1 (accessibility.md ›
// Vision), and 0.48 is where foreground-on-background clears it in both
// appearances — 3.06:1 light, 3.04:1 dark. Below that, most of the sentence was
// sitting at roughly 1.1:1 at any given scroll position.
const FLOOR = 0.48;

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [FLOOR, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.45"],
  });

  const words = text.split(" ");

  if (reduce) {
    return (
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36 lg:px-10">
        <p className="max-w-[24ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.28] tracking-[-0.02em]">
          {text}
        </p>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-[1240px] px-6 py-[16vh] lg:px-10"
    >
      <p className="flex max-w-[24ch] flex-wrap text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.32] tracking-[-0.02em]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </section>
  );
}
