"use client";

import { HackathonCard } from "@/components/hackathon-card";
import ContactSection from "@/components/contact-section";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <main className="flex flex-col items-center p-4 relative">
      <AnimatedGridPattern
        numSquares={200}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
          "inset-x-0 inset-y-0 h-full skew-y-12",
        )}
      />
      <div className="flex flex-col w-full max-w-2xl gap-y-12">
        <section id="hero">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                Hi, I&apos;m <BoxReveal boxColor="#000000" duration={0.5}><span className="inline-block">{DATA.name.split(" ")[0]}</span></BoxReveal> 👋
              </h1>
            </BlurFade>
            <BlurFadeText
              className="max-w-[600px] md:text-xl text-muted-foreground"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
        </section>
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold text-foreground">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold text-foreground">Work Experience</h2>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold text-foreground">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                  description={education.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold text-foreground">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="projects">
          <div className="space-y-8 w-full py-8">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex web applications. Here are a few of my
                    favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 12}>
              <BentoGrid className="auto-rows-[24rem] grid-cols-1 md:grid-cols-2">
                <BentoCard
                  name={DATA.projects[0].title}
                  className="col-span-1"
                  background={<div />}
                  Icon={Icons.react}
                  description={DATA.projects[0].description}
                  href={DATA.projects[0].links?.find((link: any) => link.type === "Website")?.href || DATA.projects[0].href}
                  githubHref={DATA.projects[0].links?.find((link: any) => link.type === "Source")?.href}
                  cta="View Project"
                />
                <BentoCard
                  name={DATA.projects[1].title}
                  className="col-span-1"
                  background={<div />}
                  Icon={Icons.github}
                  description={DATA.projects[1].description}
                  href={DATA.projects[1].links?.find((link: any) => link.type === "Website")?.href || DATA.projects[1].href}
                  githubHref={DATA.projects[1].links?.find((link: any) => link.type === "Source")?.href}
                  cta="View Code"
                />
                <BentoCard
                  name={DATA.projects[2].title}
                  className="col-span-1"
                  background={<div />}
                  Icon={Icons.globe}
                  description={DATA.projects[2].description}
                  href={DATA.projects[2].links?.find((link: any) => link.type === "Website")?.href || DATA.projects[2].href}
                  githubHref={DATA.projects[2].links?.find((link: any) => link.type === "Source")?.href}
                  cta="Visit Site"
                />
                <BentoCard
                  name={DATA.projects[3].title}
                  className="col-span-1"
                  background={<div />}
                  Icon={Icons.react}
                  description={DATA.projects[3].description}
                  href={DATA.projects[3].links?.find((link: any) => link.type === "Website")?.href || DATA.projects[3].href}
                  githubHref={DATA.projects[3].links?.find((link: any) => link.type === "Source")?.href}
                  cta="View Project"
                />
                {DATA.projects.slice(4).map((project, index) => (
                  <BentoCard
                    key={project.title}
                    name={project.title}
                    className="col-span-1"
                    background={<div />}
                    Icon={Icons.github}
                    description={project.description}
                    href={project.links?.find((link: any) => link.type === "Website")?.href || project.href}
                    githubHref={project.links?.find((link: any) => link.type === "Source")?.href}
                    cta="View Code"
                  />
                ))}
              </BentoGrid>
            </BlurFade>
          </div>
        </section>
        <ContactSection delay={BLUR_FADE_DELAY * 16} />
      </div>
    </main>
    </>
  );
}
