import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Allow the app to function if it's an internal Next.js path or the login page
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api/auth") || 
    pathname === "/login" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Redirect to login if there's no token and they try to access /inventory or /batches
  const isProtectedRoute = pathname.startsWith("/inventory") || pathname.startsWith("/batches");
  
  if (isProtectedRoute && !token) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  // 3. Admin protection
  if (pathname.startsWith("/batches") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/inventory", req.url));
  }

  return NextResponse.next();
}

// Keep the matcher simple to avoid recursion
export const config = {
  matcher: ["/inventory/:path*", "/batches/:path*", "/login"],
};