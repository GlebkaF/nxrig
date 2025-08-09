// NUX MP-3 encoder: flat JSON (single object) -> QR string

const NUX_PREFIX = 'nux://MightyAmp:';

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

const DISABLED_FLAG = 0x40;
const TYPE_MASK = 0x3f;

function clamp0100(v) { const n = Number(v); if (!Number.isFinite(n) || n < 0 || n > 100) throw new Error('Value out of 0..100'); return n | 0; }
function bytesToB64(bytes) { let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); if (typeof window !== 'undefined' && window.btoa) return window.btoa(s); return Buffer.from(s, 'binary').toString('base64'); }
function b64ToBytes(b64) { const s = (typeof window !== 'undefined' && window.atob) ? window.atob(b64) : Buffer.from(b64, 'base64').toString('binary'); const out = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i); return out; }
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
  if (!enabled) data[headIdx] |= DISABLED_FLAG;
  for (const [k, idx] of Object.entries(paramMap)) {
    if (k in section) data[idx] = clamp0100(section[k]);
  }
}

export function encodeFlatPresetToBytes(preset) {
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

export function flatPresetToQrString(preset) {
  const bytes = encodeFlatPresetToBytes(preset);
  return NUX_PREFIX + bytesToB64(bytes);
}

function reverseLookup(mapObj, id) { for (const [k, v] of Object.entries(mapObj)) if (v === id) return k; return undefined; }

export function qrStringToFlatPreset(qrString) {
  if (!qrString || typeof qrString !== 'string') throw new Error('QR string is empty');
  if (!qrString.startsWith(NUX_PREFIX)) throw new Error('Invalid QR prefix');
  const b64 = qrString.slice(NUX_PREFIX.length);
  const bytes = b64ToBytes(b64);
  if (bytes.length < 2 + 113) throw new Error('QR payload too short');
  const product_id = bytes[0] | 0;
  const version = bytes[1] | 0;
  const data = bytes.slice(2);

  const decodeHead = (idx, map) => {
    const raw = data[idx] | 0;
    if (!raw) return null;
    const enabled = (raw & DISABLED_FLAG) === 0;
    const typeId = raw & TYPE_MASK;
    const type = reverseLookup(map, typeId);
    return { enabled, type };
  };

  const out = { product_id, version, master: data[PlugProIndex.MASTER] | 0 };

  const ng = decodeHead(PlugProIndex.HEAD_NG, NOISE_GATE_TYPES);
  if (ng) out.noise_gate = { enabled: ng.enabled, sensitivity: data[PlugProIndex.NG_PARAMS.sensitivity] | 0, decay: data[PlugProIndex.NG_PARAMS.decay] | 0 };

  const comp = decodeHead(PlugProIndex.HEAD_CMP, COMP_TYPES);
  if (comp) out.comp = { enabled: comp.enabled, type: comp.type, sustain: data[PlugProIndex.CMP_PARAMS.sustain] | 0, level: data[PlugProIndex.CMP_PARAMS.level] | 0, attack: data[PlugProIndex.CMP_PARAMS.attack] | 0, blend: data[PlugProIndex.CMP_PARAMS.blend] | 0 };

  const efx = decodeHead(PlugProIndex.HEAD_EFX, EFX_TYPES);
  if (efx) out.efx = { enabled: efx.enabled, type: efx.type, var1: data[PlugProIndex.EFX_PARAMS.var1] | 0, var2: data[PlugProIndex.EFX_PARAMS.var2] | 0, var3: data[PlugProIndex.EFX_PARAMS.var3] | 0, var4: data[PlugProIndex.EFX_PARAMS.var4] | 0, var5: data[PlugProIndex.EFX_PARAMS.var5] | 0, var6: data[PlugProIndex.EFX_PARAMS.var6] | 0 };

  const amp = decodeHead(PlugProIndex.HEAD_AMP, AMP_TYPES);
  if (amp) out.amp = { enabled: amp.enabled, type: amp.type, gain: data[PlugProIndex.AMP_PARAMS.gain] | 0, master: data[PlugProIndex.AMP_PARAMS.master] | 0, bass: data[PlugProIndex.AMP_PARAMS.bass] | 0, mid: data[PlugProIndex.AMP_PARAMS.mid] | 0, treble: data[PlugProIndex.AMP_PARAMS.treble] | 0, bright: data[PlugProIndex.AMP_PARAMS.bright] | 0 };

  const cab = decodeHead(PlugProIndex.HEAD_CAB, CABINET_TYPES);
  if (cab) out.cab = { enabled: cab.enabled, type: cab.type, level: data[PlugProIndex.CAB_PARAMS.level] | 0, lowcut: data[PlugProIndex.CAB_PARAMS.lowcut] | 0, hicut: data[PlugProIndex.CAB_PARAMS.hicut] | 0 };

  const mod = decodeHead(PlugProIndex.HEAD_MOD, MOD_TYPES);
  if (mod) out.mod = { enabled: mod.enabled, type: mod.type, rate: data[PlugProIndex.MOD_PARAMS.rate] | 0, depth: data[PlugProIndex.MOD_PARAMS.depth] | 0, mix: data[PlugProIndex.MOD_PARAMS.mix] | 0 };

  const dly = decodeHead(PlugProIndex.HEAD_DLY, DELAY_TYPES);
  if (dly) out.delay = { enabled: dly.enabled, type: dly.type, time: data[PlugProIndex.DLY_PARAMS.time] | 0, feedback: data[PlugProIndex.DLY_PARAMS.feedback] | 0, mix: data[PlugProIndex.DLY_PARAMS.mix] | 0 };

  const rvb = decodeHead(PlugProIndex.HEAD_RVB, REVERB_TYPES);
  if (rvb) out.reverb = { enabled: rvb.enabled, type: rvb.type, decay: data[PlugProIndex.RVB_PARAMS.decay] | 0, tone: data[PlugProIndex.RVB_PARAMS.tone] | 0, mix: data[PlugProIndex.RVB_PARAMS.mix] | 0 };

  const eq = decodeHead(PlugProIndex.HEAD_EQ, EQ_TYPES);
  if (eq) {
    const eqOut = { enabled: eq.enabled, type: eq.type };
    for (let i = 1; i <= 12; i++) {
      const key = `eq${i}`;
      const idx = PlugProIndex.EQ_PARAMS[key];
      if (typeof idx === 'number') eqOut[key] = data[idx] | 0;
    }
    out.eq = eqOut;
  }

  return out;
}

export default flatPresetToQrString;