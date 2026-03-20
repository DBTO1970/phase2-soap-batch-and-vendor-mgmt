// app/inventory/page.tsx
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BatchControls from "../components/BatchControls";
import RefreshButton from "../components/RefreshButton"; 

export default async function InventoryPage({
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
  const now = new Date();

  // 1. Fetch filtered data (only things currently in stock)
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
          ],
        } : {},
      ]
    },
  });

  // 2. Dashboard Calculations
  const totalReadyBars = rawBatches
    .filter(b => b.readyDate && new Date(b.readyDate) <= now)
    .reduce((sum, b) => sum + (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0), 0);

  const comingSoonCount = rawBatches
    .filter(b => b.readyDate && new Date(b.readyDate) > now).length;

  const lowInventoryBatches = rawBatches
    .filter(b => ((b.onHandLabeled || 0) + (b.onHandUnlabeled || 0)) < 2);

  // 3. Sorting
  const batches = [...rawBatches].sort((a, b) => {
    const totalA = (a.onHandLabeled || 0) + (a.onHandUnlabeled || 0);
    const totalB = (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0);
    switch (sort) {
      case "readyDate_asc": return new Date(a.readyDate || 0).getTime() - new Date(b.readyDate || 0).getTime();
      case "total_desc": return totalB - totalA;
      case "total_asc": return totalA - totalB;
      default: return new Date(b.readyDate || 0).getTime() - new Date(a.readyDate || 0).getTime();
    }
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p className="text-gray-500">Real-time stock levels & curing status</p>
        </div>
        <div className="flex items-center gap-2">
           <RefreshButton />
           <BatchControls currentQuery={query} currentSort={sort} />
        </div>
      </div>

      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-wider">Total Bars Available</p>
          <p className="text-4xl font-black text-green-900 mt-2">{totalReadyBars}</p>
          <p className="text-xs text-green-700 mt-1 italic">Ready to ship / sell</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Coming Soon</p>
          <p className="text-4xl font-black text-blue-900 mt-2">{comingSoonCount}</p>
          <p className="text-xs text-blue-700 mt-1 italic">Batches currently curing</p>
        </div>

        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wider">Low Inventory</p>
          <p className="text-4xl font-black text-red-900 mt-2">{lowInventoryBatches.length}</p>
          <p className="text-xs text-red-700 mt-1 italic">Items with &lt; 2 units</p>
        </div>
      </div>

      {/* Detailed Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-700 text-lg">Inventory Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Soap Name</th>
                <th className="px-6 py-3 text-center">Labeled</th>
                <th className="px-6 py-3 text-center">Unlabeled</th>
                <th className="px-6 py-3 text-center">Total</th>
                <th className="px-6 py-3 text-right">Ready Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map((batch) => {
                const isReady = batch.readyDate && new Date(batch.readyDate) <= now;
                const total = (batch.onHandLabeled || 0) + (batch.onHandUnlabeled || 0);
                
                return (
                  <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{batch.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{batch.sheetId}</div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 font-medium">
                      {batch.onHandLabeled}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {batch.onHandUnlabeled}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${total < 2 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'}`}>
                        {total}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${isReady ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {batch.readyDate ? new Date(batch.readyDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}