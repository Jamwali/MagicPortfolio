"use client";

/**
 * A near-invisible film-grain layer — the kind of physical texture premium
 * sites (Apple/Sonos included) put under flat color so long stretches of
 * white or black don't feel dead flat. Procedural SVG noise, not an image,
 * so there's nothing to load. Purely decorative, so it's always inert.
 */
export function FilmGrain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
