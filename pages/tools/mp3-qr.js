import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import SignalChain from '../../components/SignalChain';
import { z } from 'zod';
import { NextSeo } from 'next-seo';
import { flatPresetToQrString } from '../../lib/encoder';
import { FlatPresetSchema } from '../../lib/flatPresetSchema';
import { qrStringToFlatPreset } from '../../lib/encoder';

const QRCodeCanvas = dynamic(() => import('qrcode.react').then((m) => m.QRCodeCanvas), { ssr: false });

// Order for SignalChain visualization only
const CHAIN_ORDER = ['Noisegate', 'Compressor', 'EFX', 'Amp', 'IR', 'EQ', 'Mod', 'DLY', 'RVB'];

// Adapter ONLY for visualization (does not change the canonical data shape)
function flatPresetToVisualizationChain(preset) {
  const chain = [];
  if (preset.noise_gate) chain.push({ slot: 'Noisegate', model: 'Noise Gate', enabled: preset.noise_gate.enabled, params: { Sens: preset.noise_gate.sensitivity ?? 50, Decay: preset.noise_gate.decay ?? 50 } });
  if (preset.comp) chain.push({ slot: 'Compressor', model: preset.comp.type, enabled: preset.comp.enabled, params: { Sustain: preset.comp.sustain ?? 50, Level: preset.comp.level ?? 50, Attack: preset.comp.attack ?? 50, Blend: preset.comp.blend ?? 50 } });
  if (preset.efx) chain.push({ slot: 'EFX', model: preset.efx.type, enabled: preset.efx.enabled, params: Object.fromEntries(Object.entries(preset.efx).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [k, Number(v)])) });
  if (preset.amp) chain.push({ slot: 'Amp', model: preset.amp.type, enabled: preset.amp.enabled, params: { Gain: preset.amp.gain ?? 50, Master: preset.amp.master ?? 50, Bass: preset.amp.bass ?? 50, Middle: preset.amp.mid ?? 50, Treble: preset.amp.treble ?? 50, Bright: preset.amp.bright ?? 0 } });
  if (preset.cab) chain.push({ slot: 'IR', model: preset.cab.type, enabled: preset.cab.enabled, params: { Level_db: preset.cab.level ?? 0, Low_Cut_hz: Math.round((preset.cab.lowcut / 100) * 980 + 20), High_Cut_hz: Math.round((preset.cab.hicut / 100) * 19000 + 1000) } });
  if (preset.mod) chain.push({ slot: 'Mod', model: preset.mod.type, enabled: preset.mod.enabled, params: Object.fromEntries(Object.entries(preset.mod).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [k, Number(v)])) });
  if (preset.delay) chain.push({ slot: 'DLY', model: preset.delay.type, enabled: preset.delay.enabled, params: Object.fromEntries(Object.entries(preset.delay).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [k, Number(v)])) });
  if (preset.reverb) chain.push({ slot: 'RVB', model: preset.reverb.type, enabled: preset.reverb.enabled, params: Object.fromEntries(Object.entries(preset.reverb).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [k, Number(v)])) });
  if (preset.eq) chain.push({ slot: 'EQ', model: preset.eq.type, enabled: preset.eq.enabled, params: Object.fromEntries(Object.entries(preset.eq).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [k, Number(v)])) });
  return { chain: chain.filter((b) => b.enabled !== false).sort((a, b) => CHAIN_ORDER.indexOf(a.slot) - CHAIN_ORDER.indexOf(b.slot)) };
}

const SAMPLE_FLAT_JSON = {
  product_id: 15,
  version: 1,
  master: 80,
  noise_gate: { enabled: true, sensitivity: 50, decay: 50 },
  comp: { enabled: true, type: 'Rose Comp', sustain: 50, level: 50, attack: 50, blend: 50 },
  efx: { enabled: false, type: 'Distortion+', var1: 50, var2: 50, var3: 50 },
  amp: { enabled: true, type: 'Jazz Clean', gain: 65, master: 70, bass: 50, mid: 65, treble: 55, bright: 0 },
  cab: { enabled: true, type: 'JZ120', level: 0, lowcut: 20, hicut: 100 },
  mod: { enabled: false, type: 'CE-1', rate: 50, depth: 50, mix: 50 },
  delay: { enabled: false, type: 'Analog Delay', time: 50, feedback: 50, mix: 50 },
  reverb: { enabled: true, type: 'Room', decay: 50, tone: 50, mix: 50 },
};

