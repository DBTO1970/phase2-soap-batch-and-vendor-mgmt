"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faEnvelope, faSoap, faBoxesStacked, faListCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav 
      className="w-full text-white shadow-lg" 
      style={{ backgroundColor: '#550000' }}
    >
      <div className="header">
        <div className="circle">
          
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Main Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center">
          
          <Link href="/" className="text-lg md:text-xl hover:opacity-80 transition flex items-center gap-2">
            Home <FontAwesomeIcon icon={faSoap} className="text-sm md:text-base" />
          </Link>

          <Link href="/about" className="text-lg md:text-xl hover:opacity-80 transition flex items-center gap-2">
            About <FontAwesomeIcon icon={faCoffee} className="text-sm md:text-base" />
          </Link>

          <Link href="/contact" className="text-lg md:text-xl hover:opacity-80 transition flex items-center gap-2">
            Contact <FontAwesomeIcon icon={faEnvelope} className="text-sm md:text-base" />
          </Link>

          {/* Protected Admin Links (Only show if logged in) */}
          {session && (
            <>
              <div className="hidden md:block w-px h-6 bg-white/30" /> {/* Vertical Divider */}
              
              <Link href="/inventory" className="text-lg md:text-xl text-yellow-200 hover:text-white transition flex items-center gap-2">
                Inventory <FontAwesomeIcon icon={faBoxesStacked} className="text-sm" />
              </Link>

              {session && (
                <Link href="/batches" className="text-lg md:text-xl text-yellow-200 hover:text-white transition flex items-center gap-2">
                  Batches <FontAwesomeIcon icon={faListCheck} className="text-sm" />
                </Link>
              )}

              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-lg md:text-xl text-red-300 hover:text-red-100 transition flex items-center gap-2"
              >
                Exit <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" />
              </button>
            </>
          )}
        </div>

        {/* User Badge (Optional: tiny text at bottom if logged in) */}
        {session && (
          <div className="text-center mt-2 opacity-60 text-[10px] uppercase tracking-widest">
            Logged in as {session.user?.name || session.user?.email}
          </div>
        )}
      </div>
      <hr className="border-black/10" />
    </nav>
  );
}