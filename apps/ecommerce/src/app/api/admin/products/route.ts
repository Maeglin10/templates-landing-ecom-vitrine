import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

function isAdminOrAbove(role: string | undefined): boolean {
  return ["ADMIN", "SUPER_ADMIN"].includes(role ?? "");
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  if (!isAdminOrAbove(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = productSchema.parse(await req.json());
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product, { status: 201 });
}
