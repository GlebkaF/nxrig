import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import SignalChain from '../../components/SignalChain';
import { z } from 'zod';

// Lazy-load QRCodeCanvas to avoid SSR issues
const QRCodeCanvas = dynamic(() => import('qrcode.react').then(m => m.QRCodeCanvas), { ssr: false });

const NUX_PREFIX = 'nux://MightyAmp:';

// ---------------- SCHEMA (runtime validation) ----------------
const SlotEnum = z.enum(['Noisegate', 'Compressor', 'EFX', 'Amp', 'IR', 'EQ', 'Mod', 'DLY', 'RVB']);
const ParamsSchema = z.record(z.string(), z.number());
const ChainBlockSchema = z.object({ slot: SlotEnum, model: z.string(), params: ParamsSchema });
const PresetSchema = z.object({ name: z.string().optional(), notes: z.string().optional(), chain: z.array(ChainBlockSchema).min(1) });

// Deterministic order for the chain in both UI and encoder
const CHAIN_ORDER = ['Noisegate', 'Compressor', 'EFX', 'Amp', 'IR', 'EQ', 'Mod', 'DLY', 'RVB'];

// ---------------- MAPPINGS (for encoder only) ----------------
const AMP_TYPES = { 'Jazz Clean': 1, 'Deluxe Rvb': 2, 'Bass Mate': 3, Tweedy: 4, Hiwire: 6, 'Cali Crunch': 7, 'Class A15': 8, 'Class A30': 9, 'Plexi 100': 10, 'Plexi 45': 11, 'Brit 800': 12, '1987x50': 13, 'Slo 100': 14, 'Fireman HBE': 15, 'Dual Rect': 16, 'DIE VH4': 17, 'Mr. Z38': 20, 'Super Rvb': 21, AGL: 26, MLD: 27, 'Optima Air': 28, Stageman: 29, 'Twin Reverb': 5, 'Vibro King': 18, Budda: 19, 'Brit Blues': 22, 'Match D30': 23, 'Brit 2000': 24, 'Uber HiGain': 25 };
const EFX_TYPES = { 'Distortion+': 1, 'RC Boost': 2, 'AC Boost': 3, 'Dist One': 4, 'T Screamer': 5, 'Blues Drive': 6, 'Morning Drive': 7, 'Eat Dist': 8, 'Red Dirt': 9, Crunch: 10, 'Muff Fuzz': 11, Katana: 12, 'ST Singer': 13, 'Touch Wah': 14 };
const COMP_TYPES = { 'Rose Comp': 1, 'K Comp': 2, 'Studio Comp': 3 };
const MOD_TYPES = { 'CE-1': 1, 'CE-2': 2, 'ST Chorus': 3, Vibrato: 4, Detune: 5, Flanger: 6, 'Phase 90': 7, 'Phase 100': 8, 'S.C.F.': 9, 'U-Vibe': 10, Tremolo: 11, Rotary: 12, 'SCH-1': 13, 'Mono Octave': 14 };
const DELAY_TYPES = { 'Analog Delay': 1, 'Digital Delay': 2, 'Mod Delay': 3, 'Tape Echo': 4, 'Pan Delay': 5, 'Phi Delay': 6 };
const REVERB_TYPES = { Room: 1, Hall: 2, Plate: 3, Spring: 4, Shimmer: 5, Damp: 6 };
const CABINET_TYPES = { JZ120: 1, DR112: 2, TR212: 3, HIWIRE412: 4, 'CALI 112': 5, A112: 6, GB412: 7, M1960AX: 8, M1960AV: 9, M1960TV: 10, SLO412: 11, 'FIREMAN 412': 12, 'RECT 412': 13, DIE412: 14, MATCH212: 15, UBER412: 16, BS410: 17, A212: 18, M1960AHW: 19, M1936: 20, BUDDA112: 21, Z212: 22, SUPERVERB410: 23, VIBROKING310: 24, AGL_DB810: 25, AMP_SV212: 26, AMP_SV410: 27, AMP_SV810: 28, BASSGUY410: 29, EDEN410: 30, MKB410: 31, 'G-HBIRD': 32, 'G-J15': 33, 'M-D45': 34 };
const EQ_TYPES = { '6-Band': 1, '10-Band': 3 };
const NOISE_GATE_TYPES = { 'Noise Gate': 1 };

