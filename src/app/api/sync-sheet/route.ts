// app/api/sync-sheet/route.ts
import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  // 1. Check API Key Security
  const apiKey = request.headers.get("x-api-key");
  const VALID_KEY = "d9b1c8e5-7a3b-4c8e-9f0a-2b1c3d4e5f6a"; // Match your Apps Script

  if (apiKey !== VALID_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // 2. Validation
    const sId = String(body.sheetId || "").trim();
    const sName = String(body.name || "").trim();

    if (!sId || !sName) {
      return NextResponse.json({ error: "Missing sheetId or Name" }, { status: 400 });
    }

    // 3. Map exactly what the Apps Script sends
    const batchData = {
      name: sName,
      recipe: String(body.recipe || "N/A"),
      onHandLabeled: parseInt(body.onHandLabeled) || 0,
      onHandUnlabeled: parseInt(body.onHandUnlabeled) || 0,
      madeDate: body.madeDate ? new Date(body.madeDate) : null,
      readyDate: body.readyDate ? new Date(body.readyDate) : null,
      waterOz: parseFloat(body.waterOz) || 0,
      additionalIngredients: String(body.additionalIngredients || "None"),
      fragranceOil: String(body.fragranceOil || "None"),
      fragranceAmountOz: parseFloat(body.fragranceAmountOz) || 0,
      colorDesign: String(body.colorDesign || "Plain"),
      oilTemp: parseFloat(body.oilTemp) || 0,
      lyeTemp: parseFloat(body.lyeTemp) || 0,
      notes: String(body.notes || ""),
    };

    // 4. Upsert Logic (Update if sheetId exists, else create)
    const batch = await prisma.soapBatch.upsert({
      where: { sheetId: sId },
      update: batchData,
      create: {
        id: createId(), // Internal CUID
        sheetId: sId,   // Google Sheet Row ID
        ...batchData,
      },
    });

    return NextResponse.json({ success: true, batch });
  } catch (error: any) {
    console.error("SYNC_ROUTE_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}