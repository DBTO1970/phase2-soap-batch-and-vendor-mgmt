import { getClients, createClient, getInventory } from "@/lib/actions";
import InvoiceActions from "./InvoiceActions";
import ClientActions from "./ClientActions";

export default async function ClientsPage() {
  const [clients, inventory] = await Promise.all([getClients(), getInventory()]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Client Management</h1>

      {/* Add Client Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Client</h2>
        <form action={createClient} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="name"
            placeholder="Client Name"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            name="company"
            placeholder="Company (optional)"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Add Client
          </button>
        </form>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-hidden">
        <table className="w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-56 hidden md:table-cell">Email</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium truncate">{client.name}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{client.company || "N/A"}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 truncate hidden md:table-cell">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <ClientActions client={client} />
                    <span className="text-gray-300">|</span>
                    <InvoiceActions client={client} inventory={inventory} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
