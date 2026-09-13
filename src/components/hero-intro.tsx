"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { DATA } from "@/data/resume";
import { Magnetic } from "@/components/magnetic";
import { LiveStatus } from "@/components/live-status";

export function HeroIntro() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const exitOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const exitY = useTransform(scrollY, [0, 380], [0, -50]);

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 24,
      filter: reduce ? "blur(0px)" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      style={reduce ? undefined : { opacity: exitOpacity, y: exitY }}
      className="w-full"
    >
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
      >
        <div>
          <motion.p variants={item} className="mb-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Machine learning · Full-stack · Hamilton, Ontario
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-[15ch] text-balance text-[clamp(3rem,8.4vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] [word-spacing:0.04em]"
          >
            Models are easy. Making them useful is the work.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-[46ch] text-[clamp(1.125rem,1.55vw,1.45rem)] leading-relaxed text-muted-foreground"
          >
            I&apos;m an engineer who takes ideas from first model to finished experience, building the systems, interfaces, and small details that make people want to use them.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic className="inline-block">
                <a
                  href="#projects"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
                >
                  See what I&apos;ve built
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              </Magnetic>
              <Magnetic className="inline-block">
                <a
                  href="#contact"
                  className="inline-flex min-h-[48px] items-center rounded-full border border-[hsl(var(--edge))] bg-secondary px-7 text-[15px] font-medium text-secondary-foreground transition-colors duration-300 hover:border-[hsl(var(--foreground)/0.35)]"
                >
                  Say hello
                </a>
              </Magnetic>
            </motion.div>

          <motion.div variants={item} className="mt-9">
            <LiveStatus />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
