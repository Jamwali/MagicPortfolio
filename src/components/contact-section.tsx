"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { AnimatedHeading } from "@/components/animated-heading";
import { Magnetic } from "@/components/magnetic";
import { DATA } from "@/data/resume";

const LINKS = [
  { label: "GitHub", href: DATA.contact.social.GitHub.url },
  { label: "Résumé (PDF)", href: "/Ishaan_Jamwal_Coop_Resume.pdf" },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${DATA.contact.email}`;
    }
  }

  return (
    <button
      onClick={copy}
      className="group relative text-[15px] font-medium text-signal underline-offset-4"
    >
      <span className={copied ? "opacity-0" : "opacity-100"}>
        {DATA.contact.email}
      </span>
      <span
        aria-live="polite"
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied
      </span>
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
    </button>
  );
}

export default function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-black/[0.1] dark:border-white/[0.14]"
    >
      <div className="mx-auto max-w-[1240px] px-6 py-28 md:py-40 lg:px-10">
        <AnimatedHeading
          text="Have something worth building?"
          className="max-w-[16ch] text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
        />

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[46ch] text-[clamp(1.125rem,1.5vw,1.5rem)] leading-relaxed text-muted-foreground">
            I finished my degree at McMaster in 2026 and I&apos;m looking for
            machine-learning and full-stack roles. A direct message on LinkedIn
            reaches me fastest.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic className="inline-block">
              <Link
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-foreground px-7 py-3.5 text-[15px] font-medium text-background"
              >
                Message on LinkedIn
              </Link>
            </Magnetic>

            <CopyEmail />

            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group relative text-[15px] font-medium text-signal"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1240px] border-t border-black/[0.1] px-6 py-8 lg:px-10 dark:border-white/[0.14]">
        <p className="text-[13px] text-muted-foreground">
          © {year} {DATA.name}
        </p>
      </div>
    </section>
  );
}
