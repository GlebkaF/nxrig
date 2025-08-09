import jsQR from 'jsqr';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import React, { useRef, useState, useEffect } from 'react';

import Header from '../../components/Header';
import SignalChain from '../../components/SignalChain';
import { flatPresetToQrString, qrStringToFlatPreset } from '../../lib/encoder';
import { FlatPresetSchema } from '../../lib/flatPresetSchema';
import { processorConfig } from '../../lib/processorConfig.ts';


const QRCodeCanvas = dynamic(() => import('qrcode.react').then((m) => m.QRCodeCanvas), { ssr: false });

const CHAIN_ORDER = ['Noisegate', 'Compressor', 'EFX', 'Amp', 'Cabinet', 'EQ', 'Mod', 'Delay', 'RVB'];

function labelToFlatKey(label) {
  const k = String(label).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return k;
}

function buildParamsForVisualization(slot, model, section) {
  const cfg = processorConfig[slot]?.types?.[model] || null;
  if (!cfg || !cfg.params) return section || {};
  const out = {};
  const add = (k, v) => { if (v !== undefined) out[k] = v; };

  if (slot === 'Amp') {
    add('AMP_Para1', section?.gain);
    add('AMP_Para2', section?.master);
    add('AMP_Para3', section?.bass);
    add('AMP_Para4', section?.mid);
    add('AMP_Para5', section?.treble);
    add('AMP_Para6', section?.bright);
    return out;
  }
  if (slot === 'Cabinet') {
    add('CAB_Para4', section?.level);
    add('CAB_Para5', section?.lowcut);
    add('CAB_Para6', section?.hicut);
    return out;
  }
  if (slot === 'Delay') {
    add('DLY_Para1', section?.mix ?? section?.time);
    add('DLY_Para2', section?.feedback);
    add('DLY_Para3', section?.time ?? section?.mix);
    return out;
  }
  if (slot === 'Compressor') {
    for (const [key, meta] of Object.entries(cfg.params)) {
      const flatKey = labelToFlatKey(meta.label);
      add(key, section?.[flatKey]);
    }
    return out;
  }
  if (slot === 'EFX') {
    add('EFX_Para1', section?.var1);
    add('EFX_Para2', section?.var2);
    add('EFX_Para3', section?.var3);
    add('EFX_Para4', section?.var4);
    add('EFX_Para5', section?.var5);
    add('EFX_Para6', section?.var6);
    return out;
  }
  if (slot === 'Mod') {
    add('MOD_Para1', section?.rate);
    add('MOD_Para2', section?.depth);
    add('MOD_Para3', section?.mix);
    return out;
  }
  if (slot === 'RVB') {
    // Map decay/tone/mix to the appropriate parameter keys by labels
    let levelKey;
    for (const [k, meta] of Object.entries(cfg.params)) {
      const lbl = String(meta.label).toLowerCase();
      if (!levelKey && (lbl === 'level' || lbl === 'mix')) levelKey = k;
    }
    for (const [k, meta] of Object.entries(cfg.params)) {
      const lbl = String(meta.label).toLowerCase();
      if (lbl.includes('decay')) add(k, section?.decay);
      if (lbl.includes('tone') || lbl.includes('liveliness')) add(k, section?.tone);
    }
    if (levelKey) add(levelKey, section?.mix);
    return out;
  }
  if (slot === 'EQ') {
    const outEq = {};
    for (const [k, meta] of Object.entries(cfg.params)) {
      const suffix = Number(String(k).split('Para')[1] || '0');
      const val = section?.[`eq${suffix}`];
      if (val !== undefined) outEq[meta.label] = val;
    }
    return outEq;
  }
  return section || {};
}

