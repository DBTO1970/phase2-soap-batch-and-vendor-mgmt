// app/api/sync-batch/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const safeNum = (val: any) => {
  const parsed = parseFloat(val);
  return isNaN(parsed) ? 0 : parsed;
};

// Helper to safely parse dates
const safeDate = (val: any) => {
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation: Ensure we at least have a sheetId and name
    if (!body.sheetId || !body.name) {
      return NextResponse.json({ error: "Missing required fields: sheetId or name" }, { status: 400 });
    }

    const batchData = {
      name: String(body.name),
      onHandLabeled: Math.floor(safeNum(body.onHandLabeled)),
      onHandUnlabeled: Math.floor(safeNum(body.onHandUnlabeled)),
      madeDate: safeDate(body.madeDate),
      readyDate: safeDate(body.readyDate),
      recipe: body.recipe || "",
      waterOz: safeNum(body.waterOz),
      additionalIngredients: body.additionalIngredients || "",
      fragranceOil: body.fragranceOil || "",
      fragranceAmountOz: safeNum(body.fragranceAmountOz),
      colorDesign: body.colorDesign || "",
      oilTemp: safeNum(body.oilTemp),
      lyeTemp: safeNum(body.lyeTemp),
      notes: body.notes || "",
    };

    const batch = await prisma.soapBatch.upsert({
      where: { sheetId: String(body.sheetId) },
      update: batchData,
      create: {
        sheetId: String(body.sheetId),
        ...batchData,
      },
    });

    return NextResponse.json({ success: true, batch });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}