export type Unit = 'dB' | 'Hz' | 'ms' | 'bpm' | '%' ;

export interface ParamMeta {
  label: string;
  unit: Unit;
  min: number;
  max: number;
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
    CMP_Para1: PresetDataIndex.CMP_Para1,
    CMP_Para2: PresetDataIndex.CMP_Para2,
    CMP_Para3: PresetDataIndex.CMP_Para3,
    CMP_Para4: PresetDataIndex.CMP_Para4,
  },
  EFX_PARAMS: {
    EFX_Para1: PresetDataIndex.EFX_Para1,
    EFX_Para2: PresetDataIndex.EFX_Para2,
    EFX_Para3: PresetDataIndex.EFX_Para3,
    EFX_Para4: PresetDataIndex.EFX_Para4,
    EFX_Para5: PresetDataIndex.EFX_Para5,
    EFX_Para6: PresetDataIndex.EFX_Para6,
  },
  AMP_PARAMS: {
    AMP_Para1: PresetDataIndex.AMP_Para1,
    AMP_Para2: PresetDataIndex.AMP_Para2,
    AMP_Para3: PresetDataIndex.AMP_Para3,
    AMP_Para4: PresetDataIndex.AMP_Para4,
    AMP_Para5: PresetDataIndex.AMP_Para5,
    AMP_Para6: PresetDataIndex.AMP_Para6,
    AMP_Para7: PresetDataIndex.AMP_Para7,
    AMP_Para8: PresetDataIndex.AMP_Para8,
  },
  EQ_PARAMS: {
    EQ_Para1: PresetDataIndex.EQ_Para1,
    EQ_Para2: PresetDataIndex.EQ_Para2,
    EQ_Para3: PresetDataIndex.EQ_Para3,
    EQ_Para4: PresetDataIndex.EQ_Para4,
    EQ_Para5: PresetDataIndex.EQ_Para5,
    EQ_Para6: PresetDataIndex.EQ_Para6,
    EQ_Para7: PresetDataIndex.EQ_Para7,
    EQ_Para8: PresetDataIndex.EQ_Para8,
    EQ_Para9: PresetDataIndex.EQ_Para9,
    EQ_Para10: PresetDataIndex.EQ_Para10,
    EQ_Para11: PresetDataIndex.EQ_Para11,
    EQ_Para12: PresetDataIndex.EQ_Para12,
  },
  NG_PARAMS: {
    NG_Para1: PresetDataIndex.NG_Para1,
    NG_Para2: PresetDataIndex.NG_Para2,
    NG_Para3: PresetDataIndex.NG_Para3,
    NG_Para4: PresetDataIndex.NG_Para4,
  },
  MOD_PARAMS: {
    MOD_Para1: PresetDataIndex.MOD_Para1,
    MOD_Para2: PresetDataIndex.MOD_Para2,
    MOD_Para3: PresetDataIndex.MOD_Para3,
    MOD_Para4: PresetDataIndex.MOD_Para4,
    MOD_Para5: PresetDataIndex.MOD_Para5,
    MOD_Para6: PresetDataIndex.MOD_Para6,
  },
  DLY_PARAMS: {
    DLY_Para1: PresetDataIndex.DLY_Para1,
    DLY_Para2: PresetDataIndex.DLY_Para2,
    DLY_Para3: PresetDataIndex.DLY_Para3,
    DLY_Para4: PresetDataIndex.DLY_Para4,
    DLY_Para5: PresetDataIndex.DLY_Para5,
    DLY_Para6: PresetDataIndex.DLY_Para6,
    DLY_Para7: PresetDataIndex.DLY_Para7,
    DLY_Para8: PresetDataIndex.DLY_Para8,
  },
  RVB_PARAMS: {
    RVB_Para1: PresetDataIndex.RVB_Para1,
    RVB_Para2: PresetDataIndex.RVB_Para2,
    RVB_Para3: PresetDataIndex.RVB_Para3,
    RVB_Para4: PresetDataIndex.RVB_Para4,
  },
  CAB_PARAMS: {
    CAB_Para1: PresetDataIndex.CAB_Para1,
    CAB_Para2: PresetDataIndex.CAB_Para2,
    CAB_Para3: PresetDataIndex.CAB_Para3,
    CAB_Para4: PresetDataIndex.CAB_Para4,
    CAB_Para5: PresetDataIndex.CAB_Para5,
    CAB_Para6: PresetDataIndex.CAB_Para6,
  },
} as const;

// Allowed parameter keys per slot (now using *_ParaN keys directly)
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
  realName?: string;
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
export function toUnitString(value0100: number, { min, max, unit }: { min: number; max: number; unit: Unit }) {
  const v = value0100;
  const mapped = min + (v / 100) * (max - min);
  const rounded = unit === 'dB' ? Math.round(mapped * 10) / 10 : Math.round(mapped);
  return `${String(rounded)} ${unit}`;
}

// ---------- Processor registry ----------
// params: key -> { label, unit, min, max }
export const processorConfig: ProcessorConfig = {
  Compressor: {
    types: {
      'K Comp': {
        realName: 'Keeley Compressor',
        params: {
          CMP_Para2: { label: 'Level', unit: '%', min: 0, max: 100 },
          CMP_Para1: { label: 'Sustain', unit: '%', min: 0, max: 100 },
          CMP_Para3: { label: 'Clipping', unit: '%', min: 0, max: 100 },
        },
      },
      'Studio Comp': {
        realName: 'Studio Compressor',
        params: {
          CMP_Para3: { label: 'Gain', unit: '%', min: 0, max: 100 },
          CMP_Para1: { label: 'Threshold', unit: '%', min: 0, max: 100 },
          CMP_Para2: { label: 'Ratio', unit: '%', min: 0, max: 100 },
          CMP_Para4: { label: 'Release', unit: '%', min: 0, max: 100 },
        },
      },
      'Rose Comp': {
        realName: 'Keeley Compressor',
        params: {
          CMP_Para2: { label: 'Level', unit: '%', min: 0, max: 100 },
          CMP_Para1: { label: 'Sustain', unit: '%', min: 0, max: 100 },
        },
      },
    },
  },
  IR: {
    types: {
      JZ120: {
        realName: 'Roland JC-120 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      default: {
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
    },
  },
  DLY: {
    types: {
      'Digital Delay': {
        params: {
          DLY_Para1: { label: 'E.Level', unit: '%', min: 0, max: 100 },
          DLY_Para2: { label: 'F.Back', unit: '%', min: 0, max: 100 },
          DLY_Para3: { label: 'D.Time', unit: 'bpm', min: 752, max: 61 },
        },
      },
    },
  },
};

export default processorConfig;