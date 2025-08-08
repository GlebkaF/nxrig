import Link from 'next/link';
import { presets } from '../data/presets';

export default function Home({ presets }) {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Preset Library</h1>
      <ul className="grid gap-4 md:grid-cols-2">
        {presets.map((preset) => (
          <li key={preset.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{preset.name}</h2>
            <p className="mb-2">{preset.description}</p>
            <img src={preset.qr} alt={`${preset.name} QR`} className="w-24 h-24 mb-2" />
            <Link href={`/preset/${preset.id}`} className="text-blue-600 underline">
              View settings
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  return { props: { presets } };
}
