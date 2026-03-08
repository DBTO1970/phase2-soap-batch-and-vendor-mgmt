import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
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
            role: "ADMIN" // Ensure your login gets ADMIN status
          },
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When a user logs in, 'user' is the object returned from authorize
      if (user) {
        token.id = user.id;
        // @ts-ignore - 'user' here is the Prisma User object
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore - Pass the role to the frontend session
        session.user.role = token.role;
      }
      return session;
    },
  },
});