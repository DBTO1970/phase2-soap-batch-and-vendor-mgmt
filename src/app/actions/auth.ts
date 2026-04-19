"use server";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";

export async function signInAction(email: string) {
    try {
    const result = await signIn("credentials", { email, redirect: false });
    console.log("Sign-in Result:", result); // What does this print?
    return { success: true };
  } catch (error) {
    console.error("Auth error details:", error);
    return { success: false, message: "Sign in failed" };
  }
}
