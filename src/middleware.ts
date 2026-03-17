// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const apiKey = req.headers.get("x-api-key");

  // 1. HIGH PRIORITY: If the sync route has the correct key, let it pass immediately!
  // We check this BEFORE checking for a token, so external tools don't get blocked.
  if (path === "/api/sync-sheet" && apiKey === process.env.SYNC_API_KEY) {
    return NextResponse.next();
  }

  // 2. Auth Check: Get token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    console.log("DEBUG: Middleware: No token found. Redirecting to signin.");
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  console.log("DEBUG: Middleware: Token found:", token);

  // 3. Protect /batches
  if (path.startsWith("/batches")) {
    // We already have the token from step 2
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/batches/:path*", "/api/sync-sheet"],
};