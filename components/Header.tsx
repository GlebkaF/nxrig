"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
            >
              nxrig.com
            </Link>

            <p className="text-gray-400 text-lg mb-0">
              Professional presets for NUX Mighty Plug Pro & Mighty Space
            </p>
          </div>

          {!isAdminPage && (
            <nav className="flex items-center gap-6">
              <Link
                href="/order"
                className={`hover:text-pink-400 transition-colors px-4 py-2 rounded-lg border border-pink-500/30 bg-pink-500/10 ${
                  pathname === "/order"
                    ? "text-pink-400 font-medium border-pink-400"
                    : "text-pink-300"
                }`}
              >
                Request Patch
              </Link>
            </nav>
          )}
        </div>
      </div>

      {isAdminPage && (
        <nav className="container mx-auto px-4 py-4 flex items-center gap-6">
          <Link
            href="/admin"
            className={`hover:text-pink-400 transition-colors ${
              pathname === "/admin" ? "text-pink-400 font-medium" : ""
            }`}
          >
            Generations
          </Link>
          <Link
            href="/admin/presets"
            className={`hover:text-pink-400 transition-colors ${
              pathname === "/admin/presets" ? "text-pink-400 font-medium" : ""
            }`}
          >
            Presets
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
