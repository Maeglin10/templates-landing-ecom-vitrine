import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function withAdminAuth(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const role = token.role;
  if (typeof role !== "string" || !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
}

export function requireRole(role: string, userRole: string): boolean {
  const hierarchy = { EDITOR: 1, ADMIN: 2, SUPER_ADMIN: 3 };
  return (hierarchy[userRole as keyof typeof hierarchy] ?? 0) >= (hierarchy[role as keyof typeof hierarchy] ?? 99);
}
