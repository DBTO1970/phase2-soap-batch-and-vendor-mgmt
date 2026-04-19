import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnRegister = req.nextUrl.pathname.startsWith("/register");
  const isOnProtected = req.nextUrl.pathname.startsWith("/inventory") || req.nextUrl.pathname.startsWith("/batches");

  if ((isOnAdmin || isOnProtected || isOnRegister) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/inventory/:path*", "/batches/:path*", "/register/:path*", "/api/batches/:path*", "/api/register/:path*"],
};