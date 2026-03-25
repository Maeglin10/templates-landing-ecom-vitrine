import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3003";
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, priority: 1 },
    { url: `${baseUrl}/products`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/cart`, lastModified: now, priority: 0.5 },
  ];
}