const PlugProIndex = { HEAD_CMP: 1, HEAD_EFX: 2, HEAD_AMP: 3, HEAD_EQ: 4, HEAD_NG: 5, HEAD_MOD: 6, HEAD_DLY: 7, HEAD_RVB: 8, HEAD_CAB: 9, MASTER: 84, LINK1: 89, CMP_PARAMS: { sustain: 15, level: 16, attack: 17, blend: 18 }, EFX_PARAMS: { var1: 20, var2: 21, var3: 22, var4: 23, var5: 24, var6: 25 }, AMP_PARAMS: { gain: 27, master: 28, bass: 29, mid: 30, treble: 31, bright: 32, param7: 33, param8: 34 }, EQ_PARAMS: { eq1: 36, eq2: 37, eq3: 38, eq4: 39, eq5: 40, eq6: 41, eq7: 42, eq8: 43, eq9: 44, eq10: 45, eq11: 46, eq12: 47 }, NG_PARAMS: { sensitivity: 49, decay: 50, param3: 51, param4: 52 }, MOD_PARAMS: { rate: 54, depth: 55, mix: 56, param4: 57, param5: 58, param6: 59 }, DLY_PARAMS: { time: 61, feedback: 62, mix: 63, param4: 64, param5: 65, param6: 66, param7: 67, param8: 68 }, RVB_PARAMS: { decay: 70, tone: 71, mix: 72, predelay: 73 }, CAB_PARAMS: { param1: 75, param2: 76, param3: 77, level: 78, lowcut: 79, hicut: 80 }, CHAIN_DEFAULT: [5, 1, 6, 2, 3, 9, 4, 8, 7] };

function clamp0100(v) { const n = Number(v); if (!Number.isFinite(n) || n < 0 || n > 100) throw new Error('Value out of 0..100'); return n | 0; }
function bytesToB64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  if (typeof window !== 'undefined' && window.btoa) return window.btoa(s);
  return Buffer.from(s, 'binary').toString('base64');
}
function applyEffect(data, headIdx, typeMap, section, paramMap) {
  if (!section) return;
  const name = section.type;
  const enabled = section.enabled !== false;
  if (name !== undefined) {
    if (!(name in typeMap)) throw new Error(`Unknown effect type: ${name}`);
    data[headIdx] = typeMap[name];
  } else {
    data[headIdx] = Object.values(typeMap)[0];
  }
  if (!enabled) data[headIdx] |= 0x40;
  for (const [k, idx] of Object.entries(paramMap)) {
    if (k in section) data[idx] = clamp0100(section[k]);
  }
}

