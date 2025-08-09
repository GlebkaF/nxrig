export type Unit = 'dB' | 'Hz' | 'ms' | undefined;

export interface ParamMeta {
  label: string;
  unit?: Unit;
  min?: number;
  max?: number;
  index?: number; // device preset index (e.g., CMP_Para1)
}

// PresetDataIndex-style constants (subset relevant for params)
export const PresetDataIndex = {
  // Heads
  Head_iWAH: 0,
  Head_iCMP: 1,
  Head_iEFX: 2,
  Head_iAMP: 3,
  Head_iEQ: 4,
  Head_iNG: 5,
  Head_iMOD: 6,
  Head_iDLY: 7,
  Head_iRVB: 8,
  Head_iCAB: 9,
  Head_iSR: 10,
  // Counts
  WAH_Count: 11,
  WAH_Para1: 12,
  WAH_Para2: 13,
  CMP_Count: 14,
  CMP_Para1: 15,
  CMP_Para2: 16,
  CMP_Para3: 17,
  CMP_Para4: 18,
  EFX_Count: 19,
  EFX_Para1: 20,
  EFX_Para2: 21,
  EFX_Para3: 22,
  EFX_Para4: 23,
  EFX_Para5: 24,
  EFX_Para6: 25,
  AMP_Count: 26,
  AMP_Para1: 27,
  AMP_Para2: 28,
  AMP_Para3: 29,
  AMP_Para4: 30,
  AMP_Para5: 31,
  AMP_Para6: 32,
  AMP_Para7: 33,
  AMP_Para8: 34,
  EQ_Count: 35,
  EQ_Para1: 36,
  EQ_Para2: 37,
  EQ_Para3: 38,
  EQ_Para4: 39,
  EQ_Para5: 40,
  EQ_Para6: 41,
  EQ_Para7: 42,
  EQ_Para8: 43,
  EQ_Para9: 44,
  EQ_Para10: 45,
  EQ_Para11: 46,
  EQ_Para12: 47,
  NG_Count: 48,
  NG_Para1: 49,
  NG_Para2: 50,
  NG_Para3: 51,
  NG_Para4: 52,
  MOD_Count: 53,
  MOD_Para1: 54,
  MOD_Para2: 55,
  MOD_Para3: 56,
  MOD_Para4: 57,
  MOD_Para5: 58,
  MOD_Para6: 59,
  DLY_Count: 60,
  DLY_Para1: 61,
  DLY_Para2: 62,
  DLY_Para3: 63,
  DLY_Para4: 64,
  DLY_Para5: 65,
  DLY_Para6: 66,
  DLY_Para7: 67,
  DLY_Para8: 68,
  RVB_Count: 69,
  RVB_Para1: 70,
  RVB_Para2: 71,
  RVB_Para3: 72,
  RVB_Para4: 73,
  CAB_Count: 74,
  CAB_Para1: 75,
  CAB_Para2: 76,
  CAB_Para3: 77,
  CAB_Para4: 78,
  CAB_Para5: 79,
  CAB_Para6: 80,
  SR_Count: 81,
  SR_Para1: 82,
  SR_Para2: 83,
  MASTER: 84,
  delay_time_flag: 85,
  bpmH: 86,
  bpmL: 87,
  BITCTRL: 88,
  LINK1: 89,
  LINK2: 90,
  LINK3: 91,
  LINK4: 92,
  LINK5: 93,
  LINK6: 94,
  LINK7: 95,
  LINK8: 96,
  LINK9: 97,
  LINK10: 98,
  LINK11: 99,
} as const;

