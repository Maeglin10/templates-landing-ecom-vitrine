import { withAdminAuth } from "@repo/auth";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return withAdminAuth(req);
}

export const config = {
  matcher: ["/admin/:path*"],
};