// Encode from our strict site JSON
function buildPayloadFromSiteJson(siteJson) {
  // Defaults
  const header = { product_id: 15, version: 1, master: 50 };

  // Prepare sections from chain with deterministic order
  const bySlot = Object.fromEntries(siteJson.chain.map((b) => [b.slot, b]));

  const ng = bySlot['Noisegate'];
  const comp = bySlot['Compressor'];
  const efx = bySlot['EFX'];
  const amp = bySlot['Amp'];
  const ir = bySlot['IR'];
  const eq = bySlot['EQ'];
  const mod = bySlot['Mod'];
  const dly = bySlot['DLY'];
  const rvb = bySlot['RVB'];

  const data = new Uint8Array(113);
  data[PlugProIndex.MASTER] = clamp0100(header.master);

  if (ng) {
    applyEffect(
      data,
      PlugProIndex.HEAD_NG,
      NOISE_GATE_TYPES,
      {
        type: ng.model,
        enabled: true,
        sensitivity: numberOrDefault(ng.params.Sens, 50),
        decay: numberOrDefault(ng.params.Decay, 50),
      },
      PlugProIndex.NG_PARAMS
    );
  }

  if (comp) {
    applyEffect(
      data,
      PlugProIndex.HEAD_CMP,
      COMP_TYPES,
      normalizeGeneric(comp),
      PlugProIndex.CMP_PARAMS
    );
  }

  if (efx) {
    applyEffect(
      data,
      PlugProIndex.HEAD_EFX,
      EFX_TYPES,
      normalizeGeneric(efx),
      PlugProIndex.EFX_PARAMS
    );
  }

  if (amp) {
    applyEffect(
      data,
      PlugProIndex.HEAD_AMP,
      AMP_TYPES,
      {
        type: amp.model,
        enabled: true,
        gain: numberOrDefault(amp.params.Gain, 50),
        master: numberOrDefault(amp.params.Master, 50),
        bass: numberOrDefault(amp.params.Bass, 50),
        mid: numberOrDefault(amp.params.Middle, 50),
        treble: numberOrDefault(amp.params.Treble, 50),
        bright: numberOrDefault(amp.params.Bright, 0),
      },
      PlugProIndex.AMP_PARAMS
    );
  }

  if (ir) {
    applyEffect(
      data,
      PlugProIndex.HEAD_CAB,
      CABINET_TYPES,
      {
        type: ir.model,
        enabled: true,
        level: numberOrDefault(ir.params.Level_db, 0),
        lowcut: numberOrDefault(ir.params['Low Cut_hz'] ?? ir.params.Low_Cut_hz, 70),
        hicut: numberOrDefault(ir.params['High Cut_hz'] ?? ir.params.High_Cut_hz, 12000),
      },
      PlugProIndex.CAB_PARAMS
    );
  }

  if (mod) {
    applyEffect(data, PlugProIndex.HEAD_MOD, MOD_TYPES, normalizeGeneric(mod), PlugProIndex.MOD_PARAMS);
  }
  if (dly) {
    applyEffect(
      data,
      PlugProIndex.HEAD_DLY,
      DELAY_TYPES,
      mapDelay(modernizeDelay(dly)),
      PlugProIndex.DLY_PARAMS
    );
  }
  if (rvb) {
    applyEffect(data, PlugProIndex.HEAD_RVB, REVERB_TYPES, normalizeGeneric(rvb), PlugProIndex.RVB_PARAMS);
  }
  if (eq) {
    applyEffect(data, PlugProIndex.HEAD_EQ, EQ_TYPES, normalizeEq(eq), PlugProIndex.EQ_PARAMS);
  }

  // Links order to device defaults (does not affect UI order)
  PlugProIndex.CHAIN_DEFAULT.forEach((fxid, i) => (data[PlugProIndex.LINK1 + i] = fxid));

  const product_id = header.product_id ?? 15;
  const version = header.version ?? 1;
  const head = new Uint8Array([product_id, version]);
  const all = new Uint8Array(head.length + data.length);
  all.set(head, 0);
  all.set(data, head.length);
  return all;
}

