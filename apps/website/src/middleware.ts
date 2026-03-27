import { withAdminAuth } from "@repo/auth";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const redirect = await withAdminAuth(req);
    if (redirect) return redirect;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