function flatPresetToVisualizationChain(preset) {
  const chain = [];
  if (preset.noise_gate) chain.push({ slot: 'Noisegate', model: 'Noise Gate', enabled: preset.noise_gate.enabled, params: { Sens: preset.noise_gate.sensitivity ?? 50, Decay: preset.noise_gate.decay ?? 50 } });
  if (preset.comp) chain.push({ slot: 'Compressor', model: preset.comp.type, enabled: preset.comp.enabled, params: buildParamsForVisualization('Compressor', preset.comp.type, preset.comp) });
  if (preset.efx) chain.push({ slot: 'EFX', model: preset.efx.type, enabled: preset.efx.enabled, params: buildParamsForVisualization('EFX', preset.efx.type, preset.efx) });
  if (preset.amp) chain.push({ slot: 'Amp', model: preset.amp.type, enabled: preset.amp.enabled, params: buildParamsForVisualization('Amp', preset.amp.type, preset.amp) });
  if (preset.cab) chain.push({ slot: 'Cabinet', model: preset.cab.type, enabled: preset.cab.enabled, params: buildParamsForVisualization('Cabinet', preset.cab.type, preset.cab) });
  if (preset.mod) chain.push({ slot: 'Mod', model: preset.mod.type, enabled: preset.mod.enabled, params: buildParamsForVisualization('Mod', preset.mod.type, preset.mod) });
  if (preset.delay) chain.push({ slot: 'Delay', model: preset.delay.type, enabled: preset.delay.enabled, params: buildParamsForVisualization('Delay', preset.delay.type, preset.delay) });
  if (preset.reverb) chain.push({ slot: 'RVB', model: preset.reverb.type, enabled: preset.reverb.enabled, params: buildParamsForVisualization('RVB', preset.reverb.type, preset.reverb) });
  if (preset.eq) chain.push({ slot: 'EQ', model: preset.eq.type, enabled: preset.eq.enabled, params: buildParamsForVisualization('EQ', preset.eq.type, preset.eq) });
  return { chain: chain.filter((b) => b.enabled !== false).sort((a, b) => CHAIN_ORDER.indexOf(a.slot) - CHAIN_ORDER.indexOf(b.slot)) };
}

function rand01() { return Math.random() > 0.5; }
function rand100() { return (Math.random() * 101) | 0; }
function randKey(obj) { const k = Object.keys(obj); return k[(Math.random() * k.length) | 0]; }

function randomPreset() {
  const randType = (slot) => randKey(processorConfig[slot]?.types || {});
  return {
    product_id: 15,
    version: 1,
    master: rand100(),
    noise_gate: { enabled: rand01(), sensitivity: rand100(), decay: rand100() },
    comp: { enabled: rand01(), type: randType('Compressor'), sustain: rand100(), level: rand100(), attack: rand100(), blend: rand100(), clipping: rand100(), gain: rand100(), threshold: rand100(), ratio: rand100(), release: rand100() },
    efx: { enabled: rand01(), type: randType('EFX'), var1: rand100(), var2: rand100(), var3: rand100(), var4: rand100(), var5: rand100(), var6: rand100() },
    amp: { enabled: rand01(), type: randType('Amp'), gain: rand100(), master: rand100(), bass: rand100(), mid: rand100(), treble: rand100(), bright: rand01() ? 100 : 0 },
    cab: { enabled: rand01(), type: randType('Cabinet'), level: rand100(), lowcut: rand100(), hicut: rand100() },
    mod: { enabled: rand01(), type: randType('Mod'), rate: rand100(), depth: rand100(), mix: rand100() },
    delay: { enabled: rand01(), type: randType('Delay'), time: rand100(), feedback: rand100(), mix: rand100() },
    reverb: { enabled: rand01(), type: randType('RVB'), decay: rand100(), tone: rand100(), mix: rand100() },
    eq: { enabled: rand01(), type: '6-Band', eq1: rand100(), eq2: rand100(), eq3: rand100(), eq4: rand100(), eq5: rand100(), eq6: rand100() },
  };
}

export default function Mp3QrPage() {
  const [text, setText] = useState(() => JSON.stringify(randomPreset(), null, 2));
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
              <button onClick={() => setText(JSON.stringify(randomPreset(), null, 2))} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600">Random</button>
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