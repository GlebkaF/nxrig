import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { presets } from '../../data/presets';
import { deviceMappings } from '../../data/deviceMappings';

function Knob({ label, value }) {
  const angle = (value / 100) * 270 - 135;
  return (
    <div className="flex flex-col items-center w-16">
      <div className="relative w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xs font-mono">
        <div
          className="absolute left-1/2 top-1/2 w-1 h-4 bg-red-500 origin-bottom"
          style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
        />
        <span className="text-gray-200">{value}</span>
      </div>
      <span className="mt-1 text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}

function EqDisplay({ params }) {
  const freqs = Object.keys(params);
  const [heights, setHeights] = useState(
    freqs.reduce((acc, f) => ({ ...acc, [f]: 0 }), {})
  );

  useEffect(() => {
    const timer = setTimeout(() => setHeights(params), 100);
    return () => clearTimeout(timer);
  }, [params]);

  return (
    <div className="flex items-end h-32 space-x-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
      {freqs.map((freq) => (
        <div key={freq} className="flex flex-col items-center">
          <span className="mb-1 text-xs text-gray-200">{params[freq]}</span>
          <div className="relative w-4 h-28 bg-gray-800 rounded overflow-hidden group">
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 via-pink-500 to-yellow-300 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(255,255,255,0.7)] group-hover:animate-eqGlow"
              style={{ height: `${heights[freq]}%` }}
            />
          </div>
          <span className="mt-1 text-xs text-gray-400">{freq}</span>
        </div>
      ))}
    </div>
  );
}

export default function PresetPage({ preset, data }) {
  const { basePath } = useRouter();
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-gray-100">
      <Header />
      <h1 className="text-2xl font-bold mb-2">{preset.name}</h1>
      <p className="mb-4">{preset.description}</p>
      <img
        src={`${basePath}/${preset.qr}`}
        alt={`${preset.name} QR`}
        className="w-48 h-48 mx-auto mb-6"
      />
      <h2 className="text-xl font-semibold mb-2">Signal chain</h2>
      <ol className="space-y-4 mb-4">
        {data.chain.map((block, idx) => {
          const realName = deviceMappings[block.slot]?.[block.model];
          return (
            <li key={idx} className="p-4 rounded bg-gray-800">
              <div className="font-semibold mb-2">
                {block.slot}: {block.model}
                {realName && <span className="text-gray-400"> — {realName}</span>}
              </div>
              {block.slot === 'EQ' ? (
                <EqDisplay params={block.params} />
              ) : (
                <div className="flex flex-wrap gap-4">
                  {Object.entries(block.params).map(([key, value]) => (
                    <Knob key={key} label={key} value={Number(value)} />
                  ))}
                </div>
              )}
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
