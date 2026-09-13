"use client";

import { useEffect, useState } from "react";

/**
 * A small sign of life: availability plus the actual current time where
 * Ishaan is. Real data about a real person — the part of a portfolio a
 * template can't fake.
 */
export function LiveStatus() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-CA", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Toronto",
        }).format(new Date())
      );

    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 text-[14px] text-muted-foreground">
      <span aria-hidden className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-foreground">Open to roles</span>
      {time && (
        <>
          <span className="h-3 w-px bg-[hsl(var(--edge))]" />
          <span>{time} in Hamilton</span>
        </>
      )}
    </div>
  );
}
