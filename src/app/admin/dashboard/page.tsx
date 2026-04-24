import Link from "next/link";
import DataExportTools from "./DataExportTools";

export default function AdminDashboard() {
  const adminModules = [
    {
      name: "Inventory",
      href: "/inventory",
      description: "Manage and track stock levels.",
      icon: "📦",
    },
    {
      name: "Batches",
      href: "/batches",
      description: "Track soap production, recipes, and ready dates.",
      icon: "🧼",
    },
    {
      name: "Clients",
      href: "/admin/clients",
      description: "Manage vendor contacts and generate invoices.",
      icon: "👥",
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Select a module to manage your morning ritual operations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminModules.map((module) => (
          <Link
            key={module.name}
            href={module.name === "Clients" ? "/admin/clients" : module.href}
            className="group p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col h-full"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
              {module.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {module.name}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {module.description}
            </p>
          </Link>
        ))}
      </div>

      <DataExportTools />
    </div>
  );
}
