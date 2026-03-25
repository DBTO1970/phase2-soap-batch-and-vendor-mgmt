"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="w-full bg-gray-100 border-t mt-auto py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright & Brand */}
        <div className="text-gray-500 text-sm text-center md:text-left">
          <p>© {new Date().getFullYear()} Morning Rituals Soap.</p>
          <p>Handcrafted in the DMV area.</p>
        </div>

        {/* Public Quick Links */}
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Wholesale</Link>
          <a 
            href="https://www.charlestoncoffeeexchange.com/" 
            target="_blank" 
            className="hover:text-blue-600 transition"
          >
            Our Coffee Partner
          </a>
          <a className="hover:text-blue-600 transition" href="https://www.facebook.com/Morning-Rituals-Soap-107016931918107" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="px-2 text-xl" style={{ textShadow: "1px 1px 2px gray" }} />
          </a>
          <a className="hover:text-blue-600 transition" href="https://www.instagram.com/morning_rituals_soap/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="px-2 text-xl" style={{ textShadow: "1px 1px 2px gray" }} />
          </a>
        </div>
        

        {/* The "Secret" Admin Door */}
        <div className="opacity-40 hover:opacity-100 transition-opacity">
          {session ? (
            <Link 
              href="/inventory" 
              className="text-xs flex items-center gap-2 text-gray-500 hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faChartLine} /> Dashboard
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="text-xs flex items-center gap-2 text-gray-400 hover:text-gray-900 grayscale hover:grayscale-0"
            >
              <FontAwesomeIcon icon={faLock} /> Staff Login
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}