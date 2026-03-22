// middleware.ts

import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config"; // Point to the new file
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/about", "/contact", "/login", "/api/sync-sheet"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  if (
    pathname.startsWith('/_next') || 
    pathname.includes('.') || 
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

 const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    if (isLoggedIn && pathname === "/login") {
      return NextResponse.redirect(new URL("/inventory", nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Protect everything else
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\..*).*)"],
};