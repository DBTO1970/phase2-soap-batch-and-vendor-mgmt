// app/api/sync-batch/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const batch = await prisma.soapBatch.upsert({
      where: { sheetId: String(body.sheetId) },
      update: {
        onHandLabeled: parseInt(body.onHandLabeled) || 0,
        onHandUnlabeled: parseInt(body.onHandUnlabeled) || 0,
        madeDate: new Date(body.madeDate),
        readyDate: new Date(body.readyDate),
        name: body.name,
        recipe: body.recipe,
        waterOz: parseFloat(body.waterOz),
        additionalIngredients: body.additionalIngredients,
        fragranceOil: body.fragranceOil,
        fragranceAmountOz: parseFloat(body.fragranceAmountOz),
        colorDesign: body.colorDesign,
        oilTemp: parseFloat(body.oilTemp),
        lyeTemp: parseFloat(body.lyeTemp),
        notes: body.notes,
      },
      create: {
        sheetId: String(body.sheetId),
        onHandLabeled: parseInt(body.onHandLabeled) || 0,
        onHandUnlabeled: parseInt(body.onHandUnlabeled) || 0,
        madeDate: new Date(body.madeDate),
        readyDate: new Date(body.readyDate),
        name: body.name,
        recipe: body.recipe,
        waterOz: parseFloat(body.waterOz),
        additionalIngredients: body.additionalIngredients,
        fragranceOil: body.fragranceOil,
        fragranceAmountOz: parseFloat(body.fragranceAmountOz),
        colorDesign: body.colorDesign,
        oilTemp: parseFloat(body.oilTemp),
        lyeTemp: parseFloat(body.lyeTemp),
        notes: body.notes,
      },
    });

    return NextResponse.json({ success: true, batch });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Failed to sync" }, { status: 500 });
  }
}