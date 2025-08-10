export interface BlockConfig {
  types: TypeConfig[];
}

interface TypeConfig {
  label: string;
  realName: string;
  encodeType: number;
  params: TypeParamConfig[];
}

export interface TypeParamConfig {
  label: string;
  encodeIndex: number;
}

export enum Blocks {
  Noisegate = "noisegate",
  Compressor = "compressor",
  Modulation = "modulation",
  Effect = "effect",
  Amplifier = "amplifier",
  Cabinet = "cabinet",
  Eq = "eq",
  Reverb = "reverb",
  Delay = "delay",
}

export type ChainItem<T extends string, P extends string> = {
  type: T;
  enabled: boolean;
  encoderHeadIndex: number;
  params: {
    [key in P]: number;
  };
};
