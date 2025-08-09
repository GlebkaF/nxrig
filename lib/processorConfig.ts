export type Unit = 'dB' | 'Hz' | 'ms' | 'bpm' | '%';

export interface ParamMeta {
  label: string;
  unit: Unit;
  min: number;
  max: number;
}

// Slot and per-slot parameter key unions using device-native names
export type Slot = 'Noisegate' | 'Compressor' | 'EFX' | 'DLY' | 'Amp' | 'IR' | 'EQ' | 'Mod' | 'RVB';

export type CompressorParamKey = 'CMP_Para1' | 'CMP_Para2' | 'CMP_Para3' | 'CMP_Para4';
export type DelayParamKey = 'DLY_Para1' | 'DLY_Para2' | 'DLY_Para3' | 'DLY_Para4' | 'DLY_Para5' | 'DLY_Para6' | 'DLY_Para7' | 'DLY_Para8';
export type IRParamKey = 'CAB_Para1' | 'CAB_Para2' | 'CAB_Para3' | 'CAB_Para4' | 'CAB_Para5' | 'CAB_Para6';
export type AmpParamKey = 'AMP_Para1' | 'AMP_Para2' | 'AMP_Para3' | 'AMP_Para4' | 'AMP_Para5' | 'AMP_Para6' | 'AMP_Para7' | 'AMP_Para8';
export type EfxParamKey = 'EFX_Para1' | 'EFX_Para2' | 'EFX_Para3' | 'EFX_Para4' | 'EFX_Para5' | 'EFX_Para6';
export type EqParamKey = 'EQ_Para1' | 'EQ_Para2' | 'EQ_Para3' | 'EQ_Para4' | 'EQ_Para5' | 'EQ_Para6' | 'EQ_Para7' | 'EQ_Para8' | 'EQ_Para9' | 'EQ_Para10' | 'EQ_Para11' | 'EQ_Para12';
export type NoisegateParamKey = 'NG_Para1' | 'NG_Para2' | 'NG_Para3' | 'NG_Para4';
export type ModParamKey = 'MOD_Para1' | 'MOD_Para2' | 'MOD_Para3' | 'MOD_Para4' | 'MOD_Para5' | 'MOD_Para6';
export type ReverbParamKey = 'RVB_Para1' | 'RVB_Para2' | 'RVB_Para3' | 'RVB_Para4';

export interface ParamsBySlot {
  Noisegate: Partial<Record<NoisegateParamKey, ParamMeta>>;
  Compressor: Partial<Record<CompressorParamKey, ParamMeta>>;
  EFX: Partial<Record<EfxParamKey, ParamMeta>>;
  DLY: Partial<Record<DelayParamKey, ParamMeta>>;
  Amp: Partial<Record<AmpParamKey, ParamMeta>>;
  IR: Partial<Record<IRParamKey, ParamMeta>>;
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

export function toUnitString(value0100: number, { min, max, unit }: { min: number; max: number; unit: Unit }) {
  const v = value0100;
  const mapped = min + (v / 100) * (max - min);
  const rounded = unit === 'dB' ? Math.round(mapped * 10) / 10 : Math.round(mapped);
  return `${String(rounded)} ${unit}`;
}

// Minimal registry, only what UI uses now
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