function numberOrDefault(v, d) { const n = Number(v); return Number.isFinite(n) ? n : d; }
function normalizeGeneric(block) {
  const params = {};
  for (const [k, v] of Object.entries(block.params || {})) {
    const key = k.toLowerCase();
    params[key] = numberOrDefault(v, 50);
  }
  return { type: block.model, enabled: true, ...params };
}
function modernizeDelay(block) {
  const params = {};
  for (const [k, v] of Object.entries(block.params || {})) {
    const key = k.toLowerCase();
    if (key.includes('time')) params.time = numberOrDefault(v, 50);
    else if (key.includes('feed')) params.feedback = numberOrDefault(v, 50);
    else if (key.includes('mix') || key.includes('level')) params.mix = numberOrDefault(v, 50);
  }
  return { type: block.model, enabled: true, ...params };
}
function mapDelay(section) { return section; }
function normalizeEq(block) {
  const params = block.params || {};
  const eq = {};
  const keys = Object.keys(params).sort(sortEqKeys);
  keys.forEach((k, idx) => { eq[`eq${idx + 1}`] = numberOrDefault(params[k], 50); });
  return { type: block.model, enabled: true, ...eq };
}
function sortEqKeys(a, b) {
  const pa = parseFloat(a);
  const pb = parseFloat(b);
  return Number.isFinite(pa) && Number.isFinite(pb) ? pa - pb : a.localeCompare(b);
}

function jsonToQrStringFromSite(siteJson) {
  const bytes = buildPayloadFromSiteJson(siteJson);
  return NUX_PREFIX + bytesToB64(bytes);
}

// ---------------- SAMPLE JSON (site shape) ----------------
const SAMPLE_SITE_JSON = {
  name: 'Sample Site Preset',
  chain: [
    { slot: 'Noisegate', model: 'Noise Gate', params: { Sens: 50, Decay: 50 } },
    { slot: 'Compressor', model: 'Rose Comp', params: { Sustain: 50, Level: 50, Attack: 50, Blend: 50 } },
    { slot: 'EFX', model: 'Distortion+', params: { Drive: 50, Tone: 50, Level: 50 } },
    { slot: 'Amp', model: 'Jazz Clean', params: { Gain: 65, Master: 70, Bass: 50, Middle: 65, Treble: 55, Bright: 0 } },
    { slot: 'IR', model: 'JZ120', params: { Level_db: 0, Low_Cut_hz: 70, High_Cut_hz: 12000 } },
    { slot: 'EQ', model: '6-Band', params: { '100': 0, '220': 1, '500': 0, '1.2K': 1, '2.6K': 2, '6.4K': 2 } },
    { slot: 'RVB', model: 'Room', params: { Decay: 50, Tone: 50, Level: 50 } },
  ],
};

export default function Mp3QrPage() {
  const [text, setText] = useState(() => JSON.stringify(SAMPLE_SITE_JSON, null, 2));
  const [qr, setQr] = useState('');
  const [err, setErr] = useState('');
  const [siteData, setSiteData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    try {
      setErr('');
      const parsed = JSON.parse(text);
      const result = PresetSchema.safeParse(parsed);
      if (!result.success) {
        throw new Error('Invalid preset JSON:\n' + result.error.issues.map((i) => `- ${i.path.join('.')}: ${i.message}`).join('\n'));
      }
      // Deterministic chain order in UI
      const ordered = { ...result.data, chain: [...result.data.chain].sort((a, b) => CHAIN_ORDER.indexOf(a.slot) - CHAIN_ORDER.indexOf(b.slot)) };
      setSiteData(ordered);
      setQr(jsonToQrStringFromSite(ordered));
    } catch (e) {
      setErr(e.message || String(e));
      setQr('');
      setSiteData(null);
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
      <Header />
      <div className="container mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Mighty Plug Pro 3 — JSON → QR</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <textarea className="w-full h-96 font-mono text-sm p-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex gap-3 mt-3">
              <button onClick={() => setText(JSON.stringify(SAMPLE_SITE_JSON, null, 2))} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600">Reset</button>
            </div>
            {err && (
              <div className="mt-3 p-3 rounded-xl border border-red-400 text-sm bg-red-950 text-red-200 whitespace-pre-wrap">{err}</div>
            )}
            {siteData && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Preview</h2>
                <SignalChain data={siteData} />
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
                  <a className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm" href={`data:text/plain;charset=utf-8,${encodeURIComponent(qr)}`} download="mp3_qr.txt">Скачать строку</a>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm" onClick={onDownloadPng}>Скачать PNG</button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">QR невалиден.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}