// Indices mapping per parameter set (kept in sync with device indices)
export const ParamIndex = {
  CMP_PARAMS: {
    sustain: PresetDataIndex.CMP_Para1,
    level: PresetDataIndex.CMP_Para2,
    // For compressors, Para3/Para4 are model-dependent (e.g., clipping, gain, ratio, release)
  },
  EFX_PARAMS: {
    var1: PresetDataIndex.EFX_Para1,
    var2: PresetDataIndex.EFX_Para2,
    var3: PresetDataIndex.EFX_Para3,
    var4: PresetDataIndex.EFX_Para4,
    var5: PresetDataIndex.EFX_Para5,
    var6: PresetDataIndex.EFX_Para6,
  },
  AMP_PARAMS: {
    gain: PresetDataIndex.AMP_Para1,
    master: PresetDataIndex.AMP_Para2,
    bass: PresetDataIndex.AMP_Para3,
    mid: PresetDataIndex.AMP_Para4,
    treble: PresetDataIndex.AMP_Para5,
    bright: PresetDataIndex.AMP_Para6,
    param7: PresetDataIndex.AMP_Para7,
    param8: PresetDataIndex.AMP_Para8,
  },
  EQ_PARAMS: {
    eq1: PresetDataIndex.EQ_Para1,
    eq2: PresetDataIndex.EQ_Para2,
    eq3: PresetDataIndex.EQ_Para3,
    eq4: PresetDataIndex.EQ_Para4,
    eq5: PresetDataIndex.EQ_Para5,
    eq6: PresetDataIndex.EQ_Para6,
    eq7: PresetDataIndex.EQ_Para7,
    eq8: PresetDataIndex.EQ_Para8,
    eq9: PresetDataIndex.EQ_Para9,
    eq10: PresetDataIndex.EQ_Para10,
    eq11: PresetDataIndex.EQ_Para11,
    eq12: PresetDataIndex.EQ_Para12,
  },
  NG_PARAMS: {
    sensitivity: PresetDataIndex.NG_Para1,
    decay: PresetDataIndex.NG_Para2,
    param3: PresetDataIndex.NG_Para3,
    param4: PresetDataIndex.NG_Para4,
  },
  MOD_PARAMS: {
    rate: PresetDataIndex.MOD_Para1,
    depth: PresetDataIndex.MOD_Para2,
    mix: PresetDataIndex.MOD_Para3,
    param4: PresetDataIndex.MOD_Para4,
    param5: PresetDataIndex.MOD_Para5,
    param6: PresetDataIndex.MOD_Para6,
  },
  DLY_PARAMS: {
    time: PresetDataIndex.DLY_Para3, // matches device mapping (D.Time)
    feedback: PresetDataIndex.DLY_Para2,
    mix: PresetDataIndex.DLY_Para1,
    param4: PresetDataIndex.DLY_Para4,
    param5: PresetDataIndex.DLY_Para5,
    param6: PresetDataIndex.DLY_Para6,
    param7: PresetDataIndex.DLY_Para7,
    param8: PresetDataIndex.DLY_Para8,
  },
  RVB_PARAMS: {
    decay: PresetDataIndex.RVB_Para1,
    tone: PresetDataIndex.RVB_Para2,
    mix: PresetDataIndex.RVB_Para3,
    predelay: PresetDataIndex.RVB_Para4,
  },
  CAB_PARAMS: {
    param1: PresetDataIndex.CAB_Para1,
    param2: PresetDataIndex.CAB_Para2,
    param3: PresetDataIndex.CAB_Para3,
    level: PresetDataIndex.CAB_Para4,
    lowcut: PresetDataIndex.CAB_Para5,
    hicut: PresetDataIndex.CAB_Para6,
  },
} as const;

// Allowed parameter keys per slot
export type CompressorParamKey = 'sustain' | 'level' | 'clipping' | 'gain' | 'threshold' | 'ratio' | 'release';
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
  const mapped = min + (v / 100) * (max - min);
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
// params: key -> { label, unit?, min?, max?, index? }
export const processorConfig: ProcessorConfig = {
  Compressor: {
    types: {
      'K Comp': {
        params: {
          level: { label: 'Level', index: PresetDataIndex.CMP_Para2 },
          sustain: { label: 'Sustain', index: PresetDataIndex.CMP_Para1 },
          clipping: { label: 'Clipping', index: PresetDataIndex.CMP_Para3 },
        },
      },
      'Studio Comp': {
        params: {
          gain: { label: 'Gain', index: PresetDataIndex.CMP_Para3 },
          threshold: { label: 'Threshold', index: PresetDataIndex.CMP_Para1 },
          ratio: { label: 'Ratio', index: PresetDataIndex.CMP_Para2 },
          release: { label: 'Release', index: PresetDataIndex.CMP_Para4 },
        },
      },
      'Rose Comp': {
        params: {
          level: { label: 'Level', index: PresetDataIndex.CMP_Para2 },
          sustain: { label: 'Sustain', index: PresetDataIndex.CMP_Para1 },
        },
      },
    },
  },
  IR: {
    types: {
      JZ120: {
        params: {
          level: { label: 'Level', unit: 'dB', min: -12, max: 12, index: ParamIndex.CAB_PARAMS.level },
          lowcut: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300, index: ParamIndex.CAB_PARAMS.lowcut },
          hicut: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000, index: ParamIndex.CAB_PARAMS.hicut },
        },
      },
      default: {
        params: {
          level: { label: 'Level', unit: 'dB', min: -12, max: 12, index: ParamIndex.CAB_PARAMS.level },
          lowcut: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300, index: ParamIndex.CAB_PARAMS.lowcut },
          hicut: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000, index: ParamIndex.CAB_PARAMS.hicut },
        },
      },
    },
  },
  DLY: {
    types: {
      'Digital Delay': {
        params: {
          mix: { label: 'E.Level', min: 0, max: 100, index: ParamIndex.DLY_PARAMS.mix },
          feedback: { label: 'F.Back', min: 0, max: 100, index: ParamIndex.DLY_PARAMS.feedback },
          time: { label: 'D.Time', unit: 'ms', min: 61, max: 752, index: ParamIndex.DLY_PARAMS.time },
        },
      },
    },
  },
};

export default processorConfig;