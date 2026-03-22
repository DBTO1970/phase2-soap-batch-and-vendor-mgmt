"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand/Logo */}
        <Link href="/inventory" className="text-xl font-bold text-blue-600 truncate">
          Morning Rituals
        </Link>

        {/* Hamburger Button (Mobile Only) */}
        {session && (
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        )}

        {/* Desktop Links & Auth */}
        <div className="hidden md:flex items-center gap-8">
          {session && (
            <div className="flex gap-6 text-gray-600 font-medium">
              <Link href="/inventory" className="hover:text-blue-600 transition">Inventory</Link>
              <Link href="/batches" className="hover:text-blue-600 transition">Batches</Link>
            </div>
          )}

          <div className="flex items-center gap-4 border-l pl-8">
            {status === "loading" ? (
              <span className="text-sm text-gray-400 italic">...</span>
            ) : session ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 leading-none">{session.user?.name || "Admin"}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition shadow-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && session && (
        <div className="md:hidden border-t bg-gray-50 px-6 py-4 space-y-4">
          <div className="flex flex-col gap-4">
            <Link onClick={toggleMenu} href="/inventory" className="block text-gray-700 font-medium hover:text-blue-600">Inventory</Link>
            <Link onClick={toggleMenu} href="/batches" className="block text-gray-700 font-medium hover:text-blue-600">Batches</Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full px-4 py-2 text-center text-sm font-medium text-white bg-red-500 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}