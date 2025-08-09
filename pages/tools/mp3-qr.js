import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import SignalChain from '../../components/SignalChain';

// Lazy-load QRCodeCanvas to avoid SSR issues
const QRCodeCanvas = dynamic(() => import('qrcode.react').then(m => m.QRCodeCanvas), { ssr: false });

const NUX_PREFIX = 'nux://MightyAmp:';

// ---------------- MAPPINGS ----------------
const AMP_TYPES = {
  'Jazz Clean': 1,
  'Deluxe Rvb': 2,
  'Bass Mate': 3,
  Tweedy: 4,
  Hiwire: 6,
  'Cali Crunch': 7,
  'Class A15': 8,
  'Class A30': 9,
  'Plexi 100': 10,
  'Plexi 45': 11,
  'Brit 800': 12,
  '1987x50': 13,
  'Slo 100': 14,
  'Fireman HBE': 15,
  'Dual Rect': 16,
  'DIE VH4': 17,
  'Mr. Z38': 20,
  'Super Rvb': 21,
  AGL: 26,
  MLD: 27,
  'Optima Air': 28,
  Stageman: 29,
  'Twin Reverb': 5,
  'Vibro King': 18,
  Budda: 19,
  'Brit Blues': 22,
  'Match D30': 23,
  'Brit 2000': 24,
  'Uber HiGain': 25,
};
const EFX_TYPES = {
  'Distortion+': 1,
  'RC Boost': 2,
  'AC Boost': 3,
  'Dist One': 4,
  'T Screamer': 5,
  'Blues Drive': 6,
  'Morning Drive': 7,
  'Eat Dist': 8,
  'Red Dirt': 9,
  Crunch: 10,
  'Muff Fuzz': 11,
  Katana: 12,
  'ST Singer': 13,
  'Touch Wah': 14,
};
const COMP_TYPES = { 'Rose Comp': 1, 'K Comp': 2, 'Studio Comp': 3 };
const MOD_TYPES = {
  'CE-1': 1,
  'CE-2': 2,
  'ST Chorus': 3,
  Vibrato: 4,
  Detune: 5,
  Flanger: 6,
  'Phase 90': 7,
  'Phase 100': 8,
  'S.C.F.': 9,
  'U-Vibe': 10,
  Tremolo: 11,
  Rotary: 12,
  'SCH-1': 13,
  'Mono Octave': 14,
};
const DELAY_TYPES = {
  'Analog Delay': 1,
  'Digital Delay': 2,
  'Mod Delay': 3,
  'Tape Echo': 4,
  'Pan Delay': 5,
  'Phi Delay': 6,
};
const REVERB_TYPES = { Room: 1, Hall: 2, Plate: 3, Spring: 4, Shimmer: 5, Damp: 6 };
const CABINET_TYPES = {
  JZ120: 1,
  DR112: 2,
  TR212: 3,
  HIWIRE412: 4,
  'CALI 112': 5,
  A112: 6,
  GB412: 7,
  M1960AX: 8,
  M1960AV: 9,
  M1960TV: 10,
  SLO412: 11,
  'FIREMAN 412': 12,
  'RECT 412': 13,
  DIE412: 14,
  MATCH212: 15,
  UBER412: 16,
  BS410: 17,
  A212: 18,
  M1960AHW: 19,
  M1936: 20,
  BUDDA112: 21,
  Z212: 22,
  SUPERVERB410: 23,
  VIBROKING310: 24,
  AGL_DB810: 25,
  AMP_SV212: 26,
  AMP_SV410: 27,
  AMP_SV810: 28,
  BASSGUY410: 29,
  EDEN410: 30,
  MKB410: 31,
  'G-HBIRD': 32,
  'G-J15': 33,
  'M-D45': 34,
};
const EQ_TYPES = { '6-Band': 1, '10-Band': 3 };
const NOISE_GATE_TYPES = { 'Noise Gate': 1 };

const PlugProIndex = {
  HEAD_CMP: 1,
  HEAD_EFX: 2,
  HEAD_AMP: 3,
  HEAD_EQ: 4,
  HEAD_NG: 5,
  HEAD_MOD: 6,
  HEAD_DLY: 7,
  HEAD_RVB: 8,
  HEAD_CAB: 9,
  MASTER: 84,
  LINK1: 89,
  CMP_PARAMS: { sustain: 15, level: 16, attack: 17, blend: 18 },
  EFX_PARAMS: { var1: 20, var2: 21, var3: 22, var4: 23, var5: 24, var6: 25 },
  AMP_PARAMS: { gain: 27, master: 28, bass: 29, mid: 30, treble: 31, bright: 32, param7: 33, param8: 34 },
  EQ_PARAMS: { eq1: 36, eq2: 37, eq3: 38, eq4: 39, eq5: 40, eq6: 41, eq7: 42, eq8: 43, eq9: 44, eq10: 45, eq11: 46, eq12: 47 },
  NG_PARAMS: { sensitivity: 49, decay: 50, param3: 51, param4: 52 },
  MOD_PARAMS: { rate: 54, depth: 55, mix: 56, param4: 57, param5: 58, param6: 59 },
  DLY_PARAMS: { time: 61, feedback: 62, mix: 63, param4: 64, param5: 65, param6: 66, param7: 67, param8: 68 },
  RVB_PARAMS: { decay: 70, tone: 71, mix: 72, predelay: 73 },
  CAB_PARAMS: { param1: 75, param2: 76, param3: 77, level: 78, lowcut: 79, hicut: 80 },
  CHAIN_DEFAULT: [5, 1, 6, 2, 3, 9, 4, 8, 7],
};

