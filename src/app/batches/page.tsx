import { prisma } from "@/lib/prisma";
import RefreshButton from "../components/RefreshButton";

export default async function BatchesPage() {
  // Fetch all batches, newest first
  const batches = await prisma.soapBatch.findMany({
    where: {
    OR: [
      { onHandLabeled: { gte: 1 } },
      { onHandUnlabeled: { gte: 1 } },
    ],
  },
  orderBy: { readyDate: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">Morning Rituals Inventory</h1>
        <RefreshButton />
        <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
          {batches.length} Active Batches
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-slate-900">{batch.name}</h2>
                <span className="text-xs font-mono bg-black text-white px-2 py-1 rounded">
                  {batch.sheetId}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-4 italic">
                {batch.recipe || "No recipe specified"} {batch.colorDesign ? `- ${batch.colorDesign}` : ""}
              </p>
                <div>
                   <span className={batch.readyDate && new Date() >= new Date(batch.readyDate) ? "text-green-500 font-bold" : ""}>
                    Total On Hand: {((batch.onHandLabeled || 0) + (batch.onHandUnlabeled || 0))}
                  </span>
                  <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Labeled:</span>
                  <span className="font-semibold text-green-600">{batch.onHandLabeled}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Unlabeled:</span>
                  <span className="font-semibold text-blue-600">{batch.onHandUnlabeled}</span>
                </div>
                </div>
                
              </div>
              
              

              <div className="space-y-3">
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Frgrance Oil:</span>
                  <span className="font-semibold text-blue-600">{batch.fragranceOil} {batch.fragranceAmountOz}oz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Additional Ingredients:</span>
                  <span className="font-semibold text-blue-600">{batch.additionalIngredients}</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-center text-xs text-slate-400">
                  <span>Made: {batch.madeDate ? new Date(batch.madeDate).toLocaleDateString() : "N/A"}</span>
                  <span className={batch.readyDate && new Date() >= new Date(batch.readyDate) ? "text-green-500 font-bold" : ""}>
                    Ready: {batch.readyDate ? new Date(batch.readyDate).toLocaleDateString() : "N/A"}
                  </span>
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {batches.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-lg border-2 border-dashed">
          <p className="text-slate-400">No batches found. Try editing your Google Sheet to sync data!</p>
        </div>
      )}
    </div>
  );
}