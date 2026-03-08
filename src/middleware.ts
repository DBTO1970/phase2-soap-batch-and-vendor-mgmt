// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const apiKey = req.headers.get("x-api-key");

  // 1. HIGH PRIORITY: If the sync route has the correct key, let it pass immediately!
  if (path === "/api/sync-sheet" && apiKey === process.env.SYNC_API_KEY) {
    return NextResponse.next();
  }

  // 2. Protect /batches
  if (path.startsWith("/batches")) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/batches/:path*", "/api/sync-sheet"],
};