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
                href="/preset/"
                className={`hover:text-pink-400 transition-colors ${
                  pathname.startsWith("/preset")
                    ? "text-pink-400 font-medium"
                    : "text-gray-300"
                }`}
              >
                Presets
              </Link>
              <Link
                href="/blog/"
                className={`hover:text-pink-400 transition-colors ${
                  pathname.startsWith("/blog")
                    ? "text-pink-400 font-medium"
                    : "text-gray-300"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/editor/"
                className={`hover:text-pink-400 transition-colors ${
                  pathname.startsWith("/editor")
                    ? "text-pink-400 font-medium"
                    : "text-gray-300"
                }`}
              >
                Editor
              </Link>
              <Link
                href="/favorites/"
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
                href="/order/"
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
          <div className="flex min-h-11 items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-sm bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-xl font-bold text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
            >
              nxrig.com
            </Link>

            {!isAdminPage && (
              <div className="flex items-center gap-2">
                <Link
                  href="/favorites/"
                  aria-label="Favorite presets"
                  className={`flex size-11 items-center justify-center rounded-lg border border-white/10 transition-colors hover:border-pink-400/50 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
                    pathname === "/favorites"
                      ? "border-pink-400/60 bg-pink-500/10 text-pink-400"
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
                  href="/order/"
                  className={`flex min-h-11 items-center whitespace-nowrap rounded-lg border border-pink-500/30 bg-pink-500/10 px-3.5 text-sm font-medium transition-colors hover:border-pink-400/60 hover:text-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
                    pathname === "/order"
                      ? "text-pink-400 font-medium border-pink-400"
                      : "text-pink-300"
                  }`}
                >
                  Request
                </Link>
              </div>
            )}
          </div>

          {!isAdminPage && (
            <nav
              aria-label="Primary navigation"
              className="mt-2 grid grid-cols-3 gap-1 border-t border-white/10 pt-2"
            >
              <Link
                href="/preset/"
                aria-current={
                  pathname.startsWith("/preset") ? "page" : undefined
                }
                className={`flex min-h-11 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-inset ${
                  pathname.startsWith("/preset")
                    ? "bg-pink-500/10 text-pink-400"
                    : "text-gray-300"
                }`}
              >
                Presets
              </Link>
              <Link
                href="/blog/"
                aria-current={pathname.startsWith("/blog") ? "page" : undefined}
                className={`flex min-h-11 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-inset ${
                  pathname.startsWith("/blog")
                    ? "bg-pink-500/10 text-pink-400"
                    : "text-gray-300"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/editor/"
                aria-current={
                  pathname.startsWith("/editor") ? "page" : undefined
                }
                className={`flex min-h-11 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-inset ${
                  pathname.startsWith("/editor")
                    ? "bg-pink-500/10 text-pink-400"
                    : "text-gray-300"
                }`}
              >
                Editor
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
            href="/admin/drafts/"
            className={`hover:text-pink-400 transition-colors ${
              pathname === "/admin/drafts" ? "text-pink-400 font-medium" : ""
            }`}
          >
            Draft presets
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
