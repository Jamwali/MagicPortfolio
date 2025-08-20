"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const ShimmerButton = ({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  onClick,
  ...props
}: ShimmerButtonProps) => {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--border-radius": borderRadius,
          "--shimmer-duration": shimmerDuration,
          "--background": background,
        } as CSSProperties
      }
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-[var(--border-radius)] p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_var(--shimmer-duration)_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--shimmer-color)_50%,transparent_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[calc(var(--border-radius)-1px)] bg-[var(--background)] px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-slate-800/80">
        {children}
      </span>
    </button>
  );
};

export { ShimmerButton };
