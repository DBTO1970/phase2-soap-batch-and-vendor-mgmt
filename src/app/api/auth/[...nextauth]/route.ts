// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

authorize: async (credentials: { email: string; password: string; }) => {
  if (!credentials?.email || !credentials?.password) return null;

  const user = await prisma.user.findUnique({
    where: { email: credentials.email as string }
  });

  // Check if user exists and has a password set
  if (!user || !user.password) {
    console.log("Auth Fail: User not found or no password set");
    return null;
  }

  const isValid = await bcrypt.compare(
    credentials.password as string,
    user.password
  );

  if (!isValid) {
    console.log("Auth Fail: Password mismatch");
    return null;
  }

  return user;
}

const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  // 1. Let NextAuth handle secure cookies automatically based on the environment
  useSecureCookies: isProduction,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

       // Check if user exists and has a password set
    if (!user || !user.password) {
      console.log("Auth Fail: User not found or no password set");
      return null;
    }

    const isValid = await bcrypt.compare(
      credentials.password as string,
      user.password
    );

    if (!isValid) {
      console.log("Auth Fail: Password mismatch");
      return null;
    }

    return user;
  }
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