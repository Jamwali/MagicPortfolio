import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description: "Notes on machine learning, shipping software, and the work in between.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = (await getBlogPosts()).sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-16 md:py-24 lg:px-10">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.035em]">
          Writing
        </h1>
        <p className="mt-4 max-w-[52ch] text-[clamp(1.0625rem,1.2vw,1.25rem)] leading-relaxed text-muted-foreground">
          Notes on machine learning, shipping software, and the work in between.
        </p>
      </BlurFade>

      {posts.length === 0 ? (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="mt-16 border-t border-[hsl(var(--rule))] pt-12 text-[17px] text-muted-foreground">
            Nothing published yet. In the meantime, the{" "}
            <Link href="/#projects" className="font-medium text-signal">
              projects
            </Link>{" "}
            are where the thinking lives.
          </p>
        </BlurFade>
      ) : (
        <ul className="mt-16 border-t border-[hsl(var(--rule))]">
          {posts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <li className="border-b border-[hsl(var(--rule))]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 py-7 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <span className="text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-snug tracking-tight transition-colors group-hover:text-signal">
                    {post.metadata.title}
                    <ArrowUpRight
                      aria-hidden
                      className="ml-1.5 inline size-[0.75em] -translate-y-[0.08em] text-muted-foreground transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-[0.2em]"
                    />
                  </span>
                  <span className="shrink-0 text-[15px] text-muted-foreground">
                    {formatDate(post.metadata.publishedAt)}
                  </span>
                </Link>
              </li>
            </BlurFade>
          ))}
        </ul>
      )}
    </main>
  );
}
