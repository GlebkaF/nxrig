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
