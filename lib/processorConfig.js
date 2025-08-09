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
          mix: { label: 'E.Level' },
          feedback: { label: 'F.Back' },
          time: { label: 'D.Time', unit: 'ms', min: 752, max: 61 },
        },
      },
      Digital: { aliasOf: 'Digital Delay' },
    },
  },
};

export default processorConfig;