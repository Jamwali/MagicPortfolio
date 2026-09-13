"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { DATA } from "@/data/resume";
import { AnimatedHeading } from "@/components/animated-heading";
import { SCENES } from "@/components/project-scenes";
import { cn } from "@/lib/utils";

type Project = (typeof DATA.projects)[number];

const featured = DATA.projects.filter((p) => p.active);

// A distinct identity per project — a color and a scroll-driven scene — so
// each keeps its own character. `ink` is the text-safe tone used on the page
// background; `bright` is the louder tone used on the project's own dark card.
const IDENTITY = [
  // NexDerm — clinical
  { ink: "hsl(350 75% 45%)", bright: "hsl(350 88% 68%)", card: "hsl(350 40% 8%)", glow: "hsl(350 90% 60% / 0.22)" },
  // Local RAG Chatbot — conversation
  { ink: "hsl(265 65% 50%)", bright: "hsl(265 88% 72%)", card: "hsl(265 40% 9%)", glow: "hsl(265 90% 65% / 0.22)" },
  // US Accident Dataset — benchmarking
  { ink: "hsl(35 90% 34%)", bright: "hsl(38 92% 62%)", card: "hsl(35 40% 8%)", glow: "hsl(38 92% 58% / 0.2)" },
  // CityLab — civic
  { ink: "hsl(165 75% 26%)", bright: "hsl(160 70% 55%)", card: "hsl(165 40% 7%)", glow: "hsl(160 75% 50% / 0.2)" },
];

function projectLinks(project: Project) {
  return project.links.filter((l) => {
    const href = l.href as string;
    return href.trim().length > 0 && href !== "#";
  });
}

function linkLabel(type: string) {
  if (type === "Source") return "View source";
  if (type === "Website") return "Visit site";
  return type;
}

