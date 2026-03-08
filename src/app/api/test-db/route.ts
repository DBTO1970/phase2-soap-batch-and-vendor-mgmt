import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Your production-ready client

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}