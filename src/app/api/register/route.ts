import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, password, name } = await request.json();

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create the user in Supabase
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER", 
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}