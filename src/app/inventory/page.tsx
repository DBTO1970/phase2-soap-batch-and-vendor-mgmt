// app/inventory/page.tsx
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BatchControls from "../components/BatchControls";
import RefreshButton from "../components/RefreshButton"; 
import Link from "next/link";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; filter?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const params = await searchParams;
  const query = params.q || "";
  const sort = params.sort || "readyDate_desc";
  const activeFilter = params.filter || ""; // 'ready', 'curing', 'low'
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // 1. Fetch filtered data
  const rawBatches = await prisma.soapBatch.findMany({
    where: {
      AND: [
        { OR: [{ onHandLabeled: { gte: 1 } }, { onHandUnlabeled: { gte: 1 } }] },
        query ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { fragranceOil: { contains: query, mode: "insensitive" } },
          ],
        } : {},
      ]
    },
  });

  // 2. Calculations (Done on full set)
  const readyBatches = rawBatches.filter(b => b.readyDate && new Date(b.readyDate) <= now);
  const totalReadyBars = readyBatches.reduce((sum, b) => sum + (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0), 0);

  const curingBatches = rawBatches.filter(b => b.readyDate && new Date(b.readyDate) > now);
  const comingSoonBars = curingBatches.reduce((sum, b) => sum + (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0), 0);

  const lowInventoryBatches = rawBatches.filter(b => ((b.onHandLabeled || 0) + (b.onHandUnlabeled || 0)) < 2);

  // 3. Apply Box Filtering
  let filteredList = [...rawBatches];
  if (activeFilter === "ready") filteredList = readyBatches;
  if (activeFilter === "curing") filteredList = curingBatches;
  if (activeFilter === "low") filteredList = lowInventoryBatches;

  // 4. Sorting
  const batches = filteredList.sort((a, b) => {
    const totalA = (a.onHandLabeled || 0) + (a.onHandUnlabeled || 0);
    const totalB = (b.onHandLabeled || 0) + (b.onHandUnlabeled || 0);
    switch (sort) {
      case "readyDate_asc": return new Date(a.readyDate || 0).getTime() - new Date(b.readyDate || 0).getTime();
      case "total_desc": return totalB - totalA;
      case "total_asc": return totalA - totalB;
      default: return new Date(b.readyDate || 0).getTime() - new Date(a.readyDate || 0).getTime();
    }
  });

  // Helper to maintain query/sort when changing filters
  const getFilterUrl = (type: string) => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (sort) p.set("sort", sort);
    if (type && activeFilter !== type) p.set("filter", type);
    return `?${p.toString()}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 text-gray-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
          <p className="text-gray-500">Click a card to filter the list</p>
        </div>
        <div className="flex items-center gap-2">
           <RefreshButton />
           <BatchControls currentQuery={query} currentSort={sort} />
        </div>
      </div>

      {/* Hero Stats Section - Now Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href={getFilterUrl("ready")} className={`block p-6 rounded-2xl border transition-all hover:scale-[1.02] shadow-sm ${activeFilter === 'ready' ? 'bg-green-600 border-green-700 text-white ring-4 ring-green-100' : 'bg-green-50 border-green-200 text-green-900'}`}>
          <p className={`text-sm font-semibold uppercase tracking-wider ${activeFilter === 'ready' ? 'text-green-100' : 'text-green-600'}`}>Total Bars Available</p>
          <p className="text-4xl font-black mt-2">{totalReadyBars}</p>
          <p className={`text-xs mt-1 italic ${activeFilter === 'ready' ? 'text-green-100' : 'text-green-700'}`}>Ready to ship bars</p>
        </Link>

        <Link href={getFilterUrl("curing")} className={`block p-6 rounded-2xl border transition-all hover:scale-[1.02] shadow-sm ${activeFilter === 'curing' ? 'bg-blue-600 border-blue-700 text-white ring-4 ring-blue-100' : 'bg-blue-50 border-blue-200 text-blue-900'}`}>
          <p className={`text-sm font-semibold uppercase tracking-wider ${activeFilter === 'curing' ? 'text-blue-100' : 'text-blue-600'}`}>Coming Soon / Curing</p>
          <div className="flex flex-row gap-8 items-center mt-2">
            <div>
              <p className="text-4xl font-black">{curingBatches.length}</p>
              <p className={`text-xs mt-1 italic ${activeFilter === 'curing' ? 'text-blue-100' : 'text-blue-700'}`}>Batches</p>
            </div>
            <div>
              <p className="text-4xl font-black">{comingSoonBars}</p>
              <p className={`text-xs mt-1 italic ${activeFilter === 'curing' ? 'text-blue-100' : 'text-blue-700'}`}>Bars</p>
            </div>
          </div>
        </Link>

        <Link href={getFilterUrl("low")} className={`block p-6 rounded-2xl border transition-all hover:scale-[1.02] shadow-sm ${activeFilter === 'low' ? 'bg-red-600 border-red-700 text-white ring-4 ring-red-100' : 'bg-red-50 border-red-200 text-red-900'}`}>
          <p className={`text-sm font-semibold uppercase tracking-wider ${activeFilter === 'low' ? 'text-red-100' : 'text-red-600'}`}>Low Inventory</p>
          <p className="text-4xl font-black mt-2">{lowInventoryBatches.length}</p>
          <p className={`text-xs mt-1 italic ${activeFilter === 'low' ? 'text-red-100' : 'text-red-700'}`}>Items with &lt; 2 units</p>
        </Link>
      </div>

      {/* Detailed Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-gray-700 text-lg">
            {activeFilter ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Items` : 'Full Inventory Breakdown'}
          </h2>
          {activeFilter && (
            <Link href={getFilterUrl("")} className="text-xs font-bold text-blue-600 hover:underline">
              ✕ Clear Filter
            </Link>
          )}
        </div>
        
        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="min-w-full divide-y divide-gray-200 border-separate border-spacing-0">
            <thead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="sticky top-0 z-10 bg-gray-50 border-b px-6 py-4 text-left shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Soap Name</th>
                <th className="sticky top-0 z-10 bg-gray-50 border-b px-6 py-4 text-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Labeled</th>
                <th className="sticky top-0 z-10 bg-gray-50 border-b px-6 py-4 text-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Unlabeled</th>
                <th className="sticky top-0 z-10 bg-gray-50 border-b px-6 py-4 text-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Total</th>
                <th className="sticky top-0 z-10 bg-gray-50 border-b px-6 py-4 text-right shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Ready Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map((batch) => {
                const isReady = batch.readyDate && new Date(batch.readyDate) <= now;
                const total = (batch.onHandLabeled || 0) + (batch.onHandUnlabeled || 0);
                return (
                  <tr key={batch.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{batch.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono uppercase">{batch.sheetId}</div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">{batch.onHandLabeled}</td>
                    <td className="px-6 py-4 text-center text-sm">{batch.onHandUnlabeled}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${total < 2 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'}`}>
                        {total}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-[10px] font-bold">
                      <span className={`px-2 py-1 rounded uppercase ${isReady ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
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