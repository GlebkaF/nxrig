import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 p-4 mb-8">
      <nav className="container mx-auto">
        <Link href="/" className="text-xl font-bold">
          MightyPatch
        </Link>
      </nav>
    </header>
  );
}
