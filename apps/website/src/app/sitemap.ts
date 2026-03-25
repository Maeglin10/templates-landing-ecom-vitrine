import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3002";
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, priority: 0.6 },
  ];
}
