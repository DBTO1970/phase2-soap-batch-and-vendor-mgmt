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
    console.log("DATA RECEIVED FROM GOOGLE:", body);

    // Basic validation: Ensure we at least have a sheetId and name
    if (!body.id || !body.name) {
      return NextResponse.json({ error: "Missing required fields: id or name" }, { status: 400 });
    }

    const batchData = {
      name: String(body.name || "Unnamed Batch"), 
      recipe: String(body.recipe || ""),
      onHandLabeled: parseInt(body.onHandLabeled) || 0,
      onHandUnlabeled: parseInt(body.onHandUnlabeled) || 0,
      madeDate: body.madeDate ? safeDate(body.madeDate) : safeDate(null),
      readyDate: body.readyDate ? safeDate(body.readyDate) : safeDate(null),
      waterOz: parseFloat(body.waterOz) || 0,
      additionalIngredients: String(body.additionalIngredients || ""),
      fragranceOil: String(body.fragranceOil || ""),
      fragranceAmountOz: parseFloat(body.fragranceAmountOz) || 0,
      colorDesign: String(body.colorDesign || ""),
      oilTemp: parseFloat(body.oilTemp) || 0,
      lyeTemp: parseFloat(body.lyeTemp) || 0,
      notes: String(body.notes || ""),
    };

    const batch = await prisma.soapBatch.upsert({
      where: { id: body.id },
      update: batchData,
      create: {
        sheetId: String(body.sheetId),
        ...batchData,
      },
    });

    return NextResponse.json({ success: true, batch });
  } catch (error: any) {
   // This will print the SPECIFIC field causing the error in your Vercel Logs
    console.error("FULL PRISMA ERROR:", JSON.stringify(error, null, 2));
    
    return NextResponse.json({ 
      error: "Internal Server Error",
      code: error.code,
      meta: error.meta 
    }, { status: 500 });
  }
}