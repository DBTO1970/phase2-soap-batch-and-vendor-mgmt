import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createId } from '@paralleldrive/cuid2';
import { auth } from "@/auth";

// GET: Fetch all batches
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const batches = await prisma.soapBatch.findMany({
      orderBy: { madeDate: 'desc' },
    });
    return NextResponse.json(batches);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Bulk create batches
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const batchesToCreate = Array.isArray(body) ? body : [body];

    // Using a transaction ensures either all batches are created or none are
    const createdBatches = await prisma.$transaction(
      batchesToCreate.map((batch: any) =>
        prisma.soapBatch.create({
          data: {
            ...batch,
            id: createId(),
            madeDate: (batch.madeDate && batch.madeDate.trim() !== "") ? new Date(batch.madeDate) : null,
            readyDate: (batch.readyDate && batch.readyDate.trim() !== "") ? new Date(batch.readyDate) : null,
          },
        })
      )
    );

    return NextResponse.json({ success: true, count: createdBatches.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
