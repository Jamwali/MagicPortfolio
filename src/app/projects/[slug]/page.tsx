import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { DATA } from "@/data/resume";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  return {
    title: `${study.title} — Case study`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — Case study`,
      description: study.summary,
      type: "article",
      url: `${DATA.url}projects/${study.slug}`,
      images: ["/opengraph-image"],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const currentIndex = CASE_STUDIES.findIndex((item) => item.slug === study.slug);
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": study.source ? "SoftwareSourceCode" : "CreativeWork",
            name: study.title,
            description: study.summary,
            author: { "@type": "Person", name: DATA.name, url: DATA.url },
            url: `${DATA.url}projects/${study.slug}`,
            codeRepository: study.source,
            programmingLanguage: study.technologies,
          }),
        }}
      />

      <article
        style={{
          "--case-accent": study.accent,
          "--case-accent-bright": study.accentDark,
        } as React.CSSProperties}
      >
        <header className="mx-auto max-w-[1240px] px-6 pb-20 pt-12 md:pb-28 md:pt-20 lg:px-10">
          <Link
            href="/#projects"
            className="tap-44 inline-flex items-center gap-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All projects
          </Link>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:items-end lg:gap-20">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.13em] text-[var(--case-accent)] dark:text-[var(--case-accent-bright)]">
                {study.eyebrow}
              </p>
              <h1 className="mt-5 text-[clamp(3.5rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
                {study.title}
              </h1>
              <p className="mt-8 max-w-[44ch] text-[clamp(1.3rem,2.3vw,2rem)] leading-snug tracking-[-0.015em] text-muted-foreground">
                {study.summary}
              </p>
            </div>

            <dl className="border-b border-[hsl(var(--rule))] text-[14px]">
              {[
                ["Role", study.role],
                ["Timeline", study.dates],
                ["Outcome", study.outcome],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-[hsl(var(--rule))] py-4">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="leading-relaxed text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section className="bg-[hsl(var(--field))] text-[hsl(var(--field-foreground))]">
          <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 lg:px-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">System path</p>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/15 sm:grid-cols-5">
              {study.stages.map((stage, index) => (
                <li key={stage.label} className="relative bg-[hsl(var(--field))] px-5 py-6 sm:min-h-[13rem] sm:px-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] text-white/45">{String(index + 1).padStart(2, "0")}</span>
                    {index < study.stages.length - 1 && (
                      <span aria-hidden className="text-[var(--case-accent)] sm:hidden">→</span>
                    )}
                  </div>
                  <h2 className="mt-7 text-[18px] font-semibold text-[var(--case-accent-bright)]">
                    {stage.label}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/65">{stage.detail}</p>
                  {index < study.stages.length - 1 && (
                    <span aria-hidden className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-[18px] text-white/40 sm:block">→</span>
                  )}
                </li>
              ))}
            </ol>

            <dl className="mt-14 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
              {study.proof.map((item) => (
                <div key={item.label}>
                  <dt className="text-[13px] text-white/50">{item.label}</dt>
                  <dd className="mt-2 text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-[var(--case-accent-bright)]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="mx-auto max-w-[1240px] px-6 py-24 md:py-32 lg:px-10">
          <section className="grid gap-10 border-b border-[hsl(var(--rule))] pb-24 md:grid-cols-2 md:gap-20 md:pb-32">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-muted-foreground">The problem</p>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-[-0.035em]">
                Build for the real path, not the demo.
              </h2>
            </div>
            <div className="space-y-7 text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-relaxed">
              <p>{study.challenge}</p>
              <p className="text-muted-foreground">{study.approach}</p>
            </div>
          </section>

          <section className="py-24 md:py-32">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-muted-foreground">Decisions that mattered</p>
                <h2 className="mt-5 max-w-[10ch] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-[-0.035em]">
                  The work behind the outcome.
                </h2>
              </div>
              <ol className="border-t border-[hsl(var(--rule))]">
                {study.decisions.map((decision, index) => (
                  <li key={decision.title} className="grid gap-4 border-b border-[hsl(var(--rule))] py-8 sm:grid-cols-[3rem_1fr] sm:py-10">
                    <span className="font-mono text-[13px] text-[var(--case-accent)] dark:text-[var(--case-accent-bright)]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-semibold tracking-tight">{decision.title}</h3>
                      <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground">{decision.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[hsl(var(--edge))] bg-card p-6 sm:p-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-muted-foreground">What this does not prove</p>
              <p className="mt-5 text-[17px] leading-relaxed">{study.caveat}</p>
            </div>
            <div className="rounded-[1.5rem] bg-secondary p-6 sm:p-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-muted-foreground">What I would do next</p>
              <p className="mt-5 text-[17px] leading-relaxed">{study.next}</p>
            </div>
          </section>

          <section className="mt-24 border-t border-[hsl(var(--rule))] pt-10 md:mt-32">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-muted-foreground">Built with</p>
                <ul className="mt-4 flex max-w-[42rem] flex-wrap gap-2">
                  {study.technologies.map((technology) => (
                    <li key={technology} className="rounded-full border border-[hsl(var(--edge))] px-3 py-1.5 text-[14px]">
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
              {study.source && (
                <Link
                  href={study.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-44 inline-flex shrink-0 items-center gap-2 self-start text-[15px] font-medium text-signal"
                >
                  View source <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              )}
            </div>
          </section>
        </div>
      </article>

      <Link
        href={`/projects/${nextStudy.slug}`}
        className="group block border-t border-[hsl(var(--rule))] bg-secondary transition-colors hover:bg-card"
      >
        <div className="mx-auto flex min-h-[17rem] max-w-[1240px] items-end justify-between gap-8 px-6 py-14 lg:px-10">
          <div>
            <p className="text-[13px] text-muted-foreground">Next case study</p>
            <p className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none tracking-[-0.045em]">{nextStudy.title}</p>
          </div>
          <ArrowUpRight aria-hidden className="mb-2 size-7 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    </main>
  );
}
