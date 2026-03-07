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
    console.log("DEBUG: Received Payload:", body);

    // Force values to strings and trim whitespace
    const sId = String(body.sheetId || "").trim();
    const sName = String(body.name || "").trim();

    // If we still don't have the basics, log exactly why
    if (!sId || !sName) {
      console.error(`VALIDATION FAILED. ID: "${sId}", Name: "${sName}"`);
      return NextResponse.json({ error: "Missing ID or Name" }, { status: 400 });
    }

    const batchData = {
      name: sName,
      recipe: String(body.recipe || "N/A"),
      onHandLabeled: parseInt(body.onHandLabeled) || 0,
      onHandUnlabeled: parseInt(body.onHandUnlabeled) || 0,
      madeDate: body.madeDate ? new Date(body.madeDate) : new Date(),
      readyDate: body.readyDate ? new Date(body.readyDate) : new Date(),
      waterOz: parseFloat(body.waterOz) || 0,
      additionalIngredients: String(body.additionalIngredients || "None"),
      fragranceOil: String(body.fragranceOil || "None"),
      fragranceAmountOz: parseFloat(body.fragranceAmountOz) || 0,
      colorDesign: String(body.colorDesign || "Plain"),
      oilTemp: parseFloat(body.oilTemp) || 0,
      lyeTemp: parseFloat(body.lyeTemp) || 0,
      notes: String(body.notes || ""),
    };

    // Generate a unique ID for the database primary key if it's a new record
const generatedId = `batch_${sId}`; 

const batch = await prisma.soapBatch.upsert({
 where: { sheetId: sId },
  update: batchData,
  create: {
    sheetId: sId,
    name: sName,
    ...batchData,
  },
});

    return NextResponse.json({ success: true, batch });
  } catch (error: any) {
    console.error("PRISMA ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}