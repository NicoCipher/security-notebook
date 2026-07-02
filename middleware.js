import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/admin/:path*"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Login/logout must stay reachable without an existing session.
  if (pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const valid = token && secret ? await verifySessionToken(token, secret) : false;

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    const loginUrl = new URL("/admin", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
