import fs from 'fs';
import path from 'path';

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Header from '../../components/Header';
import SignalChain from '../../components/SignalChain';
import { presets } from '../../data/presets';

const slotColors = {
  Noisegate: '#10b981',
  Compressor: '#eab308',
  EFX: '#f97316',
  Delay: '#7dd3fc',
  Amp: '#ef4444',
  Cabinet: '#3b82f6',
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



export default function PresetPage({ preset, data }) {
  const { basePath } = useRouter();
  const CHAIN_ORDER = ['Noisegate', 'Compressor', 'EFX', 'Amp', 'Cabinet', 'EQ', 'Mod', 'Delay', 'RVB'];
  const ordered = { ...data, chain: [...data.chain].sort((a, b) => CHAIN_ORDER.indexOf(a.slot) - CHAIN_ORDER.indexOf(b.slot)) };
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-gray-100">
      <NextSeo
        title={`${preset.name}`}
        description={preset.description}
        openGraph={{ title: preset.name, description: preset.description }}
      />
      <Header />
      <h1 className="text-2xl font-bold mb-2">{preset.name}</h1>
      <p className="mb-4">{preset.description}</p>
      <img
        src={`${basePath}/${preset.qr}`}
        alt={`${preset.name} QR`}
        className="w-48 h-48 mx-auto mb-6"
      />
      <h2 className="text-xl font-semibold mb-2">Signal chain</h2>
      <SignalChain data={ordered} />
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
