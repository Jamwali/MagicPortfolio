import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blog";
import { CASE_STUDIES } from "@/data/case-studies";
import { DATA } from "@/data/resume";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const base = DATA.url.endsWith("/") ? DATA.url : `${DATA.url}/`;

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}blog`, lastModified: new Date(), priority: 0.8 },
    ...CASE_STUDIES.map((study) => ({
      url: `${base}projects/${study.slug}`,
      lastModified: new Date(),
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${base}blog/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      priority: 0.7,
    })),
  ];
}
