export type Unit = 'dB' | 'Hz' | 'ms' | undefined;

export interface ParamMeta {
  label: string;
  unit?: Unit;
  min?: number;
  max?: number;
}

// Allowed parameter keys per slot
export type CompressorParamKey = 'sustain' | 'level' | 'attack' | 'blend';
export type EfxParamKey = 'var1' | 'var2' | 'var3' | 'var4' | 'var5' | 'var6';
export type AmpParamKey = 'gain' | 'master' | 'bass' | 'mid' | 'treble' | 'bright' | 'param7' | 'param8';
export type EqParamKey =
  | 'eq1'
  | 'eq2'
  | 'eq3'
  | 'eq4'
  | 'eq5'
  | 'eq6'
  | 'eq7'
  | 'eq8'
  | 'eq9'
  | 'eq10'
  | 'eq11'
  | 'eq12';
export type NoisegateParamKey = 'sensitivity' | 'decay' | 'param3' | 'param4';
export type ModParamKey = 'rate' | 'depth' | 'mix' | 'param4' | 'param5' | 'param6';
export type DelayParamKey = 'time' | 'feedback' | 'mix' | 'param4' | 'param5' | 'param6' | 'param7' | 'param8';
export type ReverbParamKey = 'decay' | 'tone' | 'mix' | 'predelay';
export type CabParamKey = 'param1' | 'param2' | 'param3' | 'level' | 'lowcut' | 'hicut';

export type Slot =
  | 'Noisegate'
  | 'Compressor'
  | 'EFX'
  | 'DLY'
  | 'Amp'
  | 'IR'
  | 'EQ'
  | 'Mod'
  | 'RVB';

export type ParamsBySlot = {
  Noisegate: Partial<Record<NoisegateParamKey, ParamMeta>>;
  Compressor: Partial<Record<CompressorParamKey, ParamMeta>>;
  EFX: Partial<Record<EfxParamKey, ParamMeta>>;
  DLY: Partial<Record<DelayParamKey, ParamMeta>>;
  Amp: Partial<Record<AmpParamKey, ParamMeta>>;
  IR: Partial<Record<CabParamKey, ParamMeta>>;
  EQ: Partial<Record<EqParamKey, ParamMeta>>;
  Mod: Partial<Record<ModParamKey, ParamMeta>>;
  RVB: Partial<Record<ReverbParamKey, ParamMeta>>;
};

export interface ProcessorTypeConfig<S extends Slot> {
  aliasOf?: string;
  params: ParamsBySlot[S];
}

export type ProcessorConfig = {
  [S in Slot]?: {
    types: Record<string, ProcessorTypeConfig<S>>;
  };
};

// Centralized processor configuration and mapping utilities
export const SLOT_COLORS: Record<Slot, string> = {
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
export function toUnitString(value0100: number, { min, max, unit }: { min?: number; max?: number; unit?: Unit }) {
  if (min === undefined || max === undefined) return undefined;
  const v = Number(value0100);
  const mapped = min + (v / 100) * (max - min);
  const rounded = unit === 'dB' ? Math.round(mapped * 10) / 10 : Math.round(mapped);
  return unit ? `${rounded} ${unit}` : String(rounded);
}

// ---------- Real device names (subset; extend as needed) ----------
export const realNames: Partial<Record<Exclude<Slot, 'Noisegate' | 'EQ'>, Record<string, string>>> = {
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
export const processorConfig: ProcessorConfig = {
  Compressor: {
    types: {
      'K Comp': {
        params: {
          sustain: { label: 'Sustain' },
          level: { label: 'Level' },
          attack: { label: 'Attack' },
          blend: { label: 'Blend' },
        },
      },
      'Studio Comp': {
        params: {
          level: { label: 'Level' },
          sustain: { label: 'Sustain' },
          attack: { label: 'Attack' },
          blend: { label: 'Blend' },
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
      JZ120: {
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
          mix: { label: 'E.Level', min: 0, max: 100 },
          feedback: { label: 'F.Back', min: 0, max: 100 },
          time: { label: 'D.Time', unit: 'ms', min: 61, max: 752 },
        },
      },
    },
  },
};

export default processorConfig;