export default function Mp3QrPage() {
  const [text, setText] = useState(() => JSON.stringify(SAMPLE_FLAT_JSON, null, 2));
  const [qr, setQr] = useState('');
  const [err, setErr] = useState('');
  const [vizData, setVizData] = useState(null);
  const canvasRef = useRef(null);
  const [qrInput, setQrInput] = useState('');

  function randomFlatPreset() {
    const rnd = () => (Math.random() * 101) | 0;
    const on = () => Math.random() > 0.5;
    return {
      product_id: 15,
      version: 1,
      master: rnd(),
      noise_gate: { enabled: on(), sensitivity: rnd(), decay: rnd() },
      comp: { enabled: on(), type: 'Rose Comp', sustain: rnd(), level: rnd(), attack: rnd(), blend: rnd() },
      efx: { enabled: on(), type: 'Distortion+', var1: rnd(), var2: rnd(), var3: rnd() },
      amp: { enabled: on(), type: 'Jazz Clean', gain: rnd(), master: rnd(), bass: rnd(), mid: rnd(), treble: rnd(), bright: rnd() },
      cab: { enabled: on(), type: 'JZ120', level: 0, lowcut: rnd(), hicut: rnd() },
      mod: { enabled: on(), type: 'CE-1', rate: rnd(), depth: rnd(), mix: rnd() },
      delay: { enabled: on(), type: 'Analog Delay', time: rnd(), feedback: rnd(), mix: rnd() },
      reverb: { enabled: on(), type: 'Room', decay: rnd(), tone: rnd(), mix: rnd() },
    };
  }

  function onImportFromQr() {
    try {
      const preset = qrStringToFlatPreset(qrInput.trim());
      setText(JSON.stringify(preset, null, 2));
      setErr('');
    } catch (e) {
      setErr(e.message || String(e));
    }
  }

  useEffect(() => {
    try {
      setErr('');
      const parsed = JSON.parse(text);
      const result = FlatPresetSchema.safeParse(parsed);
      if (!result.success) {
        throw new Error('Invalid preset JSON:\n' + result.error.issues.map((i) => `- ${i.path.join('.')}: ${i.message}`).join('\n'));
      }
      const flat = result.data;
      setQr(flatPresetToQrString(flat));
      setVizData(flatPresetToVisualizationChain(flat));
    } catch (e) {
      setErr(e.message || String(e));
      setQr('');
      setVizData(null);
    }
  }, [text]);

  function onDownloadPng() {
    if (!qr) return;
    const node = canvasRef.current?.querySelector('canvas');
    if (!node) return;
    const url = node.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = 'mp3_qr.png'; a.click();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NextSeo
        title="Mighty Plug Pro 3 — JSON → QR"
        description="QR generator for NUX Mighty Plug Pro 3. Paste preset JSON to get QR and visualize the signal chain."
        openGraph={{ title: 'Mighty Plug Pro 3 — JSON → QR', description: 'QR generator for NUX Mighty Plug Pro 3. Paste preset JSON to get QR and visualize the signal chain.' }}
      />
      <Header />
      <div className="container mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Mighty Plug Pro 3 — JSON → QR</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <textarea className="w-full h-96 font-mono text-sm p-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex flex-wrap gap-3 mt-3 items-center">
              <button onClick={() => setText(JSON.stringify(SAMPLE_FLAT_JSON, null, 2))} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600">Reset</button>
              <button onClick={() => setText(JSON.stringify(randomFlatPreset(), null, 2))} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600">Random</button>
              <div className="flex gap-2 items-center ml-auto w-full md:w-auto">
                <input
                  className="flex-1 md:w-72 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm"
                  placeholder="Paste QR string (nux://...)"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                />
                <button onClick={onImportFromQr} className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm">Import</button>
              </div>
            </div>
            {err && (
              <div className="mt-3 p-3 rounded-xl border border-red-400 text-sm bg-red-950 text-red-200 whitespace-pre-wrap">{err}</div>
            )}
            {vizData && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Preview</h2>
                <SignalChain data={vizData} />
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">QR Preview</h2>
            {qr ? (
              <>
                <div ref={canvasRef}><QRCodeCanvas value={qr} size={256} includeMargin={true} /></div>
                <textarea readOnly className="w-full h-32 mt-4 font-mono text-xs p-3 rounded-xl border border-gray-700 bg-gray-900 text-gray-100" value={qr} />
                <div className="flex gap-2 mt-2">
                  <a className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm" href={`data:text/plain;charset=utf-8,${encodeURIComponent(qr)}`} download="mp3_qr.txt">Download string</a>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm" onClick={onDownloadPng}>Download PNG</button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">QR is invalid.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}