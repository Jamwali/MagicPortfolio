"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { DATA } from "@/data/resume";

const sections = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const RESUME = "/Ishaan_Jamwal_Coop_Resume.pdf";

export function SiteNav() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const height = useTransform(scrollY, [0, 140], [96, 72]);
  const bgOpacity = useTransform(scrollY, [0, 90], [0, 1]);
  const nameScale = useTransform(scrollY, [0, 140], [1, 0.88]);

  // The four sections stay reachable at every width: they sit in the first
  // column on a wide screen and behind a disclosure button on a phone.
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <motion.header
      style={{ height: open ? undefined : height }}
      className="fixed inset-x-0 top-0 z-50 flex flex-col sm:h-auto"
    >
      <div className="relative flex h-[96px] shrink-0 items-center sm:h-auto sm:flex-1">
        {/* The header is the site's whole functional layer, so it is the one
            place the glass belongs. It fades in as content starts passing
            underneath, then blurs and takes colour from whatever is there. */}
        <motion.div
          style={{ opacity: open ? 1 : bgOpacity }}
          className="glass absolute inset-0"
        >
          <div className="glass-edge absolute inset-x-0 bottom-0 h-px" />
          <div className="glass-scroll-edge absolute inset-x-0 -bottom-8 h-8" />
        </motion.div>

        {/* Three columns: sections lead, the name holds the centre, actions
            close. The outer columns are equal fractions so the name stays
            optically centred however long the labels get. */}
        <nav
          aria-label="Primary"
          className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-6 lg:px-10"
        >
          <ul className="col-start-1 hidden items-center gap-7 sm:flex">
            {sections.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="tap-44 inline-flex items-center text-[14px] text-[hsl(var(--nav-label))] transition-colors hover:text-foreground"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="col-start-1 -ml-2.5 grid size-11 place-items-center justify-self-start rounded-full text-[hsl(var(--nav-label))] transition-colors hover:text-foreground sm:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="col-start-2 justify-self-center py-2">
            <motion.span
              style={reduce ? undefined : { scale: nameScale }}
              className="block text-[22px] font-semibold tracking-tight sm:text-[26px]"
            >
              {DATA.name}
            </motion.span>
          </Link>

          <div className="col-start-3 flex items-center justify-end gap-6">
            <Link
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-44 hidden items-center text-[14px] text-[hsl(var(--nav-label))] transition-colors hover:text-foreground sm:inline-flex"
            >
              Résumé
            </Link>
            <AnimatedThemeToggler className="-mr-2.5 text-[hsl(var(--nav-label))] transition-colors hover:text-foreground sm:mr-0" />
          </div>
        </nav>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="glass relative border-b border-[hsl(var(--rule))] sm:hidden"
      >
        <ul className="mx-auto max-w-[1240px] px-6 pb-3">
          {[...sections, { href: RESUME, label: "Résumé (PDF)" }].map((s) => (
            <li key={s.href} className="border-t border-[hsl(var(--rule))] first:border-t-0">
              <Link
                href={s.href}
                target={s.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={s.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] items-center text-[17px] font-medium text-foreground"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.header>
  );
}
