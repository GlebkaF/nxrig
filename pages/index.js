import Link from 'next/link';
import Header from '../components/Header';
import { presets } from '../data/presets';

export default function Home({ presets }) {
  return (
    <div className="min-h-screen p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Preset Library</h1>
      <ul className="grid gap-4 md:grid-cols-2">
        {presets.map((preset) => (
          <li key={preset.id}>
            <Link
              href={`/preset/${preset.id}`}
              className="block border p-4 rounded shadow hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold mb-2">{preset.name}</h2>
              <p className="mb-2">{preset.description}</p>
              <img
                src={preset.qr}
                alt={`${preset.name} QR`}
                className="w-24 h-24"
              />
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
