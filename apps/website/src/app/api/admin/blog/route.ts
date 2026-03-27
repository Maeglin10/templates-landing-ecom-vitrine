import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  appTarget: z.enum(["ECOMMERCE", "WEBSITE"]),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = schema.parse(await req.json());
  const post = await prisma.blogPost.create({
    data: {
      ...body,
      source: "MANUAL",
      authorId: (session.user as any).id as string,
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
