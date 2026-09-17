"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

const CROSSFADE_MS = 420;

export const AnimatedThemeToggler = ({ className }: props) => {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isDark = resolvedTheme === "dark";

  // The theme isn't known until the client mounts. Rendering the resolved
  // icon straight away makes the server and client disagree for anyone whose
  // saved theme is dark. Hold the placeholder icon for one render, then swap.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const changeTheme = async () => {
    if (!buttonRef.current) return;
    const next = isDark ? "light" : "dark";

    const applyTheme = () => {
      flushSync(() => setTheme(next));
    };

    const root = document.documentElement;

    // No View Transitions (Firefox) means there is no wipe to carry the
    // change, so the page cross-fades its colours instead — still a single
    // motion, just a different one. See `html.theme-changing` in globals.css.
    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        applyTheme();
        return;
      }
      root.classList.add("theme-changing");
      applyTheme();
      window.setTimeout(() => root.classList.remove("theme-changing"), CROSSFADE_MS);
      return;
    }

    // Hold every element's own colour transition still for the duration, so
    // the wipe is the only motion on screen.
    root.classList.add("theme-wipe");
    const transition = document.startViewTransition(applyTheme);
    transition.finished.finally(() => root.classList.remove("theme-wipe"));
    await transition.ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // One thing moves: the new theme's circle, growing from the button to the
    // far corner. The old opacity keyframe was a second animation layered on
    // top of this one, and the page-wide colour transition was a third — three
    // curves of different lengths overlapping is what made the change feel
    // like it accelerated, then hesitated, then settled.
    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        // A single constant-speed pass — no acceleration, deceleration, or
        // secondary opacity animation competing with the radial reveal.
        duration: 560,
        easing: "linear",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      aria-label="Toggle theme"
      className={cn(
        "relative grid size-11 place-items-center rounded-full transition-transform duration-200 ease-out hover:scale-105 active:scale-95 sm:size-9",
        className,
      )}
    >
      <span className="relative block size-4">
        <Sun
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 ease-out",
            mounted && isDark ? "rotate-0 scale-100 opacity-100" : "rotate-45 scale-75 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 ease-out",
            !mounted || !isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-75 opacity-0",
          )}
        />
      </span>
    </button>
  );
};
