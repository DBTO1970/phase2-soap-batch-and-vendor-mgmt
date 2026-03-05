"use client"; // This is a Client Component

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    // This tells Next.js to re-fetch the data for the current route
    router.refresh(); 
    // Small timeout to show the loading state
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-700 disabled:opacity-50"
    >
      {loading ? "Refreshing..." : "Refresh Data"}
    </button>
  );
}