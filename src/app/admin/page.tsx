'use client';

import { useState, useEffect } from 'react';
import type { SoapBatch } from '@prisma/client';

type BatchEntry = {
  name: string;
  recipe: string;
  totalBars: string | number;
  madeDate: string;
  readyDate: string;
  fragranceOils: string[];
  fragranceAmountOz: string | number;
  notes: string;
  additionalIngredients: string;
  sheetId: string;
};

const BASE_ADDITIONAL_INGREDIENTS =
  'Olive Oil, Coconut Oil, Castor Oil, Avacado Oil, Shea Butter, Cocoa Butter,';

export default function AdminBatches() {
  const [batches, setBatches] = useState<SoapBatch[]>([]);
  const [newEntries, setNewEntries] = useState<BatchEntry[]>([emptyEntry()]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ready' | 'comingSoon' | 'lowStock'>('all');

  function emptyEntry(): BatchEntry {
    return {
      name: '', recipe: '', totalBars: 0,
      madeDate: '', readyDate: '', fragranceOils: [''],
      fragranceAmountOz: 0, notes: '',
      additionalIngredients: BASE_ADDITIONAL_INGREDIENTS,
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

  const getTotalBars = (batch: Pick<SoapBatch, 'onHandLabeled' | 'onHandUnlabeled'>) =>
    (batch.onHandLabeled || 0) + (batch.onHandUnlabeled || 0);

  const filteredBatches = batches.filter((batch) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query || [
      batch.name,
      batch.recipe,
      batch.notes,
      batch.additionalIngredients,
      batch.sheetId,
    ].some((value) => String(value || '').toLowerCase().includes(query));

    if (!matchesSearch) return false;

    const totalBars = getTotalBars(batch);
    const readyDate = batch.readyDate ? new Date(batch.readyDate) : null;
    const isReady = readyDate ? readyDate <= new Date() : false;

    switch (statusFilter) {
      case 'ready':
        return totalBars > 0 && isReady;
      case 'comingSoon':
        return totalBars > 0 && !isReady;
      case 'lowStock':
        return totalBars < 2;
      default:
        return true;
    }
  });

  const handleAddRow = () => setNewEntries([...newEntries, emptyEntry()]);

  const handleFragranceOilChange = (entryIndex: number, oilIndex: number, value: string) => {
    setNewEntries((entries) => entries.map((entry, index) => {
      if (index !== entryIndex) return entry;
      const fragranceOils = [...entry.fragranceOils];
      fragranceOils[oilIndex] = value;
      return { ...entry, fragranceOils };
    }));
  };

  const handleAddFragranceOil = (entryIndex: number) => {
    setNewEntries((entries) => entries.map((entry, index) =>
      index === entryIndex
        ? { ...entry, fragranceOils: [...entry.fragranceOils, ''] }
        : entry,
    ));
  };

  const handleRemoveFragranceOil = (entryIndex: number, oilIndex: number) => {
    setNewEntries((entries) => entries.map((entry, index) =>
      index === entryIndex
        ? { ...entry, fragranceOils: entry.fragranceOils.filter((_, i) => i !== oilIndex) }
        : entry,
    ));
  };

  const handleRemoveRow = (index: number) => {
    if (newEntries.length === 1) return;
    setNewEntries(newEntries.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: keyof BatchEntry, value: BatchEntry[keyof BatchEntry]) => {
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
    const entriesToSave = newEntries.map((entry) => {
      const { totalBars, fragranceOils, ...entryData } = entry;
      return {
        ...entryData,
        fragranceOil: fragranceOils.map((oil) => oil.trim()).filter(Boolean).join(', '),
        sheetId: `BATCH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        onHandLabeled: Number(totalBars) || 0,
        onHandUnlabeled: 0,
        fragranceAmountOz: Number(entry.fragranceAmountOz) || 0,
      };
    });

    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entriesToSave),
      });

      if (res.ok) {
        setNewEntries([emptyEntry()]);
        await fetchBatches();
      } else {
        const err = await res.json();
        alert(`Error saving batches: ${err.error || 'Unknown error'}`);
      }
    } catch {
      alert('A network error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const updateTotalBars = async (id: string, totalBars: number) => {
    try {
      const safeValue = isNaN(totalBars) ? 0 : totalBars;
      const res = await fetch(`/api/batches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onHandLabeled: safeValue, onHandUnlabeled: 0 }),
      });
      if (!res.ok) throw new Error('Failed to update');
      await fetchBatches();
    } catch {
      alert('Failed to update quantity. Please check your connection.');
    }
  };

  const deleteBatch = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/batches/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchBatches();
    } catch {
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
                <label className="text-xs font-bold text-slate-500 uppercase">Total Bars</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={entry.totalBars}
                  onChange={(e) => handleInputChange(idx, 'totalBars', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Fragrance Oils</label>
                {entry.fragranceOils.map((oil, oilIdx) => (
                  <div key={oilIdx} className="flex items-center gap-2">
                    <input
                      className="min-w-0 flex-1 border p-2 rounded"
                      value={oil}
                      onChange={(e) => handleFragranceOilChange(idx, oilIdx, e.target.value)}
                      aria-label={`Fragrance oil ${oilIdx + 1}`}
                    />
                    {entry.fragranceOils.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFragranceOil(idx, oilIdx)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-sm text-slate-600 hover:bg-slate-100"
                        aria-label={`Remove fragrance oil ${oilIdx + 1}`}
                      >
                        −
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddFragranceOil(idx)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  aria-label="Add fragrance oil"
                  title="Add fragrance oil"
                >
                  +
                </button>
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
        <div className="p-6 border-b">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-semibold">Batch Inventory</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-3 py-2 text-sm min-w-[220px]"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'ready' | 'comingSoon' | 'lowStock')}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="all">All Batches</option>
                <option value="ready">Ready Now</option>
                <option value="comingSoon">Coming Soon</option>
                <option value="lowStock">Low Stock</option>
              </select>
            </div>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-3">Batch Name</th>
              <th className="px-6 py-3">Notes/Additions</th>
              <th className="px-6 py-3">Dates</th>
              <th className="px-6 py-3">Total Bars</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredBatches.map((b) => (
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
                    defaultValue={(b.onHandLabeled || 0) + (b.onHandUnlabeled || 0)}
                    onBlur={(e) => updateTotalBars(b.id, Number(e.target.value) || 0)}
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
        {filteredBatches.length === 0 && (
          <div className="px-6 py-10 text-center text-slate-500">No batches match the current search or filter.</div>
        )}
      </section>
    </div>
  );
}
