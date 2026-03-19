"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-6">
        <Link href="/batches" className="text-xl font-bold text-blue-600">
          Morning Rituals Soap Manager
        </Link>
        
        {session && (
          <div className="hidden md:flex gap-4 text-gray-600">
            <Link href="/batches" className="hover:text-blue-600 transition">Batches</Link>
            <Link href="/inventory" className="hover:text-blue-600 transition">Inventory</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <span className="text-sm text-gray-400 italic">Checking session...</span>
        ) : session ? (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{session.user?.name || "Admin"}</p>
              <p className="text-xs text-gray-500">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition shadow-sm"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}