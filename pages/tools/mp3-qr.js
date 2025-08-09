import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import SignalChain from '../../components/SignalChain';
import { NextSeo } from 'next-seo';
import { flatPresetToQrString, qrStringToFlatPreset } from '../../lib/encoder';
import { FlatPresetSchema } from '../../lib/flatPresetSchema';
import jsQR from 'jsqr';

const QRCodeCanvas = dynamic(() => import('qrcode.react').then((m) => m.QRCodeCanvas), { ssr: false });

const CHAIN_ORDER = ['Noisegate', 'Compressor', 'EFX', 'Amp', 'IR', 'EQ', 'Mod', 'DLY', 'RVB'];

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

export default function Mp3QrPage() {
  const [text, setText] = useState('');
  const [qr, setQr] = useState('');
  const [err, setErr] = useState('');
  const [vizData, setVizData] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!text) { setQr(''); setVizData(null); setErr(''); return; }
    try {
      setErr('');
      const parsed = JSON.parse(text);
      const result = FlatPresetSchema.safeParse(parsed);
      if (!result.success) throw new Error('Invalid preset JSON:\n' + result.error.issues.map((i) => `- ${i.path.join('.')}: ${i.message}`).join('\n'));
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

  async function onPickFileClick() {
    fileInputRef.current?.click();
  }

  async function onFileSelected(e) {
    try {
      setErr('');
      const file = e.target.files?.[0];
      if (!file) return;
      const bmp = await readImageBitmap(file);
      const qrText = scanQrFromImage(bmp);
      if (!qrText) throw new Error('QR not found on image');
      const preset = qrStringToFlatPreset(qrText);
      setText(JSON.stringify(preset, null, 2));
      e.target.value = '';
    } catch (ex) {
      setErr(ex.message || String(ex));
    }
  }

  function scanQrFromImage(imageBitmap) {
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imgData.data, imgData.width, imgData.height);
    return code?.data || '';
  }

  function readImageBitmap(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.onload = () => {
        createImageBitmap(new Blob([reader.result]))
          .then(resolve)
          .catch(() => {
            const img = new Image();
            img.onload = () => resolve(createImageBitmap(img));
            img.onerror = () => reject(new Error('Invalid image'));
            img.src = reader.result;
          });
      };
      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NextSeo
        title="Mighty Plug Pro 3 — JSON → QR"
        description="QR generator for NUX Mighty Plug Pro 3. Import from QR image to get JSON and visualize the signal chain."
        openGraph={{ title: 'Mighty Plug Pro 3 — JSON → QR', description: 'QR generator for NUX Mighty Plug Pro 3. Import from QR image to get JSON and visualize the signal chain.' }}
      />
      <Header />
      <div className="container mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Mighty Plug Pro 3 — JSON ↔ QR</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex gap-3 items-center mb-3">
              <button onClick={onPickFileClick} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600">Import from QR image</button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileSelected} />
            </div>
            <textarea className="w-full h-96 font-mono text-sm p-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100" placeholder="JSON will appear here after import..." value={text} onChange={(e) => setText(e.target.value)} />
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
                  <button className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm" onClick={onDownloadPng}>Download PNG</button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">No QR generated yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}