function clamp0100(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > 100) throw new Error('Value out of 0..100');
  return n | 0;
}
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
function buildPayload(preset) {
  const data = new Uint8Array(113);
  data[PlugProIndex.MASTER] = clamp0100(preset.master ?? 50);
  applyEffect(data, PlugProIndex.HEAD_NG, NOISE_GATE_TYPES, preset.noise_gate || {}, PlugProIndex.NG_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_CMP, COMP_TYPES, preset.comp, PlugProIndex.CMP_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_EFX, EFX_TYPES, preset.efx, PlugProIndex.EFX_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_AMP, AMP_TYPES, preset.amp, PlugProIndex.AMP_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_CAB, CABINET_TYPES, preset.cab, PlugProIndex.CAB_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_MOD, MOD_TYPES, preset.mod, PlugProIndex.MOD_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_DLY, DELAY_TYPES, preset.delay, PlugProIndex.DLY_PARAMS);
  applyEffect(data, PlugProIndex.HEAD_RVB, REVERB_TYPES, preset.reverb, PlugProIndex.RVB_PARAMS);
  if (preset.eq) applyEffect(data, PlugProIndex.HEAD_EQ, EQ_TYPES, preset.eq, PlugProIndex.EQ_PARAMS);
  PlugProIndex.CHAIN_DEFAULT.forEach((fxid, i) => (data[PlugProIndex.LINK1 + i] = fxid));
  const product_id = Number(preset.product_id ?? 15) | 0;
  const version = Number(preset.version ?? 1) | 0;
  const head = new Uint8Array([product_id, version]);
  const all = new Uint8Array(head.length + data.length);
  all.set(head, 0);
  all.set(data, head.length);
  return all;
}
function jsonToQrString(preset) {
  const bytes = buildPayload(preset);
  return NUX_PREFIX + bytesToB64(bytes);
}

