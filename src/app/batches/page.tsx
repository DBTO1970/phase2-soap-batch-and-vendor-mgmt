// app/batches/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BatchControls from "../components/BatchControls";
import RefreshButton from "../components/RefreshButton"; 
import Link from "next/link";

export default async function BatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const query = params.q || "";
  const sort = params.sort || "readyDate_desc";

  // 1. Fetch filtered data from Database
  const rawBatches = await prisma.soapBatch.findMany({
    where: {
      AND: [
        {
          OR: [
            { onHandLabeled: { gte: 1 } },
            { onHandUnlabeled: { gte: 1 } }
          ],
        },
        query ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { fragranceOil: { contains: query, mode: "insensitive" } },
            { recipe: { contains: query, mode: "insensitive" } },
          ],
        } : {},
      ]
    },
  });

  // 2. Perform Sort Logic
  const batches = [...rawBatches].sort((a, b) => {
    const totalA = (a.onHandLabeled || 0) + (a.onHandUnlabeled || 0);
    const totalB = (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0);
    const dateA = new Date(a.readyDate || 0).getTime();
    const dateB = new Date(b.readyDate || 0).getTime();
    

    switch (sort) {
      case "readyDate_asc": return dateA - dateB;
      case "total_desc": return totalB - totalA;
      case "total_asc": return totalA - totalB;
      default: return dateB - dateA; // readyDate_desc
    }
  });
  const now = new Date();

  return (
    <div className="max-w-6xl mx-auto py-2 px-4 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Soap Batches</h1>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
          Total Batches: {batches.length}
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm bg-green-100 dark:bg-green-800 px-3 py-1 rounded">
          Total Bars Ready: {batches.filter(b => b.readyDate && new Date(b.readyDate) <= now)
          .reduce((sum, b) => sum + (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0), 0)}
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/admin" 
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Batches
          </Link>
          <RefreshButton />
          <BatchControls currentQuery={query} currentSort={sort} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{batch.name}</h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-mono uppercase">
                  {batch.fragranceOil || "No Fragrance"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-700">{batch.onHandLabeled}</p>
                  <p className="text-[10px] uppercase text-blue-500 font-semibold tracking-wide">Labeled</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-700">{batch.onHandUnlabeled}</p>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide">Unlabeled</p>
                </div>
                <div className="col-span-2 text-sm text-gray-600">Total on hand: <span className="font-bold">{(batch.onHandLabeled || 0) + (batch.onHandUnlabeled || 0)}</span></div>
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fragrance:</span>
                  <span className="font-medium text-gray-900">{batch.fragranceOil} {batch.fragranceAmountOz} oz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Additional Ingredients:</span>
                  <span className="font-medium text-gray-900"> {batch.additionalIngredients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Notes: </span>
                  <span className="font-medium text-gray-900"> {batch.notes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ready Date:</span>
                  <span className={`font-semibold ${new Date(batch.readyDate || 0) <= new Date() ? 'text-green-600' : 'text-orange-600'}`}>
                    {batch.readyDate ? new Date(batch.readyDate).toLocaleDateString() : 'N/A'}
                  </span>
                 
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-5 py-3 border-t rounded-b-xl flex justify-between items-center text-xs text-gray-400">
               <span>Water: {batch.waterOz}oz</span>
               <span>Temps: {batch.oilTemp}° / {batch.lyeTemp}°</span>
            </div>
          </div>
        ))}

        {batches.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No batches match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}