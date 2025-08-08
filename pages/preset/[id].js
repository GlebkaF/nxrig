import fs from 'fs';
import path from 'path';
import { Fragment } from 'react';
import Header from '../../components/Header';
import { presets } from '../../data/presets';
import { deviceMappings } from '../../data/deviceMappings';

export default function PresetPage({ preset, data }) {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-gray-100">
      <Header />
      <h1 className="text-2xl font-bold mb-2">{preset.name}</h1>
      <p className="mb-4">{preset.description}</p>
      <img
        src={preset.qr}
        alt={`${preset.name} QR`}
        className="w-48 h-48 mx-auto mb-6"
      />
      <h2 className="text-xl font-semibold mb-2">Signal chain</h2>
      <ol className="space-y-4 mb-4">
        {data.chain.map((block, idx) => {
          const realName = deviceMappings[block.slot]?.[block.model];
          return (
            <li
              key={idx}
              className="border border-gray-700 p-4 rounded bg-gray-800"
            >
              <div className="font-semibold mb-2">
                {block.slot}: {block.model}
                {realName && (
                  <span className="text-gray-400"> — {realName}</span>
                )}
              </div>
              <dl className="grid grid-cols-2 gap-1 text-sm">
                {Object.entries(block.params).map(([key, value]) => (
                  <Fragment key={key}>
                    <dt className="text-gray-400">{key}</dt>
                    <dd className="text-right">{value}</dd>
                  </Fragment>
                ))}
              </dl>
            </li>
          );
        })}
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
