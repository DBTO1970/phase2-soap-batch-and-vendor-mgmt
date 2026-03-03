import { prisma } from "@/lib/prisma";

export default async function BatchesPage() {
  const batches = await prisma.soapBatch.findMany({
    orderBy: { madeDate: 'desc' }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Google Sheet Sync: Soap Batches</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-2 text-left">Batch Name</th>
              <th className="px-4 py-2 text-left">Made Date</th>
              <th className="px-4 py-2 text-right">Labeled</th>
              <th className="px-4 py-2 text-right">Unlabeled</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{batch.name}</td>
                <td className="px-4 py-2 text-gray-600">
                  {new Date(batch.madeDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-right">{batch.onHandLabeled}</td>
                <td className="px-4 py-2 text-right">{batch.onHandUnlabeled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}