import type { NextAuthConfig } from "next-auth";

// This configuration is Edge-compatible (no database adapter)
export const authConfig = {
  providers: [], // Add your Microsoft Entra ID or other providers here
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnProtected = nextUrl.pathname.startsWith("/inventory") || nextUrl.pathname.startsWith("/batches");

      if (isOnAdmin || isOnProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect to /login
      }
      return true;
    },
  },
} satisfies NextAuthConfig;