import { NoisegateParams, NoiseGateType } from "lib/core/blocks/noisegate";
import { Blocks } from "../interface";

type Chain = {
  [Blocks.Noisegate]: NoisegateParams;
  [Blocks.Compressor]: null;
  [Blocks.Modulation]: null;
  [Blocks.Effect]: null;
  [Blocks.Amplifier]: null;
  [Blocks.Cabinet]: null;
  [Blocks.Eq]: null;
  [Blocks.Reverb]: null;
  [Blocks.Delay]: null;
};

export function createDefaultChain(): Chain {
  const chain: Chain = {
    [Blocks.Noisegate]: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 50,
        Decay: 50,
      },
    },
    [Blocks.Compressor]: null,
    [Blocks.Modulation]: null,
    [Blocks.Effect]: null,
    [Blocks.Amplifier]: null,
    [Blocks.Cabinet]: null,
    [Blocks.Eq]: null,
    [Blocks.Reverb]: null,
    [Blocks.Delay]: null,
  };

  return chain;
}
