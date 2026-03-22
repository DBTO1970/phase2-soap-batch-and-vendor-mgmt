// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config"; // Point to the new file
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  if (pathname.startsWith("/api/sync-sheet")) return NextResponse.next();

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/inventory", nextUrl));
  }

  const isProtectedRoute = pathname.startsWith("/inventory") || pathname.startsWith("/batches");
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  const userRole = (req.auth?.user as any)?.role;
  if (pathname.startsWith("/batches") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/inventory", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};