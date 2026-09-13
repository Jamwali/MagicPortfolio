"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const STATES = [
  { label: "in the lab", detail: "Turning rough ideas into useful systems." },
  { label: "in the field", detail: "Making software behave in the real world." },
  { label: "in the details", detail: "Tuning the small things people actually notice." },
];

/** A tiny, tactile signature for the hero — click it to cycle the current mode. */
export function SignalOrbit() {
  const [state, setState] = useState(0);
  const reduce = useReducedMotion();
  const active = STATES[state];

  return (
    <button
      type="button"
      onClick={() => setState((current) => (current + 1) % STATES.length)}
      aria-label="Change studio signal"
      className="group relative flex aspect-square w-full max-w-[31rem] cursor-pointer flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#101114] p-7 text-left shadow-2xl shadow-black/30 sm:p-9"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(129,105,255,0.32),transparent_25%),radial-gradient(circle_at_32%_76%,rgba(34,211,238,0.16),transparent_30%)]" />
      <div className="relative z-10 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
        <span>IJ / signal</span>
        <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/80">change signal</span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <motion.div
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          className="absolute size-[15.5rem] rounded-full border border-dashed border-white/20 sm:size-[18rem]"
        />
        <motion.div
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
          className="absolute size-[10.5rem] rounded-full border border-white/10 sm:size-[12rem]"
        >
          <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_8px_rgba(103,232,249,0.35)]" />
        </motion.div>
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0], scale: [1, 1.035, 1] }}
          transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
          className="relative grid size-28 place-items-center rounded-[2rem] border border-white/25 bg-white/[0.08] text-[3.2rem] font-semibold tracking-[-0.12em] text-white shadow-[0_0_80px_rgba(129,105,255,0.45)] backdrop-blur-xl sm:size-32 sm:text-[3.7rem]"
        >
          IJ
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/10 pt-5">
        <p className="text-lg font-medium tracking-tight text-white sm:text-xl">{active.label}</p>
        <p className="mt-1 max-w-[28ch] text-sm leading-relaxed text-white/65">{active.detail}</p>
      </div>
    </button>
  );
}
