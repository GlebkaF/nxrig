export type Unit = 'dB' | 'Hz' | 'ms' | undefined;

export interface ParamMeta {
  label: string;
  unit?: Unit;
  min?: number;
  max?: number;
}

// Indices mapping per parameter set (kept in sync with device indices)
export const ParamIndex = {
  CMP_PARAMS: {
    sustain: 15,
    level: 16,
    attack: 17,
    blend: 18,
  },
  EFX_PARAMS: {
    var1: 20,
    var2: 21,
    var3: 22,
    var4: 23,
    var5: 24,
    var6: 25,
  },
  AMP_PARAMS: {
    gain: 27,
    master: 28,
    bass: 29,
    mid: 30,
    treble: 31,
    bright: 32,
    param7: 33,
    param8: 34,
  },
  EQ_PARAMS: {
    eq1: 36,
    eq2: 37,
    eq3: 38,
    eq4: 39,
    eq5: 40,
    eq6: 41,
    eq7: 42,
    eq8: 43,
    eq9: 44,
    eq10: 45,
    eq11: 46,
    eq12: 47,
  },
  NG_PARAMS: {
    sensitivity: 49,
    decay: 50,
    param3: 51,
    param4: 52,
  },
  MOD_PARAMS: {
    rate: 54,
    depth: 55,
    mix: 56,
    param4: 57,
    param5: 58,
    param6: 59,
  },
  DLY_PARAMS: {
    time: 61,
    feedback: 62,
    mix: 63,
    param4: 64,
    param5: 65,
    param6: 66,
    param7: 67,
    param8: 68,
  },
  RVB_PARAMS: {
    decay: 70,
    tone: 71,
    mix: 72,
    predelay: 73,
  },
  CAB_PARAMS: {
    param1: 75,
    param2: 76,
    param3: 77,
    level: 78,
    lowcut: 79,
    hicut: 80,
  },
} as const;

// Allowed parameter keys per slot, derived from ParamIndex
export type CompressorParamKey = keyof typeof ParamIndex.CMP_PARAMS;
export type EfxParamKey = keyof typeof ParamIndex.EFX_PARAMS;
export type AmpParamKey = keyof typeof ParamIndex.AMP_PARAMS;
export type EqParamKey = keyof typeof ParamIndex.EQ_PARAMS;
export type NoisegateParamKey = keyof typeof ParamIndex.NG_PARAMS;
export type ModParamKey = keyof typeof ParamIndex.MOD_PARAMS;
export type DelayParamKey = keyof typeof ParamIndex.DLY_PARAMS;
export type ReverbParamKey = keyof typeof ParamIndex.RVB_PARAMS;
export type CabParamKey = keyof typeof ParamIndex.CAB_PARAMS;

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

export interface ParamsBySlot {
  Noisegate: Partial<Record<NoisegateParamKey, ParamMeta>>;
  Compressor: Partial<Record<CompressorParamKey, ParamMeta>>;
  EFX: Partial<Record<EfxParamKey, ParamMeta>>;
  DLY: Partial<Record<DelayParamKey, ParamMeta>>;
  Amp: Partial<Record<AmpParamKey, ParamMeta>>;
  IR: Partial<Record<CabParamKey, ParamMeta>>;
  EQ: Partial<Record<EqParamKey, ParamMeta>>;
  Mod: Partial<Record<ModParamKey, ParamMeta>>;
  RVB: Partial<Record<ReverbParamKey, ParamMeta>>;
}

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
  const v = value0100;
  const mapped = (min as number) + (v / 100) * ((max as number) - (min as number));
  const rounded = unit === 'dB' ? Math.round(mapped * 10) / 10 : Math.round(mapped);
  return unit ? `${String(rounded)} ${unit}` : String(rounded);
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