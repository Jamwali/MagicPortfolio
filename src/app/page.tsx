import { ArrowUpRight } from "lucide-react";
import { HeroIntro } from "@/components/hero-intro";
import { AnimatedHeading } from "@/components/animated-heading";
import { Reveal } from "@/components/reveal";
import { ScrollStatement } from "@/components/scroll-statement";
import { Projects } from "@/components/projects";
import ContactSection from "@/components/contact-section";
import { SystemProof } from "@/components/system-proof";
import { DATA } from "@/data/resume";

// A snapshot of where things actually stand — not a second version of the
// hero. Every row is real, and the ones that have somewhere to go, link.
const CURRENTLY: {
  label: string;
  value: string;
  detail: string;
  href?: string;
}[] = [
  {
    label: "Working",
    value: DATA.work[0].title,
    detail: `${DATA.work[0].company}, ${DATA.work[0].location}`,
    href: DATA.work[0].href,
  },
  {
    label: "Building",
    value: DATA.projects[0].title,
    detail: `${DATA.projects[0].tagline}, trained on 36.7k dermatology images`,
    href: DATA.projects[0].href,
  },
  {
    label: "Based in",
    value: "Hamilton, Ontario",
    detail: "Eastern Time",
  },
  {
    label: "Looking for",
    value: "Machine-learning and full-stack roles",
    detail: `${DATA.education[0].degree}, ${DATA.education[0].school}, 2026`,
  },
];

const STATEMENT =
  "A model isn't done when it clears 80% on a validation set. It's done when someone uploads a photo, gets an answer in under two seconds, and nothing falls over. I like building that whole path.";

function bullets(text: string) {
  return text
    .split("\n")
    .map((line) => line.replace(/^[•\-]\s*/, "").trim())
    .filter(Boolean);
}

export default function Page() {
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1240px] items-center px-6 py-16 lg:px-10">
        <HeroIntro />
      </section>

      {/* Currently */}
      <section id="about" className="scroll-mt-24">
        <div className="mx-auto max-w-[1240px] border-t border-[hsl(var(--rule))] px-6 py-24 md:py-32 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <AnimatedHeading
                text="In motion."
                className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.035em]"
              />
              <p className="mt-4 max-w-[24ch] text-[16px] leading-relaxed text-muted-foreground">
                The short version of what I&apos;m making, learning, and looking forward to.
              </p>
            </div>

            {/* One grouped surface with hairline dividers rather than four
                near-invisible floating cards: the group reads as a single
                object, and the rows that lead somewhere say so with an arrow
                instead of relying on a color change alone. */}
            <Reveal>
              <ul className="overflow-hidden rounded-[1.5rem] border border-[hsl(var(--edge))] bg-card shadow-[0_1px_2px_hsl(240_20%_10%/0.04),0_12px_32px_hsl(240_20%_10%/0.06)] dark:shadow-none">
                {CURRENTLY.map((row) => {
                  const body = (
                    <div className="grid gap-2 px-5 py-5 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-8 sm:px-7 sm:py-6">
                      <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {row.label}
                      </span>
                      <span className="block">
                        <span className="text-[clamp(1.125rem,1.7vw,1.5rem)] font-semibold leading-snug text-foreground">
                          {row.value}
                          {row.href && (
                            <ArrowUpRight
                              aria-hidden
                              className="ml-1.5 inline size-[0.8em] -translate-y-[0.08em] text-muted-foreground transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-[0.2em] group-hover:text-signal"
                            />
                          )}
                        </span>
                        <span className="mt-1.5 block text-[15px] leading-snug text-muted-foreground">
                          {row.detail}
                        </span>
                      </span>
                    </div>
                  );

                  return (
                    <li
                      key={row.label}
                      className="group border-t border-[hsl(var(--rule))] first:border-t-0"
                    >
                      {row.href ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block transition-colors duration-200 hover:bg-secondary/70"
                        >
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scroll-revealed statement */}
      <ScrollStatement text={STATEMENT} />

      {/* A recruiter can inspect the engineering path, not just the output. */}
      <SystemProof />

      {/* Experience */}
      <section id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-[1240px] border-t border-[hsl(var(--rule))] px-6 py-24 md:py-32 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <AnimatedHeading
                text="Experience"
                className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.035em]"
              />
            </div>
            <div>
              {DATA.work.map((job, i) => (
                <Reveal key={job.company} delay={i * 0.05}>
                  <article className="border-t border-[hsl(var(--rule))] py-12 first:border-t-0 first:pt-0">
                    <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] font-semibold tracking-tight">
                      {job.company}
                    </h3>
                    <p className="mt-2 text-[16px] text-foreground">
                      {job.title}
                    </p>
                    <p className="mt-1 text-[14px] text-muted-foreground">
                      {job.start}
                    </p>
                    {/* The accent is the site's link colour; using it for a
                        static headline number invited clicks on text that
                        does nothing. The metric keeps its emphasis from a
                        surface and weight instead. */}
                    <p className="mt-4 inline-flex rounded-full bg-secondary px-3 py-1.5 text-[15px] font-semibold tracking-tight text-foreground">
                      {job.metric}
                    </p>
                    <ul className="mt-6 space-y-4 text-[clamp(1rem,1.15vw,1.1875rem)] leading-relaxed text-foreground">
                      {bullets(job.description).map((line, idx) => (
                        <li
                          key={idx}
                          className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-foreground/40"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education + Skills */}
      <section id="education" className="scroll-mt-24">
        <div className="mx-auto max-w-[1240px] border-t border-[hsl(var(--rule))] px-6 py-24 md:py-32 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <AnimatedHeading
                text="Education"
                className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.035em]"
              />
            </div>
            <div>
              {DATA.education.map((school) => (
                <Reveal key={school.school}>
                  <div>
                    <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold tracking-tight">
                      {school.school}
                    </h3>
                    <p className="mt-2 text-[16px] text-foreground">
                      {school.degree}
                    </p>
                    <p className="mt-1 text-[14px] text-muted-foreground">
                      {school.start} – {school.end}
                    </p>
                    <p className="mt-5 max-w-[60ch] text-[clamp(1rem,1.15vw,1.1875rem)] leading-relaxed text-foreground">
                      {school.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-24 grid gap-12 border-t border-[hsl(var(--rule))] pt-12 sm:grid-cols-3">
              {Object.entries(DATA.skills).map(([group, items]) => (
                <div key={group}>
                  <h3 className="text-[14px] text-muted-foreground">{group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2 text-[15px] text-foreground">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[hsl(var(--edge))] bg-secondary px-3 py-1.5 text-secondary-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects — dark showcase */}
      <Projects />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}
