// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";
import Credentials from "next-auth/providers/credentials";

// 1. Destructure the core methods needed for your app
const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: { email: {} },
      authorize: async (credentials) => {
        if (!credentials?.email) return null;
        
        return await prisma.user.upsert({
          where: { email: credentials.email as string },
          update: {},
          create: { 
            email: credentials.email as string,
            role: "ADMIN" 
          },
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
});

// 2. Export these for use in other parts of your app
export { auth, signIn, signOut };

// 3. Explicitly export GET and POST for the Route Handler
export const GET = handlers.GET;
export const POST = handlers.POST;