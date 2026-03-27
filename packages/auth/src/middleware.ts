import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function withAdminAuth(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const role = token.role as string;
  if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
}

export function requireRole(role: string, userRole: string): boolean {
  const hierarchy: Record<string, number> = { EDITOR: 1, ADMIN: 2, SUPER_ADMIN: 3 };
  return (hierarchy[userRole] ?? 0) >= (hierarchy[role] ?? 99);
}
