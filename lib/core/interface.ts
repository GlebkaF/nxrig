import { AmplifierParams } from "lib/core/blocks/amplifier";
import { CabinetParams } from "lib/core/blocks/cabinet";
import { CompressorParams } from "lib/core/blocks/compressor";
import { DelayParams } from "lib/core/blocks/delay";
import { EffectParams } from "lib/core/blocks/effect";
import { EqParams } from "lib/core/blocks/eq";
import { ModulationParams } from "lib/core/blocks/modulation";
import { NoisegateParams } from "lib/core/blocks/noisegate";
import { ReverbParams } from "lib/core/blocks/reverb";

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
  params: {
    [key in P]: number;
  };
};

export type Chain = {
  [Blocks.Noisegate]: NoisegateParams;
  [Blocks.Compressor]: CompressorParams;
  [Blocks.Modulation]: ModulationParams;
  [Blocks.Effect]: EffectParams;
  [Blocks.Amplifier]: AmplifierParams;
  [Blocks.Cabinet]: CabinetParams;
  [Blocks.Eq]: EqParams;
  [Blocks.Reverb]: ReverbParams;
  [Blocks.Delay]: DelayParams;
};

export type ChainConfig = {
  [Blocks.Noisegate]: BlockConfig;
  [Blocks.Compressor]: BlockConfig;
  [Blocks.Modulation]: BlockConfig;
  [Blocks.Effect]: BlockConfig;
  [Blocks.Amplifier]: BlockConfig;
  [Blocks.Cabinet]: BlockConfig;
  [Blocks.Eq]: BlockConfig;
  [Blocks.Reverb]: BlockConfig;
  [Blocks.Delay]: BlockConfig;
};
