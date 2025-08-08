import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Knob from '../../components/Knob';
import { presets } from '../../data/presets';
import { deviceMappings } from '../../data/deviceMappings';

const slotColors = {
  Noisegate: '#10b981',
  Compressor: '#eab308',
  EFX: '#f97316',
  DLY: '#7dd3fc',
  Amp: '#ef4444',
  IR: '#3b82f6',
  EQ: '#9ca3af',
  Mod: '#a855f7',
  RVB: '#d946ef'
};

function formatLabel(key) {
  return key
    .replace(/_db$/i, ' dB')
    .replace(/_Hz$/i, ' Hz')
    .replace(/_/g, ' ');
}

function EqDisplay({ params }) {
  const freqs = Object.keys(params);
  const [levels, setLevels] = useState(
    freqs.reduce((acc, f) => ({ ...acc, [f]: 50 }), {})
  );

  useEffect(() => {
    const timer = setTimeout(() => setLevels(params), 100);
    return () => clearTimeout(timer);
  }, [params]);

  return (
    <div className="flex items-center h-32 space-x-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
      {freqs.map((freq) => {
        const val = Number(levels[freq]);
        const pos = Math.max(0, val - 50) * 2;
        const neg = Math.max(0, 50 - val) * 2;
        const display = Number(params[freq]) - 50;
        return (
          <div key={freq} className="flex flex-col items-center">
            <span className="mb-1 text-xs text-gray-200">
              {display >= 0 ? '+' : ''}
              {display}
            </span>
            <div className="relative w-4 h-28 bg-gray-800 rounded overflow-hidden group">
              <div
                className="absolute bottom-1/2 w-full bg-gradient-to-t from-red-600 via-pink-500 to-yellow-300 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(255,255,255,0.7)] group-hover:animate-eqGlow"
                style={{ height: `${pos}%` }}
              />
              <div
                className="absolute top-1/2 w-full bg-gradient-to-b from-red-600 via-pink-500 to-yellow-300 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(255,255,255,0.7)] group-hover:animate-eqGlow"
                style={{ height: `${neg}%` }}
              />
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-600" />
            </div>
            <span className="mt-1 text-xs text-gray-400">{freq.replace('Hz', ' Hz')}</span>
          </div>
        );
      })}
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
          const color = slotColors[block.slot];
          return (
            <li
              key={idx}
              className="relative p-4 rounded bg-gray-800 border-2"
              style={{ borderColor: color }}
            >
              <div className="font-semibold mb-2">
                {block.model}
                {realName && <span className="text-gray-400"> — {realName}</span>}
              </div>
              {block.slot === 'EQ' ? (
                <EqDisplay params={block.params} />
              ) : (
                <div className="flex flex-wrap gap-4">
                  {Object.entries(block.params).map(([key, value]) => (
                    <Knob
                      key={key}
                      label={formatLabel(key)}
                      value={Number(value)}
                      color={color}
                    />
                  ))}
                </div>
              )}
              <span
                className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded"
                style={{ backgroundColor: color, color: '#000' }}
              >
                {block.slot}
              </span>
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
