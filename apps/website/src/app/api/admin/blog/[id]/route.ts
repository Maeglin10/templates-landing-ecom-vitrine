import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      ...body,
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  if (!["ADMIN", "SUPER_ADMIN"].includes(role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    await prisma.blogPost.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    throw err;
  }
}
