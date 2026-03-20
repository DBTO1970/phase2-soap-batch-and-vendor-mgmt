// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // 1. Exemption for Sync API
  if (path === "/api/sync-sheet") return NextResponse.next();

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // 2. Logic: If logged in, don't let them see the login page
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/inventory", req.url));
  }

  // 3. Logic: If NOT logged in, only let them see public paths
  // If you want the home page "/" to be private, remove it from this array
  const isPublicPath = path === "/login" || path === "/";

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. Role Protection
  const isAdminPage = path.startsWith("/batches") || path.startsWith("/inventory");
  if (isAdminPage && token?.role !== "ADMIN") {
    // If they aren't admin, kick them back to a safe spot
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Pattern matches everything except static files and auth internals
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};