"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { DATA } from "@/data/resume";

const sections = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 140], [88, 64]);
  const bgOpacity = useTransform(scrollY, [0, 90], [0, 1]);
  const nameScale = useTransform(scrollY, [0, 140], [1, 0.88]);

  return (
    <motion.header
      style={{ height }}
      className="fixed inset-x-0 top-0 z-50 flex items-center"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-black/[0.08] bg-background/75 backdrop-blur-xl dark:border-white/[0.1]"
      />

      <nav className="relative mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-foreground text-[10px] font-bold tracking-[-0.1em] text-background">IJ</span>
          <motion.span style={{ scale: nameScale }} className="text-[15px] font-semibold tracking-tight sm:text-[16px]">
            {DATA.name}
          </motion.span>
        </Link>

        <ul className="hidden items-center rounded-full border border-black/[0.08] bg-background/65 px-4 py-2 shadow-sm backdrop-blur-md sm:flex sm:gap-5 dark:border-white/[0.1]">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <Link
            href="/Ishaan_Jamwal_Coop_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[14px] text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Resume
          </Link>
          <AnimatedThemeToggler className="flex size-4 items-center justify-center text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-4" />
        </div>
      </nav>
    </motion.header>
  );
}
