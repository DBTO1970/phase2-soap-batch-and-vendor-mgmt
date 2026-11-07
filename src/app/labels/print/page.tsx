import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BatchLabelPrintClient from "./BatchLabelPrintClient";

export default async function PrintLabelsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const fetchedBatches = await prisma.soapBatch.findMany({
    orderBy: { name: "asc" },
  });
  const batches = fetchedBatches
    .map((batch) => {
      const barCount = (batch.onHandLabeled ?? 0) + (batch.onHandUnlabeled ?? 0);
      const ingredients = [batch.additionalIngredients, batch.fragranceOil]
        .filter((ingredient): ingredient is string => Boolean(ingredient && ingredient !== "None"))
        .map((ingredient) => ingredient.trim().replace(/,\s*$/, ""))
        .filter(Boolean)
        .join(", ");

      return {
        id: batch.id,
        ProductName: batch.name,
        Ingredients: ingredients || "Not recorded",
        NetWeight: "",
        barCount,
      };
    })
    .filter((batch) => batch.barCount > 0);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Print Batch Labels
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Select batches with bars on hand, enter each bar&apos;s weight in ounces, choose the label quantities, then generate a print-ready PDF.
        </p>
      </header>
      <BatchLabelPrintClient batches={batches} />
    </main>
  );
}
