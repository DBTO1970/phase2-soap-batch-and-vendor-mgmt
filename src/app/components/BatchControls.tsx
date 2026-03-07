"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function BatchControls({ currentQuery, currentSort }: { currentQuery: string, currentSort: string }) {
  const router = useRouter();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 text-sm pr-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 placeholder-slate-400"
          value={currentQuery}
          onChange={(e) => updateParams("q", e.target.value)}
        />
        {/* Clear Button */}
        {currentQuery && (
          <button
            onClick={() => updateParams("q","")}
            className="absolute right-2 text-slate-400 hover:text-slate-600 font-bold"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <select 
        className="border rounded px-3 py-2 text-sm pr-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 placeholder-slate-400"
        value={currentSort}
        onChange={(e) => updateParams("sort", e.target.value)}
      >
        <option value="readyDate_desc">Ready Date (Newest)</option>
        <option value="readyDate_asc">Ready Date (Oldest)</option>
        <option value="total_desc">Total Stock (High to Low)</option>
        <option value="total_asc">Total Stock (Low to High)</option>
      </select>
    </div>
  );
}