"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The only background treatment on the page: one soft light that drifts
 * down as you scroll. No pattern, no texture — just enough to keep long
 * stretches of white (or black) from feeling completely inert. Sits at a
 * negative z-index so opaque sections (the project cards, the contact band)
 * paint over it normally.
 */
export function BackgroundGlow() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const glowTop = useTransform(scrollYProgress, [0, 1], ["8%", "92%"]);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        style={{ top: glowTop }}
        className="absolute left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
      >
        <div
          className="size-full rounded-full"
          style={{ backgroundColor: "hsl(var(--signal) / 0.12)" }}
        />
      </motion.div>
    </div>
  );
}
