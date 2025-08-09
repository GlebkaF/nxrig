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

// ---------- Mapping helpers (0..100 -> units) ----------
export function mapCabLevelToDb(v) {
  const x = Number(v);
  const db = (x - 50) * (12 / 50);
  return Math.round(db * 10) / 10;
}
export function mapCabLowCutToHz(v) {
  const x = Number(v);
  if (x <= 50) return Math.round(20 + (x / 50) * (160 - 20));
  return Math.round(160 + ((x - 50) / 50) * (300 - 160));
}
export function mapCabHighCutToHz(v) {
  const x = Number(v);
  if (x <= 50) return Math.round(5000 + (x / 50) * (10000 - 5000));
  return Math.round(10000 + ((x - 50) / 50) * (20000 - 10000));
}

export function mapDigitalDelayTimeToMs(v) {
  const x = Number(v);
  const ms = 752 - (x / 100) * (752 - 61);
  return Math.round(ms);
}

// ---------- Processor registry ----------
// Each entry may define per-type mapping. If type not found, use default.
export const processorConfig = {
  Compressor: {
    types: {
      'K Comp': {
        buildUiParams: (params) => {
          const sustain = Number(params.Sustain ?? params.sustain ?? 50);
          const level = Number(params.Level ?? params.level ?? 50);
          const clipping = Number(params.Clipping ?? params.Attack ?? params.attack ?? 0);
          return [
            { key: 'Sustain', label: 'Sustain', value: sustain },
            { key: 'Level', label: 'Level', value: level },
            { key: 'Clipping', label: 'Clipping', value: clipping },
          ];
        },
      },
    },
  },
  IR: {
    types: {
      default: {
        buildUiParams: (params) => {
          const level = Number(params.Level ?? params.Level_db ?? params.level ?? 50);
          const low = Number(params.Low_Cut_hz ?? params.Low_Cut ?? params.lowcut ?? 50);
          const high = Number(params.High_Cut_hz ?? params.High_Cut ?? params.hicut ?? 50);
          return [
            { key: 'Level', label: `Level\n${mapCabLevelToDb(level)} dB`, value: level },
            { key: 'Low Cut', label: `Low Cut\n${mapCabLowCutToHz(low)} Hz`, value: low },
            { key: 'High Cut', label: `High Cut\n${mapCabHighCutToHz(high)} Hz`, value: high },
          ];
        },
      },
    },
  },
  DLY: {
    types: {
      'Digital Delay': {
        buildUiParams: (params) => {
          const time = Number(params.time ?? 50);
          const feedback = Number(params.feedback ?? 50);
          const mix = Number(params.mix ?? 50);
          return [
            { key: 'E.Level', label: 'E.Level', value: mix },
            { key: 'F.Back', label: 'F.Back', value: feedback },
            { key: 'D.Time', label: `D.Time\n${mapDigitalDelayTimeToMs(time)} ms`, value: time },
          ];
        },
      },
      Digital: {
        aliasOf: 'Digital Delay',
      },
    },
  },
};

export default processorConfig;