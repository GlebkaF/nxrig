export type Unit = 'dB' | 'Hz' | 'ms' | 'bpm' | '%' | 'bool';

export interface ParamMeta {
  label: string;
  unit: Unit;
  min: number;
  max: number;
}

// Slot and per-slot parameter key unions using device-native names
export type Slot = 'Noisegate' | 'Compressor' | 'EFX' | 'Delay' | 'Amp' | 'Cabinet' | 'EQ' | 'Mod' | 'RVB';

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
  Delay: Partial<Record<DelayParamKey, ParamMeta>>;
  Amp: Partial<Record<AmpParamKey, ParamMeta>>;
  Cabinet: Partial<Record<IRParamKey, ParamMeta>>;
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
  Delay: '#7dd3fc',
  Amp: '#ef4444',
  Cabinet: '#3b82f6',
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
  Cabinet: {
    types: {
      JZ120: {
        realName: 'Roland JC-120 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      DR112: {
        realName: 'Fender Deluxe Reverb 1x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      TR212: {
        realName: 'Fender Twin Reverb 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      HIWIRE412: {
        realName: 'Hiwatt 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      'CALI 112': {
        realName: 'Mesa/Boogie 1x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      A112: {
        realName: 'American 1x12 (Open Back)',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      GB412: {
        realName: 'Celestion Greenback 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      M1960AX: {
        realName: 'Marshall 1960AX 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      M1960AV: {
        realName: 'Marshall 1960AV 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      M1960TV: {
        realName: 'Marshall 1960TV 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      SLO412: {
        realName: 'Soldano 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      'FIREMAN 412': {
        realName: 'Friedman 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      'RECT 412': {
        realName: 'Mesa Boogie Rectifier 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      DIE412: {
        realName: 'Diezel 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      MATCH212: {
        realName: 'Matchless 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      UBER412: {
        realName: 'Bogner Uberkab 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      BS410: {
        realName: 'Fender Bassman 4x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      A212: {
        realName: 'American 2x12 (Open Back)',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      M1960AHW: {
        realName: 'Marshall 1960AHW 4x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      M1936: {
        realName: 'Marshall 1936 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      BUDDA112: {
        realName: 'Budda 1x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      Z212: {
        realName: 'Dr. Z 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      SUPERVERB410: {
        realName: 'Fender Super Reverb 4x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      VIBROKING310: {
        realName: 'Fender Vibro‑King 3x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      AGL_DB810: {
        realName: 'Aguilar DB810 8x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      AMP_SV212: {
        realName: 'Ampeg SVT 2x12',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      AMP_SV410: {
        realName: 'Ampeg SVT 4x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      AMP_SV810: {
        realName: 'Ampeg SVT 8x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      BASSGUY410: {
        realName: 'Fender Bassman 4x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      EDEN410: {
        realName: 'Eden 4x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      MKB410: {
        realName: 'Markbass 4x10',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      'G-HBIRD': {
        realName: 'Gibson Hummingbird (Acoustic IR)',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      'G-J15': {
        realName: 'Gibson J‑15 (Acoustic IR)',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
      'M-D45': {
        realName: 'Martin D‑45 (Acoustic IR)',
        params: {
          CAB_Para4: { label: 'Level', unit: 'dB', min: -12, max: 12 },
          CAB_Para5: { label: 'Low Cut', unit: 'Hz', min: 20, max: 300 },
          CAB_Para6: { label: 'High Cut', unit: 'Hz', min: 5000, max: 20000 },
        },
      },
    },
  },
Delay: {
    types: {
      'Digital Delay': {
        params: {
          DLY_Para1: { label: 'E.Level', unit: '%', min: 0, max: 100 },
          DLY_Para2: { label: 'F.Back', unit: '%', min: 0, max: 100 },
          DLY_Para3: { label: 'D.Time', unit: 'ms', min: 61, max: 752 },
        },
      },
      'Analog V2': {
        params: {
          DLY_Para3: { label: 'Intensity', unit: '%', min: 0, max: 100 },
          DLY_Para1: { label: 'Rate', unit: 'ms', min: 61, max: 752 },
          DLY_Para2: { label: 'Echo', unit: '%', min: 0, max: 100 },
        },
      },
      Modulation: {
        params: {
          DLY_Para2: { label: 'Level', unit: '%', min: 0, max: 100 },
          DLY_Para1: { label: 'Time', unit: 'ms', min: 61, max: 752 },
          DLY_Para4: { label: 'Repeat', unit: '%', min: 0, max: 100 },
          DLY_Para3: { label: 'Mod', unit: '%', min: 0, max: 100 },
        },
      },
      'Tape Echo': {
        params: {
          DLY_Para2: { label: 'Level', unit: '%', min: 0, max: 100 },
          DLY_Para1: { label: 'Time', unit: 'ms', min: 61, max: 752 },
          DLY_Para3: { label: 'Repeat', unit: '%', min: 0, max: 100 },
        },
      },
      'Pan Delay': {
        params: {
          DLY_Para3: { label: 'Level', unit: '%', min: 0, max: 100 },
          DLY_Para1: { label: 'Time', unit: 'ms', min: 61, max: 752 },
          DLY_Para2: { label: 'Repeat', unit: '%', min: 0, max: 100 },
        },
      },
      'Phi Delay': {
        params: {
          DLY_Para1: { label: 'Time', unit: 'ms', min: 61, max: 752 },
          DLY_Para2: { label: 'Repeat', unit: '%', min: 0, max: 100 },
          DLY_Para3: { label: 'Mix', unit: '%', min: 0, max: 100 },
        },
      },
    },
  },
  Amp: {
    types: {
      'Jazz Clean': {
        realName: 'Roland JC-120',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Bright', unit: 'bool', min: 0, max: 100 },
        },
      },
      'Deluxe Rvb': {
        realName: 'Fender Deluxe Reverb',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
        },
      },
      'Bass Mate': {
        realName: 'Fender Bassman',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      Tweedy: {
        realName: 'Fender Tweed Deluxe',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Tone', unit: '%', min: 0, max: 100 },
        },
      },
      Hiwire: {
        realName: 'Hiwatt DR103',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Cali Crunch': {
        realName: 'Mesa Boogie Mark I',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Class A15': {
        realName: 'Vox AC15',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Cut', unit: '%', min: 0, max: 100 },
        },
      },
      'Class A30': {
        realName: 'Vox AC30',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Cut', unit: '%', min: 0, max: 100 },
        },
      },
      'Plexi 100': {
        realName: 'Marshall JTM45 100W',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Plexi 45': {
        realName: 'Marshall JTM45 45W',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Brit 800': {
        realName: 'Marshall JCM800',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      '1987 X 50': {
        realName: 'Marshall JCM1987X',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'SLO 100': {
        realName: 'Soldano SLO-100',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Fireman HBE': {
        realName: 'Friedman BE-100',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Dual Rect': {
        realName: 'Mesa Boogie Dual Rectifier',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Die VH4': {
        realName: 'Diezel VH4',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Mr. Z38': {
        realName: 'Dr. Z MAZ 38',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Cut', unit: '%', min: 0, max: 100 },
        },
      },
      'Super Rvb': {
        realName: 'Fender Super Reverb',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Bright', unit: 'bool', min: 0, max: 100 },
        },
      },
      Budda: {
        realName: 'Budda Superdrive',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Cut', unit: '%', min: 0, max: 100 },
        },
      },
      'Brit Blues': {
        realName: 'Marshall Bluesbreaker',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Match D30': {
        realName: 'Matchless DC-30',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Cut', unit: '%', min: 0, max: 100 },
        },
      },
      'Brit 2000': {
        realName: 'Marshall JCM2000',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      'Uber HiGain': {
        realName: 'Bogner Uberschall',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Presence', unit: '%', min: 0, max: 100 },
        },
      },
      AGL: {
        realName: 'Aguilar Tone Hammer',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Mid Freq', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
        },
      },
      MLD: {
        realName: 'NUX Melvin Lee Davis Preamp',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Mid Freq', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
        },
      },
      'Optima Air': {
        realName: 'NUX Optima Air',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
        },
      },
      Stageman: {
        realName: 'NUX Stageman AC-50',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
        },
      },
      'Twin Reverb': {
        realName: 'Fender Twin Reverb',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Bright', unit: 'bool', min: 0, max: 100 },
        },
      },
      'Vibro King': {
        realName: 'Fender Vibro‑King',
        params: {
          AMP_Para1: { label: 'Gain', unit: '%', min: 0, max: 100 },
          AMP_Para2: { label: 'Master', unit: '%', min: 0, max: 100 },
          AMP_Para3: { label: 'Bass', unit: '%', min: 0, max: 100 },
          AMP_Para4: { label: 'Middle', unit: '%', min: 0, max: 100 },
          AMP_Para5: { label: 'Treble', unit: '%', min: 0, max: 100 },
          AMP_Para6: { label: 'Bright', unit: 'bool', min: 0, max: 100 },
        },
      },
    },
  },
};

export default processorConfig;
