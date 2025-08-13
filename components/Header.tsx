import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();

  const isActive = (path: string): boolean => router.pathname === path;

  return (
    <header className="bg-gray-900 text-gray-100 p-4 mb-8">
      <nav className="container mx-auto flex items-center gap-6">
        <Link href="/" className="text-xl font-bold">
          MightyPatch
        </Link>
        <div className="flex gap-4 ml-auto">
          <Link
            href="/"
            className={`hover:text-blue-400 transition-colors ${
              isActive("/") ? "text-blue-400 font-medium" : ""
            }`}
          >
            Редактор
          </Link>
          <Link
            href="/generator"
            className={`hover:text-purple-400 transition-colors ${
              isActive("/generator") ? "text-purple-400 font-medium" : ""
            }`}
          >
            AI Генератор
          </Link>
          <Link
            href="/test-encoder"
            className={`hover:text-green-400 transition-colors ${
              isActive("/test-encoder") ? "text-green-400 font-medium" : ""
            }`}
          >
            Тестовый энкодер
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
