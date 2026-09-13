import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-16 md:py-24 lg:px-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      {/* An article people arrive at from search needs its own way back into
          the site, not just the browser's. */}
      <Link
        href="/blog"
        className="inline-flex min-h-[44px] items-center gap-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="size-4" />
        All writing
      </Link>

      <article className="mt-8 max-w-[68ch]">
        <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          {post.metadata.title}
        </h1>
        <Suspense fallback={<p className="mt-4 h-6" />}>
          <p className="mt-4 text-[15px] text-muted-foreground">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>

        <div
          className="prose prose-neutral mt-12 max-w-none border-t border-[hsl(var(--rule))] pt-12 text-[17px] leading-relaxed dark:prose-invert prose-headings:tracking-tight prose-a:text-signal prose-a:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: post.source }}
        />
      </article>
    </main>
  );
}
