import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. EXCEPTION: Allow Google Sheets to bypass Middleware entirely
  // We check this BEFORE searching for a session token to save resources
  if (pathname === "/api/sync-sheet") {
    return NextResponse.next();
  }

  // 2. Auth Check
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // 3. Logic: Redirect logged-in users away from /login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/inventory", req.url));
  }

  // 4. Logic: Protect Inventory & Batches
  const isProtectedRoute = pathname.startsWith("/inventory") || pathname.startsWith("/batches");
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 5. Admin protection for /batches
  if (pathname.startsWith("/batches") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/inventory", req.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all paths EXCEPT:
   * 1. /api/auth (NextAuth internals)
   * 2. /_next (Static files)
   * 3. /fonts, /images, favicon.ico (Public assets)
   */
  matcher: ["/((?!api/auth|_next|fonts|images|favicon.ico).*)"],
};