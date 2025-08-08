import Link from 'next/link';
import Header from '../components/Header';
import { presets } from '../data/presets';

export default function Home({ presets }) {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-gray-100">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Preset Library</h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => (
          <li key={preset.id}>
            <Link
              href={`/preset/${preset.id}`}
              className="block aspect-square p-4 rounded shadow-md bg-gray-800 hover:bg-gray-700 transition flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold">{preset.name}</h2>
              <img
                src={preset.qr}
                alt={`${preset.name} QR`}
                className="w-40 h-40 mx-auto"
              />
              <p className="text-sm text-gray-300 overflow-hidden">{preset.description}</p>
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
