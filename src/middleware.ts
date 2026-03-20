// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. EXEMPTION: If it's the sync route, skip middleware entirely.
  // The API Key check is already inside your app/api/sync-sheet/route.ts.
  if (path === "/api/sync-sheet") {
    return NextResponse.next();
  }

  // 2. Auth Check: Get token for everything else
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

 const isAdminPage = path.startsWith("/batches") || path.startsWith("/inventory");

if (isAdminPage && token.role !== "ADMIN") {
  console.log("Access denied: User is not an ADMIN");
  return NextResponse.redirect(new URL("/", req.url));
}

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/batches/:path*", 
    "/inventory/:path*", // Added this!
    "/api/sync-sheet"
  ],
};