"use client";

import { useState } from "react";
import { getClients, getInventory, getAllInvoices, getUsers } from "@/lib/actions";

export default function DataExportTools() {
  const [isExporting, setIsExporting] = useState(false);

  const downloadCSV = (filename: string, data: any[]) => {
    if (data.length === 0) {
      alert(`No data found for ${filename}`);
      return;
    }

    // Get headers from keys of the first object
    const headers = Object.keys(data[0]).join(",");
    
    // Map rows and escape commas/quotes
    const rows = data.map(row => 
      Object.values(row)
        .map(value => {
          const str = String(value ?? "");
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async (type: 'batches' | 'users' | 'invoices' | 'clients') => {
    setIsExporting(true);
    try {
      let data: any[] = [];
      switch (type) {
        case 'batches': data = await getInventory(); break;
        case 'users': data = await getUsers(); break;
        case 'clients': data = await getClients(); break;
        case 'invoices': 
          const rawInvoices = await getAllInvoices();
          // Flatten invoices for easier spreadsheet use
          data = rawInvoices.map(inv => ({
            id: inv.id,
            client: inv.client.name,
            amount: inv.amount,
            status: inv.status,
            date: inv.createdAt.toISOString(),
            notes: inv.notes || ""
          }));
          break;
      }
      downloadCSV(type, data);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-indigo-900">Data Management</h2>
          <p className="text-sm text-indigo-700">Export your database tables to CSV for reporting and backups.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            disabled={isExporting}
            onClick={() => handleExport('batches')}
            className="bg-white border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            📦 Batches
          </button>
          <button 
            disabled={isExporting}
            onClick={() => handleExport('clients')}
            className="bg-white border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            👥 Clients
          </button>
          <button 
            disabled={isExporting}
            onClick={() => handleExport('invoices')}
            className="bg-white border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            📄 Invoices
          </button>
          <button 
            disabled={isExporting}
            onClick={() => handleExport('users')}
            className="bg-white border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            👤 Users
          </button>
        </div>
      </div>
    </div>
  );
}