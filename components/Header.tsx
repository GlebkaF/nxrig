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
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
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
                href="/favorites"
                className={`hover:text-pink-400 transition-colors flex items-center gap-2 ${
                  pathname === "/favorites"
                    ? "text-pink-400 font-medium"
                    : "text-gray-300"
                }`}
                title="Favorite Presets"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={pathname === "/favorites" ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                <span>Favorites</span>
              </Link>
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

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
            >
              nxrig.com
            </Link>

            {!isAdminPage && (
              <nav className="flex items-center gap-3">
                <Link
                  href="/favorites"
                  className={`hover:text-pink-400 transition-colors flex items-center gap-1 ${
                    pathname === "/favorites"
                      ? "text-pink-400 font-medium"
                      : "text-gray-300"
                  }`}
                  title="Favorite Presets"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={pathname === "/favorites" ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </Link>
                <Link
                  href="/order"
                  className={`hover:text-pink-400 transition-colors px-3 py-1.5 text-sm rounded-lg border border-pink-500/30 bg-pink-500/10 ${
                    pathname === "/order"
                      ? "text-pink-400 font-medium border-pink-400"
                      : "text-pink-300"
                  }`}
                >
                  Request
                </Link>
              </nav>
            )}
          </div>

          <p className="text-gray-400 text-sm leading-tight">
            Professional presets for NUX Mighty Plug Pro & Mighty Space
          </p>
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
