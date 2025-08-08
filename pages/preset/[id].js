import fs from 'fs';
import path from 'path';
import Header from '../../components/Header';
import { presets } from '../../data/presets';

export default function PresetPage({ preset, data }) {
  return (
    <div className="min-h-screen p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-2">{preset.name}</h1>
      <p className="mb-4">{preset.description}</p>
      <h2 className="text-xl font-semibold mb-2">Signal chain</h2>
      <ol className="space-y-2 mb-4">
        {data.chain.map((block, idx) => (
          <li key={idx} className="border p-2 rounded">
            <div className="font-medium">{block.slot}: {block.model}</div>
            <ul className="ml-4 list-disc">
              {Object.entries(block.params).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: presets.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const preset = presets.find((p) => p.id === params.id);
  const filePath = path.join(process.cwd(), 'public', preset.file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { preset, data } };
}
