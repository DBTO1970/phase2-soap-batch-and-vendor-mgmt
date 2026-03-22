// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  providers: [
    // We leave this empty or minimal here; 
    // the actual logic stays in the route.ts
    Credentials({}), 
  ],
} satisfies NextAuthConfig;