// ---------------- SAMPLE JSON ----------------
const SAMPLE_JSON = {
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

// ---------------- RANDOM PRESET ----------------
function rand01() {
  return Math.random() > 0.5;
}
function rand100() {
  return (Math.random() * 101) | 0;
}
function randKey(obj) {
  const k = Object.keys(obj);
  return k[(Math.random() * k.length) | 0];
}
function randomPreset() {
  return {
    product_id: 15,
    version: 1,
    master: rand100(),
    noise_gate: { enabled: rand01(), sensitivity: rand100(), decay: rand100() },
    comp: { enabled: rand01(), type: randKey(COMP_TYPES), sustain: rand100(), level: rand100(), attack: rand100(), blend: rand100() },
    efx: { enabled: rand01(), type: randKey(EFX_TYPES), var1: rand100(), var2: rand100(), var3: rand100() },
    amp: { enabled: rand01(), type: randKey(AMP_TYPES), gain: rand100(), master: rand100(), bass: rand100(), mid: rand100(), treble: rand100(), bright: rand100() },
    cab: { enabled: rand01(), type: randKey(CABINET_TYPES), level: rand100(), lowcut: rand100(), hicut: rand100() },
    mod: { enabled: rand01(), type: randKey(MOD_TYPES), rate: rand100(), depth: rand100(), mix: rand100() },
    delay: { enabled: rand01(), type: randKey(DELAY_TYPES), time: rand100(), feedback: rand100(), mix: rand100() },
    reverb: { enabled: rand01(), type: randKey(REVERB_TYPES), decay: rand100(), tone: rand100(), mix: rand100() },
  };
}

// ---------------- ADAPTER: tool preset -> visualization chain ----------------
function toChainData(preset) {
  const chain = [];
  if (preset.noise_gate) {
    chain.push({
      slot: 'Noisegate',
      model: 'Noise Gate',
      params: {
        Sens: Number(preset.noise_gate.sensitivity ?? 50),
        Decay: Number(preset.noise_gate.decay ?? 50),
      },
    });
  }
  if (preset.comp) {
    chain.push({
      slot: 'Compressor',
      model: preset.comp.type || 'K Comp',
      params: Object.fromEntries(
        Object.entries(preset.comp).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [capitalizeLabel(k), Number(v)])
      ),
    });
  }
  if (preset.efx) {
    chain.push({
      slot: 'EFX',
      model: preset.efx.type || 'Distortion+',
      params: Object.fromEntries(
        Object.entries(preset.efx).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [capitalizeLabel(k), Number(v)])
      ),
    });
  }
  if (preset.mod) {
    chain.push({
      slot: 'Mod',
      model: preset.mod.type || 'CE-1',
      params: Object.fromEntries(
        Object.entries(preset.mod).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [capitalizeLabel(k), Number(v)])
      ),
    });
  }
  if (preset.delay) {
    chain.push({
      slot: 'DLY',
      model: preset.delay.type || 'Digital',
      params: Object.fromEntries(
        Object.entries(preset.delay).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [normalizeDelayKey(k), Number(v)])
      ),
    });
  }
  if (preset.reverb) {
    chain.push({
      slot: 'RVB',
      model: preset.reverb.type || 'Hall',
      params: Object.fromEntries(
        Object.entries(preset.reverb).filter(([k]) => !['enabled', 'type'].includes(k)).map(([k, v]) => [capitalizeLabel(k), Number(v)])
      ),
    });
  }
  if (preset.amp) {
    chain.push({
      slot: 'Amp',
      model: preset.amp.type || 'Jazz Clean',
      params: {
        Gain: Number(preset.amp.gain ?? 50),
        Master: Number(preset.amp.master ?? 50),
        Bass: Number(preset.amp.bass ?? 50),
        Middle: Number(preset.amp.mid ?? preset.amp.middle ?? 50),
        Treble: Number(preset.amp.treble ?? 50),
        Bright: Number(preset.amp.bright ?? 0),
      },
    });
  }
  if (preset.cab) {
    chain.push({
      slot: 'IR',
      model: preset.cab.type || 'JZ120',
      params: {
        Level_db: Number(preset.cab.level ?? 0),
        Low_Cut_hz: Number(preset.cab.lowcut ?? 70),
        High_Cut_hz: Number(preset.cab.hicut ?? 12000),
      },
    });
  }
  if (preset.eq) {
    chain.push({
      slot: 'EQ',
      model: preset.eq.type || '6-Band',
      params: Object.fromEntries(
        Object.entries(preset.eq)
          .filter(([k]) => !['enabled', 'type'].includes(k))
          .map(([k, v]) => [k.toUpperCase(), Number(v)])
      ),
    });
  }
  return { chain };
}

function normalizeDelayKey(k) {
  if (k.toLowerCase() === 'time') return 'D.Time_ms';
  if (k.toLowerCase() === 'feedback') return 'F.Back';
  if (k.toLowerCase() === 'mix') return 'E.Level';
  return capitalizeLabel(k);
}
function capitalizeLabel(k) {
  return String(k)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Mp3QrPage() {
  const [text, setText] = useState(() => JSON.stringify(SAMPLE_JSON, null, 2));
  const [qr, setQr] = useState('');
  const [err, setErr] = useState('');
  const [chainData, setChainData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    try {
      setErr('');
      const data = JSON.parse(text);
      setQr(jsonToQrString(data));
      setChainData(toChainData(data));
    } catch (e) {
      setErr(e.message || String(e));
      setQr('');
      setChainData(null);
    }
  }, [text]);

  function onDownloadPng() {
    if (!qr) return;
    const node = canvasRef.current?.querySelector('canvas');
    if (!node) return;
    const url = node.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mp3_qr.png';
    a.click();
  }
  function onRandom() {
    const preset = randomPreset();
    setText(JSON.stringify(preset, null, 2));
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="container mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Mighty Plug Pro 3 — JSON → QR</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <textarea
              className="w-full h-96 font-mono text-sm p-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setText(JSON.stringify(SAMPLE_JSON, null, 2))}
                className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
              >
                Reset
              </button>
              <button
                onClick={onRandom}
                className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
              >
                Random
              </button>
            </div>
            {err && (
              <div className="mt-3 p-3 rounded-xl border border-red-400 text-sm bg-red-950 text-red-200 whitespace-pre-wrap">
                {err}
              </div>
            )}
            {chainData && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Preview</h2>
                <SignalChain data={chainData} />
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">QR Preview</h2>
            {qr ? (
              <>
                <div ref={canvasRef}>
                  <QRCodeCanvas value={qr} size={256} includeMargin={true} />
                </div>
                <textarea
                  readOnly
                  className="w-full h-32 mt-4 font-mono text-xs p-3 rounded-xl border border-gray-700 bg-gray-900 text-gray-100"
                  value={qr}
                />
                <div className="flex gap-2 mt-2">
                  <a
                    className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(qr)}`}
                    download="mp3_qr.txt"
                  >
                    Скачать строку
                  </a>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm" onClick={onDownloadPng}>
                    Скачать PNG
                  </button>
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