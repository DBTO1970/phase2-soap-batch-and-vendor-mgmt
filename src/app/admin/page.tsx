'use client';

import { useState, useEffect } from 'react';

type BatchEntry = {
  name: string;
  recipe: string;
  onHandLabeled: string | number;
  onHandUnlabeled: string | number;
  madeDate: string;
  readyDate: string;
  waterOz: string | number;
  fragranceOil: string;
  fragranceAmountOz: string | number;
  notes: string;
  additionalIngredients: string;
  oilTemp: string | number;
  lyeTemp: string | number;
  sheetId: string;
};

export default function AdminBatches() {
  const [batches, setBatches] = useState<any[]>([]);
  const [newEntries, setNewEntries] = useState<BatchEntry[]>([emptyEntry()]);
  const [loading, setLoading] = useState(false);

  function emptyEntry(): BatchEntry {
    return {
      name: '', recipe: '', onHandLabeled: 0, onHandUnlabeled: 0,
      madeDate: '', readyDate: '', waterOz: 0, fragranceOil: '',
      fragranceAmountOz: 0, notes: '', additionalIngredients: '',
      oilTemp: 0,
      lyeTemp: 0,
      sheetId: ''
    };
  }

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    const res = await fetch('/api/batches');
    const data = await res.json();
    setBatches(data);
  };

  const handleAddRow = () => setNewEntries([...newEntries, emptyEntry()]);

  const handleRemoveRow = (index: number) => {
    if (newEntries.length === 1) return;
    setNewEntries(newEntries.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: keyof BatchEntry, value: any) => {
    const updated = [...newEntries];
    const newEntry = { ...updated[index], [field]: value };

    // Auto-calculate readyDate (Made Date + 21 days) when madeDate changes
    if (field === 'madeDate' && value) {
      const date = new Date(value + 'T12:00:00');
      date.setDate(date.getDate() + 21);
      newEntry.readyDate = date.toISOString().split('T')[0];
    }

    updated[index] = newEntry;
    setNewEntries(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Prepare entries: auto-generate sheetId and ensure correct data types for Prisma
    const entriesToSave = newEntries.map(entry => ({
      ...entry,
      sheetId: `BATCH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      onHandLabeled: Number(entry.onHandLabeled) || 0,
      onHandUnlabeled: Number(entry.onHandUnlabeled) || 0,
      waterOz: Number(entry.waterOz) || 0,
      fragranceAmountOz: Number(entry.fragranceAmountOz) || 0,
      oilTemp: Number(entry.oilTemp) || 0,
      lyeTemp: Number(entry.lyeTemp) || 0,
    }));

    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entriesToSave),
      });

      if (res.ok) {
        setNewEntries([emptyEntry()]);
        fetchBatches();
      } else {
        const err = await res.json();
        alert(`Error saving batches: ${err.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('A network error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, field: string, value: number) => {
    try {
      const safeValue = isNaN(value) ? 0 : value;
      const res = await fetch(`/api/batches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: safeValue }),
      });
      if (!res.ok) throw new Error('Failed to update');
      fetchBatches();
    } catch (err) {
      alert('Failed to update quantity. Please check your connection.');
    }
  };

  const deleteBatch = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/batches/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchBatches();
    } catch (err) {
      alert('Failed to delete batch.');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Batch Administration</h1>

      {/* CREATE FORM */}
      <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Add New Batches</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {newEntries.map((entry, idx) => (
            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded border border-slate-100">
              {newEntries.length > 1 && (
                <button 
                  type="button"
                  onClick={() => handleRemoveRow(idx)}
                  className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 border shadow flex items-center justify-center hover:bg-red-50"
                >
                  ×
                </button>
              )}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Soap Name</label>
                <input
                  required
                  className="border p-2 rounded"
                  value={entry.name}
                  onChange={(e) => handleInputChange(idx, 'name', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Made Date</label>
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={entry.madeDate}
                  onChange={(e) => handleInputChange(idx, 'madeDate', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Ready Date</label>
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={entry.readyDate}
                  onChange={(e) => handleInputChange(idx, 'readyDate', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Recipe</label>
                <input
                  className="border p-2 rounded"
                  value={entry.recipe}
                  placeholder="e.g. Olive Oil Blend"
                  onChange={(e) => handleInputChange(idx, 'recipe', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Labeled Qty</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={entry.onHandLabeled}
                  onChange={(e) => handleInputChange(idx, 'onHandLabeled', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Unlabeled Qty</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={entry.onHandUnlabeled}
                  onChange={(e) => handleInputChange(idx, 'onHandUnlabeled', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Water (oz)</label>
                <input
                  type="number"
                  step="0.01"
                  className="border p-2 rounded"
                  value={entry.waterOz}
                  onChange={(e) => handleInputChange(idx, 'waterOz', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Fragrance Oil</label>
                <input
                  className="border p-2 rounded"
                  value={entry.fragranceOil}
                  onChange={(e) => handleInputChange(idx, 'fragranceOil', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Fragrance Amount (oz)</label>
                <input
                  type="number"
                  step="0.01"
                  className="border p-2 rounded"
                  value={entry.fragranceAmountOz}
                  onChange={(e) => handleInputChange(idx, 'fragranceAmountOz', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Oil Temp (°F)</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={entry.oilTemp}
                  onChange={(e) => handleInputChange(idx, 'oilTemp', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Lye Temp (°F)</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={entry.lyeTemp}
                  onChange={(e) => handleInputChange(idx, 'lyeTemp', e.target.value)}
                />
              </div>
              <div className="flex flex-col md:col-span-4">
                <label className="text-xs font-bold text-slate-500 uppercase">ADDITIONAL INGREDIENTS</label>
                <textarea
                  className="border p-2 rounded"
                  rows={2}
                  value={entry.additionalIngredients}
                  onChange={(e) => handleInputChange(idx, 'additionalIngredients', e.target.value)}
                />
              </div>
              <div className="flex flex-col md:col-span-4">
                <label className="text-xs font-bold text-slate-500 uppercase">Notes</label>
                <textarea
                  className="border p-2 rounded"
                  rows={2}
                  value={entry.notes}
                  onChange={(e) => handleInputChange(idx, 'notes', e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleAddRow}
              className="text-blue-600 font-medium hover:underline"
            >
              + Add more batches
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save All Batches'}
            </button>
          </div>
        </form>
      </section>

      {/* INVENTORY TABLE */}
      <section className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Batch Inventory</h2>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-3">Batch Name</th>
              <th className="px-6 py-3">Notes/Additions</th>
              <th className="px-6 py-3">Dates</th>
              <th className="px-6 py-3">Labeled</th>
              <th className="px-6 py-3">Unlabeled</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {batches.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-2 py-4">
                  <div className="font-medium">{b.name}</div>
                  <div className="text-sm text-slate-400">{b.recipe}</div>
                </td>
                <td className="px-4 py-4">
                    <div className="font-medium">{b.notes}</div>
                    <div className="text-sm text-slate-400">{b.additionalIngredients}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <div>Made: {b.madeDate ? new Date(b.madeDate).toLocaleDateString() : 'N/A'}</div>
                  <div>Ready: {b.readyDate ? new Date(b.readyDate).toLocaleDateString() : 'N/A'}</div>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="w-20 border rounded p-1"
                    defaultValue={b.onHandLabeled}
                    onBlur={(e) => updateQuantity(b.id, 'onHandLabeled', Number(e.target.value) || 0)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="w-20 border rounded p-1"
                    defaultValue={b.onHandUnlabeled}
                    onBlur={(e) => updateQuantity(b.id, 'onHandUnlabeled', Number(e.target.value) || 0)}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteBatch(b.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