function Rise({
  children,
  delay = 0,
  className,
  style,
  onMouseMove,
  onMouseLeave,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

type Metric = { value: number; prefix?: string; suffix?: string; decimals?: number };

function CountUp({ value, prefix = "", suffix = "", decimals = 0 }: Metric) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [text, setText] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (reduce) {
      setText(value.toFixed(decimals));
      return;
    }
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

// Scene progress is read off the (non-sticky) card column, so it keeps
// advancing while the card itself is pinned. It's smoothed a touch so the
// drawing trails the scrollbar like Apple's product pages do, and pinned at
// its finished state for readers who prefer reduced motion.
function useSceneProgress(target: React.RefObject<HTMLElement>) {
  const reduce = useReducedMotion();
  const pinned = useMediaQuery("(min-width: 768px)");
  // Desktop: 0 as the card's top clears the lower half of the viewport, 1
  // shortly before it unpins — so the scene plays mostly while the card sits
  // still. Mobile: the column is only as tall as the card, so scrub over the
  // card's own climb from the bottom of the screen to near the top instead.
  const { scrollYProgress } = useScroll({
    target,
    offset: pinned ? ["start 0.6", "end 1"] : ["start 0.9", "start 0.2"],
  });
  const raw = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const smooth = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.5 });
  const done = useMotionValue(1);
  return reduce ? done : smooth;
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const links = projectLinks(project);
  const num = String(index + 1).padStart(2, "0");
  const reverse = index % 2 === 1;
  const { ink, bright, card, glow: glowColor } = IDENTITY[index % IDENTITY.length];
  const Scene = SCENES[index % SCENES.length];

  const column = useRef<HTMLDivElement>(null);
  const progress = useSceneProgress(column);

  // The card's glow follows the cursor across it.
  const restX = reverse ? 20 : 80;
  const glowX = useSpring(useMotionValue(restX), { stiffness: 150, damping: 20 });
  const glowY = useSpring(useMotionValue(15), { stiffness: 150, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 62%)`;

  function handleCardMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function resetCard() {
    glowX.set(restX);
    glowY.set(15);
  }

  return (
    <article className="border-t border-black/[0.1] py-14 first:border-t-0 first:pt-8 md:py-16 dark:border-white/[0.14]">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-2 md:gap-14 lg:gap-20 lg:px-10">
        {/* text — the extra bottom padding on desktop is the scroll distance
            the pinned card gets to play its scene over */}
        <div className={cn("order-2 md:pb-[30vh]", reverse ? "md:order-2" : "md:order-1")}>
          <Rise>
            <div className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: ink }} />
              <span className="text-sm text-muted-foreground">{num}</span>
              <span className="h-px flex-1 bg-black/10 dark:bg-white/15" />
            </div>
            <h3 className="mt-6 text-[clamp(2.75rem,5.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {project.title}
            </h3>
            <p className="mt-4 text-[clamp(1.25rem,1.9vw,1.6rem)] leading-snug text-muted-foreground">
              {project.tagline}
            </p>
          </Rise>

          <Rise delay={0.08}>
            <p className="mt-8 max-w-[52ch] text-[clamp(1.0625rem,1.15vw,1.25rem)] leading-relaxed text-foreground">
              {project.description}
            </p>
          </Rise>

          <Rise delay={0.14}>
            <dl className="mt-10 max-w-[34rem] border-b border-black/[0.1] dark:border-white/[0.14]">
              {[
                ["Focus", project.focus],
                ["Stack", project.technologies.slice(0, 4).join(", ")],
                ["Timeline", project.dates],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[6rem_1fr] gap-5 border-t border-black/[0.1] py-3.5 dark:border-white/[0.14]"
                >
                  <dt className="text-[14px] text-muted-foreground">{label}</dt>
                  <dd className="text-[14px] text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </Rise>

          {links.length > 0 && (
            <Rise delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-8">
                {links.map((l) => (
                  <Link
                    key={l.type}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-[15px] font-medium"
                    style={{ color: ink }}
                  >
                    {linkLabel(l.type)}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                ))}
              </div>
            </Rise>
          )}
        </div>

        {/* the project's scene, drawn as you scroll, on a card unique to it */}
        <div ref={column} className={cn("order-1", reverse ? "md:order-1" : "md:order-2")}>
          <Rise
            delay={0.1}
            onMouseMove={handleCardMove}
            onMouseLeave={resetCard}
            className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[1.5rem] p-7 text-white ring-1 ring-inset ring-black/[0.06] transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:p-8 md:sticky md:top-24 md:h-[calc(100vh-8rem)] md:max-h-[40rem] dark:ring-white/[0.08]"
            style={{ backgroundColor: card }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: glow }}
            />

            <div className="relative flex items-center justify-between text-[13px] text-white/35">
              <span>
                {num} / {String(featured.length).padStart(2, "0")}
              </span>
              <span>{project.focus}</span>
            </div>

            <div className="relative my-6 min-h-[13rem] flex-1">
              <div className="absolute inset-0">
                <Scene p={progress} bright={bright} />
              </div>
            </div>

            <div className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <p
                className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
                style={{ color: bright }}
              >
                <CountUp {...project.metric} />
              </p>
              <p className="max-w-[22ch] text-[14px] leading-snug text-white/55 sm:text-right">
                {project.metricCaption}
              </p>
            </div>
          </Rise>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-[1240px] border-t border-black/[0.1] px-6 pb-4 pt-24 md:pt-32 lg:px-10 dark:border-white/[0.14]">
        <AnimatedHeading
          text="Things I&apos;ve brought to life."
          className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.035em]"
        />
        <Rise delay={0.15}>
          <p className="mt-5 max-w-[48ch] text-[clamp(1.0625rem,1.2vw,1.3rem)] leading-relaxed text-muted-foreground">
            A few proof points from the past year—computer vision, local LLMs,
            model research, and a digital home for a city team.
          </p>
        </Rise>
      </div>

      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {featured.map((project, i) => (
          <ProjectPanel key={project.title} project={project} index={i} />
        ))}
      </div>

      <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-6 lg:px-10">
        <Rise>
          <h3 className="text-[15px] text-muted-foreground">Also built</h3>
        </Rise>
        <ul className="mt-6 border-t border-black/[0.1] dark:border-white/[0.14]">
          {DATA.alsoBuilt.map((item, i) => (
            <Rise key={item.title} delay={i * 0.05}>
              <li className="flex flex-col gap-1.5 border-b border-black/[0.1] py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 dark:border-white/[0.14]">
                <div className="sm:flex sm:items-baseline sm:gap-5">
                  <span className="text-[17px] font-medium text-foreground">{item.title}</span>
                  <span className="text-[15px] text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative shrink-0 text-[15px] text-signal"
                >
                  View source
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}
