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
  const height = useTransform(scrollY, [0, 140], [96, 72]);
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

      <nav className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-6 lg:px-10">
        <ul className="col-start-1 hidden items-center gap-7 sm:flex">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="col-start-2 justify-self-center">
          <motion.span
            style={{ scale: nameScale }}
            className="block text-[22px] font-semibold tracking-tight sm:text-[26px]"
          >
            {DATA.name}
          </motion.span>
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-6">
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
