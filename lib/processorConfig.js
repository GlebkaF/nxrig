// Centralized processor configuration and mapping utilities

export const SLOT_COLORS = {
  Noisegate: '#10b981',
  Compressor: '#eab308',
  EFX: '#f97316',
  DLY: '#7dd3fc',
  Amp: '#ef4444',
  IR: '#3b82f6',
  EQ: '#9ca3af',
  Mod: '#a855f7',
  RVB: '#d946ef',
};

// Linear mapper 0..100 -> [min..max] and formatter
export function toUnitString(value0100, { min, max, unit }) {
  if (min === undefined || max === undefined) return undefined;
  const v = Number(value0100);
  const mapped = min + (v / 100) * (max - min);
  const rounded = unit === 'dB' ? Math.round(mapped * 10) / 10 : Math.round(mapped);
  return unit ? `${rounded} ${unit}` : String(rounded);
}

// ---------- Real device names (subset; extend as needed) ----------
export const realNames = {
  EFX: {
    'Distortion+': 'MXR Distortion+',
    'RC Boost': 'Xotic RC Booster',
    'AC Boost': 'Xotic AC Booster',
    'Dist One': 'Boss DS-1',
    'T Screamer': 'Ibanez Tube Screamer',
    'Blues Drive': 'Boss Blues Driver',
    'Morning Drive': 'JHS Morning Glory',
    'Eat Dist': 'ProCo RAT',
    'Red Dirt': 'Keeley Red Dirt',
    Crunch: 'JHS Angry Charlie',
    'Muff Fuzz': 'Electro-Harmonix Big Muff',
    Katana: 'Keeley Katana',
  },
  IR: {
    JZ120: 'Roland JC-120 2x12',
    M1960AV: 'Marshall 1960AV 4x12',
  },
  Amp: {
    'Jazz Clean': 'Roland JC-120',
    'Deluxe Rvb': 'Fender Deluxe Reverb',
    'Twin Reverb': 'Fender Twin Reverb',
    'Brit 800': 'Marshall JCM800',
  },
};

// ---------- Processor registry ----------
// params: key -> { label, unit?, min?, max? }
export const processorConfig = {
  Compressor: {
    types: {
      'K Comp': {
        params: {
          sustain: { label: 'Sustain' },
          level: { label: 'Level' },
          clipping: { label: 'Clipping' },
        },
      },
      'Studio Comp': {
        params: {
          gain: { label: 'Gain' },
          threshold: { label: 'Threshold' },
          ratio: { label: 'Ratio' },
          release: { label: 'Release' },
        },
      },
      'Rose Comp': {
        params: {
          level: { label: 'Level' },
          sustain: { label: 'Sustain' },
        },
      },
    },
  },
  IR: {
    types: {
      'JZ120': {
        params: {
          level: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          lowcut: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          hicut: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      default: {
        params: {
          level: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          lowcut: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          hicut: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
    },
  },
  DLY: {
    types: {
      'Digital Delay': {
        params: {
          mix: { label: 'E.Level', unit: undefined, min: 0, max: 100 },
          feedback: { label: 'F.Back', unit: undefined, min: 0, max: 100 },
          time: { label: 'D.Time', unit: 'ms', min: 752, max: 61 },
        },
      },
    },
  },
};

export default processorConfig;