import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            nxrig.com
          </Link>

          <p className="text-gray-400 text-lg mb-0">
            Professional presets for NUX Mighty Plug Pro
          </p>
        </div>
      </div>

      {isAdminPage && (
        <nav className="container mx-auto px-4 py-4 flex items-center gap-6">
          <Link
            href="/admin"
            className={`hover:text-pink-400 transition-colors ${
              router.pathname === "/admin" ? "text-pink-400 font-medium" : ""
            }`}
          >
            Generations
          </Link>
          <Link
            href="/admin/presets"
            className={`hover:text-pink-400 transition-colors ${
              router.pathname === "/admin/presets"
                ? "text-pink-400 font-medium"
                : ""
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
