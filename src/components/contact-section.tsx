"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DATA } from "@/data/resume";
import Link from "next/link";

interface ContactSectionProps {
  delay: number;
}

const ContactSection = ({ delay }: ContactSectionProps) => {
  const handleResumeDownload = () => {
    window.open("/Ishaan_Jamwal_Coop_Resume.pdf", "_blank");
  };

  return (
    <section id="contact">
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
        <BlurFade delay={delay}>
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Want to chat? Just shoot me a dm{" "}
              <Link
                href={DATA.contact.social.LinkedIn.url}
                className="text-blue-500 hover:underline"
              >
                with a direct question on LinkedIn
              </Link>{" "}
              and I&apos;ll respond whenever I can. I will ignore all
              soliciting.
            </p>
            <div className="flex justify-center mt-6">
              <ShimmerButton
                onClick={handleResumeDownload}
                className="bg-blue-600 hover:bg-blue-700"
              >
                📄 Download Resume
              </ShimmerButton>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default ContactSection;
