import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Protect the /batches route
  if (path.startsWith("/batches")) {
    const token = await getToken({ req });
    
    // If no token (not logged in), redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Optional: Check if user is actually an admin
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}