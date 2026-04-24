"use client";

import { useState } from "react";
import { SoapBatch, Client, Invoice, InvoiceItem } from "@prisma/client";
import { saveInvoice, getInvoicesForClient, updateInvoiceStatus, deleteInvoice } from "@/lib/actions";
import { downloadInvoicePDF } from "@/lib/invoice-generator";

type InvoiceWithItems = Invoice & {
  items: (InvoiceItem & {
    batch: SoapBatch;
  })[];
};

interface SelectedItem {
  batchId: string;
  name: string;
  quantity: number;
  price: number;
  maxQty: number;
}

export default function InvoiceActions({ client, inventory }: { client: Client; inventory: SoapBatch[] }) {
  const [view, setView] = useState<'none' | 'create' | 'list'>('none');
  const [invoices, setInvoices] = useState<InvoiceWithItems[]>([]);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<SelectedItem[]>([]);

  const now = new Date();
  // Filter and sort inventory: Only items with stock AND ready today or before
  const availableInventory = inventory
    .filter((b) => {
      const hasStock = (b.onHandLabeled ?? 0) + (b.onHandUnlabeled ?? 0) > 0;
      const isReady = b.readyDate && new Date(b.readyDate) <= now;
      return hasStock && isReady;
    })
    .sort((a, b) => {
      const dateA = a.readyDate ? new Date(a.readyDate).getTime() : 0;
      const dateB = b.readyDate ? new Date(b.readyDate).getTime() : 0;
      return dateB - dateA;
    });

  const loadInvoices = async () => {
    const data = await getInvoicesForClient(client.id);
    setInvoices(data);
    setView('list');
  };

  const handleSave = async () => {
    if (items.length === 0) return alert("Add items first");
    try {
      const newInvoice = await saveInvoice(client.id, items, notes);
      // Trigger the automatic PDF download using the returned invoice data
      handleDownload(newInvoice as InvoiceWithItems);

      setItems([]);
      setNotes("");
      setView('none');
      alert("Invoice saved and inventory updated.");
    } catch (error: any) {
      alert(error.message || "Failed to save invoice");
    }
  };

  const handleDownload = (inv: InvoiceWithItems) => {
    const lineItems = inv.items.map((i) => ({
      description: i.batch.name + " soap",
      quantity: i.quantity,
      price: i.price
    }));
    downloadInvoicePDF(client.name, client.company || "", lineItems, inv.notes || "");
  };

  return (
    <div className="flex gap-2 justify-end">
      <button onClick={() => setView('create')} className="text-indigo-600 hover:text-indigo-800 text-xs font-bold uppercase tracking-wider">Create</button>
      <span className="text-gray-300">|</span>
      <button onClick={loadInvoices} className="text-gray-600 hover:text-gray-800 text-xs font-bold uppercase tracking-wider">History</button>

      {view !== 'none' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[95vw] my-8">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 text-gray-800">
              <h3 className="font-bold">
                {view === 'create' ? `New Invoice: ${client.name}` : `Invoice History: ${client.name}`}
              </h3>
              <button onClick={() => setView('none')} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-6">
              {view === 'create' ? (
                <div className="space-y-4 text-left">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex flex-wrap items-end gap-3 border-b border-gray-100 pb-3">
                      <div className="flex-1 min-w-[200px]">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Select Soap</label>
                        <input 
                          list={`inv-batches-${client.id}`} 
                          className="max-w-full border rounded p-1.5 text-sm" 
                          placeholder="Search batches..."
                          onChange={(e) => {
                            const b = availableInventory.find(x => x.name === e.target.value);
                            if (b) {
                              const newItems = [...items];
                              const available = (b.onHandLabeled ?? 0) + (b.onHandUnlabeled ?? 0);
                              newItems[idx] = { 
                                ...newItems[idx], 
                                batchId: b.id, 
                                name: b.name, 
                                maxQty: available,
                                quantity: Math.min(newItems[idx].quantity, available)
                              };
                              setItems(newItems);
                            }
                          }}
                        />
                      </div>
                      <div className="w-fit min-w-[80px]">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Qty</label>
                        <input 
                          type="number" 
                          min="0" 
                          max={item.maxQty} 
                          value={item.quantity} 
                          className="w-full border rounded p-1.5 text-sm" 
                          onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].quantity = parseInt(e.target.value) || 0;
                          const val = parseInt(e.target.value) || 0;
                          // Enforce bounds: 0 <= quantity <= maxQty
                          newItems[idx].quantity = Math.max(0, Math.min(val, item.maxQty));
                          setItems(newItems);
                        }} />
                      </div>
                      <div className="w-fit min-w-[100px]">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Price/Bar</label>
                        <input type="number" step="0.01" value={item.price} className="w-full border rounded p-1.5 text-sm" onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].price = parseFloat(e.target.value) || 0;
                          setItems(newItems);
                        }} />
                      </div>
                      <button onClick={() => setItems(items.filter((_, i) => i !== idx))} className="text-red-400 p-1.5 hover:text-red-600">✕</button>
                    </div>
                  ))}
                  <button onClick={() => setItems([...items, { batchId: '', name: '', quantity: 1, price: 0, maxQty: 0 }])} className="text-indigo-600 text-sm font-bold hover:underline">+ Add Line Item</button>
                  
                  <div className="pt-4 p-2">
                    <label className="text-sm font-bold text-gray-700 px-2">Invoice Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter details about this purchase..." className="border rounded px-4 text-sm h-20 mt-1 focus:ring-1 focus:ring-indigo-500 outline-none" />
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-bold text-gray-800">Total: ${items.reduce((s, i) => s + (i.quantity * i.price), 0).toFixed(2)}</span>
                    <button onClick={handleSave} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors">Save & Close</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.length === 0 ? (
                    <p className="text-center text-gray-500 py-8 italic">No saved invoices found.</p>
                  ) : (
                    invoices.map((inv) => (
                      <div key={inv.id} className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-base">${inv.amount.toFixed(2)}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${inv.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {inv.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{new Date(inv.createdAt).toLocaleDateString()}</p>
                          <div>
                            {inv.items.map((item) => (
                              <div key={item.id} className="text-sm text-gray-700">
                                {item.batch.name} - {item.quantity} @ ${item.price.toFixed(2)} each
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => handleDownload(inv)} className="text-indigo-600 hover:underline text-xs font-bold uppercase">PDF</button>
                          {inv.status !== 'PAID' && (
                            <button onClick={async () => {
                              await updateInvoiceStatus(inv.id, 'PAID');
                              loadInvoices();
                            }} className="text-green-600 hover:underline text-xs font-bold uppercase">Paid</button>
                          )}
                          <button onClick={async () => {
                            if(confirm("Permanently delete this invoice?")) {
                              await deleteInvoice(inv.id);
                              loadInvoices();
                            }
                          }} className="text-red-500 hover:underline text-xs font-bold uppercase">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <datalist id={`inv-batches-${client.id}`}>
        {availableInventory.map(b => (
            <option key={b.id} value={b.name}>
            {`Available: ${(b.onHandLabeled ?? 0) + (b.onHandUnlabeled ?? 0)} | Ready: ${b.readyDate ? new Date(b.readyDate).toLocaleDateString() : 'N/A'}`}
          </option>
        ))}
      </datalist>
    </div>
  );
}
