import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 p-4 mb-8">
      <nav className="container mx-auto flex items-center gap-6">
        <Link href="/" className="text-xl font-bold">
          MightyPatch
        </Link>
        <Link href="/tools/mp3-qr" className="text-sm text-gray-300 hover:text-white">
          MP-3 QR Generator
        </Link>
      </nav>
    </header>
  );
}
