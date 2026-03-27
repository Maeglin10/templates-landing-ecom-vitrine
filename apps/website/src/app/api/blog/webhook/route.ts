import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  publishImmediately: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.SKYBOT_WEBHOOK_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = schema.parse(await req.json());

  const author = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (!author) return NextResponse.json({ error: "No admin user found" }, { status: 500 });

  const post = await prisma.blogPost.upsert({
    where: { slug: body.slug },
    update: {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
      source: "SKYBOT",
      status: body.publishImmediately ? "PUBLISHED" : "DRAFT",
      publishedAt: body.publishImmediately ? new Date() : null,
    },
    create: {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
      source: "SKYBOT",
      appTarget: "WEBSITE",
      status: body.publishImmediately ? "PUBLISHED" : "DRAFT",
      publishedAt: body.publishImmediately ? new Date() : null,
      authorId: author.id,
    },
  });

  return NextResponse.json({ id: post.id, slug: post.slug, status: post.status }, { status: 201 });
}
