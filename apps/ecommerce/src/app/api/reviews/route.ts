import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { productId, rating, comment } = parsed.data;

  // Prevent duplicate reviews
  const existing = await prisma.review.findFirst({
    where: { userId: session.user.id, productId },
  });
  if (existing) {
    return NextResponse.json(
      { error: "You have already reviewed this product" },
      { status: 409 }
    );
  }

  const review = await prisma.review.create({
    data: { userId: session.user.id, productId, rating, comment },
    include: { user: { select: { name: true, email: true } } },
  });

  return NextResponse.json(
    {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      authorName: review.user.name ?? review.user.email,
      createdAt: review.createdAt.toISOString(),
    },
    { status: 201 }
  );
}
