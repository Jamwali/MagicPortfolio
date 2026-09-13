"use client";

import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { DATA } from "@/data/resume";
import { Magnetic } from "@/components/magnetic";
import { LiveStatus } from "@/components/live-status";
import { SignalOrbit } from "@/components/signal-orbit";

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
        <motion.div className="grid items-center gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:gap-16">
          <div>
            <motion.p variants={item} className="mb-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-signal">
              Independent builder · Hamilton, Ontario
            </motion.p>
            <motion.h1
              variants={item}
              className="max-w-[11ch] text-balance text-[clamp(3.25rem,7.4vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]"
            >
              Intelligence, made human.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-[43ch] text-[clamp(1.125rem,1.55vw,1.45rem)] leading-relaxed text-muted-foreground"
            >
              I&apos;m Ishaan—an engineer who trains models, designs the systems around them, and cares a little too much about the last 10% of the experience.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic className="inline-block">
                <a
                  href="#projects"
                  className="inline-block rounded-full bg-foreground px-7 py-3.5 text-[15px] font-medium text-background transition-all duration-300 hover:scale-[1.03]"
                >
                  Explore my work&nbsp; →
                </a>
              </Magnetic>
              <Magnetic className="inline-block">
                <a
                  href="#contact"
                  className="inline-block rounded-full border border-black/[0.14] px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors duration-300 hover:border-black/[0.35] dark:border-white/[0.18] dark:hover:border-white/[0.45]"
                >
                  Let&apos;s build
                </a>
              </Magnetic>
            </motion.div>

            <motion.div variants={item} className="mt-9">
              <LiveStatus />
            </motion.div>
          </div>

          <motion.div variants={item} className="mx-auto w-full max-w-[31rem] lg:justify-self-end">
            <SignalOrbit />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
