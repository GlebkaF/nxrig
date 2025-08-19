import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-3"
          >
            nxrig.com
          </Link>

          <p className="text-gray-400 text-lg mb-0 max-w-xl">
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
