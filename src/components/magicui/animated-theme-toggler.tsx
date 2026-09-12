"use client";

import { Moon, SunDim } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isDark = resolvedTheme === "dark";

  // The theme isn't known until the client mounts. Rendering the resolved
  // icon straight away makes the server (always Moon) and the client
  // (SunDim, which contains a <circle>) disagree, which fails hydration for
  // anyone whose saved theme is dark. Hold the placeholder icon for one
  // render, then swap.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const changeTheme = async () => {
    if (!buttonRef.current) return;
    const next = isDark ? "light" : "dark";

    const applyTheme = () => {
      flushSync(() => setTheme(next));
    };

    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    await document.startViewTransition(applyTheme).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 650,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      aria-label="Toggle theme"
      className={cn(className)}
    >
      {mounted && isDark ? <SunDim /> : <Moon />}
    </button>
  );
};
