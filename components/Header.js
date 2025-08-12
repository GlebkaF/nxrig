import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 p-4 mb-8">
      <nav className="container mx-auto flex items-center gap-6">
        <Link href="/" className="text-xl font-bold">
          MightyPatch
        </Link>
        <Link href="/" className="hover:text-purple-400 transition-colors">
          QR Generator
        </Link>
        <Link href="/test-encoder" className="hover:text-purple-400 transition-colors">
          Chain Editor
        </Link>
        <Link href="/ai-chain-generator" className="hover:text-purple-400 transition-colors flex items-center gap-2">
          <span>🤖</span>
          <span>AI Generator</span>
        </Link>
      </nav>
    </header>
  );
}
