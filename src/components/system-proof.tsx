"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedHeading } from "@/components/animated-heading";
import { Reveal } from "@/components/reveal";
import { CASE_STUDIES } from "@/data/case-studies";

const featuredSystems = CASE_STUDIES.slice(0, 2);

export function SystemProof() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const reduce = useReducedMotion();
  const project = featuredSystems[projectIndex];
  const stage = project.stages[stageIndex];

  function selectProject(index: number) {
    setProjectIndex(index);
    setStageIndex(0);
  }

  return (
    <section aria-labelledby="system-proof-title">
      <div className="mx-auto max-w-[1240px] border-t border-[hsl(var(--rule))] px-6 py-24 md:py-32 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatedHeading
              text="I build the whole path."
              className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.035em]"
            />
            <p className="mt-5 max-w-[29ch] text-[16px] leading-relaxed text-muted-foreground">
              Models are only one part of the work. Pick a system, then trace what has to happen around them.
            </p>
          </div>

          <Reveal>
            <div
              className="overflow-hidden rounded-[1.75rem] border border-[hsl(var(--edge))] bg-card shadow-[0_1px_2px_hsl(240_20%_10%/0.04),0_18px_50px_hsl(240_20%_10%/0.07)] dark:shadow-none"
              style={{
                "--trace": project.accent,
                "--trace-dark": project.accentDark,
              } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--rule))] px-5 py-4 sm:px-7">
                <div className="flex rounded-full bg-secondary p-1" role="tablist" aria-label="System to trace">
                  {featuredSystems.map((item, index) => (
                    <button
                      key={item.slug}
                      type="button"
                      role="tab"
                      aria-selected={projectIndex === index}
                      onClick={() => selectProject(index)}
                      className="relative min-h-10 rounded-full px-4 text-[14px] font-medium text-muted-foreground transition-colors aria-selected:text-foreground"
                    >
                      {projectIndex === index && (
                        <motion.span
                          layoutId="system-project-pill"
                          className="absolute inset-0 rounded-full bg-card shadow-sm ring-1 ring-inset ring-[hsl(var(--edge))]"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{item.title}</span>
                    </button>
                  ))}
                </div>
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Interactive system trace
                </span>
              </div>

              <div className="px-5 py-8 sm:px-7 sm:py-10">
                <div className="relative">
                  <div className="absolute left-5 right-5 top-5 hidden h-px bg-[hsl(var(--rule))] sm:block" />
                  <div
                    className="absolute left-5 top-5 hidden h-px bg-[var(--trace)] transition-[width] duration-300 ease-out dark:bg-[var(--trace-dark)] sm:block"
                    style={{ width: `${(stageIndex / (project.stages.length - 1)) * 92}%` }}
                  />
                  <ol className="relative grid gap-2 sm:grid-cols-5 sm:gap-3">
                    {project.stages.map((item, index) => {
                      const active = stageIndex === index;
                      const passed = index <= stageIndex;
                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={() => setStageIndex(index)}
                            aria-current={active ? "step" : undefined}
                            className="group flex min-h-11 w-full items-center gap-3 rounded-xl px-2 text-left sm:flex-col sm:items-start sm:px-0 sm:text-center"
                          >
                            <span
                              className={
                                passed
                                  ? "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-[var(--trace)] bg-card text-[12px] font-semibold text-[var(--trace)] transition-colors dark:border-[var(--trace-dark)] dark:text-[var(--trace-dark)]"
                                  : "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-[hsl(var(--edge))] bg-card text-[12px] font-semibold text-muted-foreground transition-colors"
                              }
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[13px] font-medium text-foreground sm:w-full">{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <motion.div
                  key={`${project.slug}-${stageIndex}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 min-h-[7.5rem] rounded-2xl bg-secondary px-5 py-5 sm:px-6"
                  aria-live="polite"
                >
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--trace)] dark:text-[var(--trace-dark)]">
                    Stage {stageIndex + 1} · {stage.label}
                  </p>
                  <p className="mt-2 max-w-[52ch] text-[clamp(1.125rem,1.7vw,1.45rem)] font-medium leading-snug tracking-tight">
                    {stage.detail}
                  </p>
                </motion.div>

                <div className="mt-7 flex flex-col gap-5 border-t border-[hsl(var(--rule))] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[50ch] text-[14px] leading-relaxed text-muted-foreground">
                    {project.outcome}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="link-underline tap-44 inline-flex shrink-0 items-center gap-2 self-start text-[15px] font-medium text-signal"
                  >
                    Open case study
                    <ArrowRight aria-hidden className="size-4" />
                    <span className="link-underline-bar" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
