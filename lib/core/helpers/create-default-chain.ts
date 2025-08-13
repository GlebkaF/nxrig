import { ModulationType } from "../blocks/modulation";
import { CompressorParams, CompressorType } from "../blocks/compressor";
import { NoisegateParams, NoiseGateType } from "../blocks/noisegate";
import { ReverbType } from "../blocks/reverb";
import { Blocks, Chain, ChainItem } from "../interface";
import { EffectType } from "../blocks/effect";
import { AmplifierType } from "../blocks/amplifier";
import { CabinetType } from "../blocks/cabinet";
import { EqType } from "../blocks/eq";
import { DelayType } from "../blocks/delay";
import { config } from "lib/core/config";

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
    [Blocks.Compressor]: {
      type: CompressorType.KComp,
      enabled: true,
      params: {
        Level: 50,
        Sustain: 50,
        Clipping: 50,
      },
    },
    [Blocks.Modulation]: {
      type: ModulationType.CE1,
      enabled: true,
      params: {
        Rate: 50,
        Depth: 50,
        Intensity: 50,
      },
    },
    [Blocks.Effect]: {
      type: EffectType.DistortionPlus,
      enabled: true,
      params: {
        Output: 50,
        Sensitivity: 50,
      },
    },
    [Blocks.Amplifier]: {
      type: AmplifierType.JazzClean,
      enabled: true,
      params: {
        Gain: 50,
        Master: 50,
        Bass: 50,
        Middle: 50,
        Treble: 50,
        Bright: 50,
      },
    },
    [Blocks.Cabinet]: {
      type: CabinetType.JZ120,
      enabled: true,
      params: {
        Level: 50,
        LowCut: 50,
        HighCut: 50,
      },
    },
    [Blocks.Eq]: {
      type: EqType.SixBand,
      enabled: true,
      params: {
        "100": 50,
        "220": 50,
        "500": 50,
        "1200": 50,
        "2600": 50,
        "6400": 50,
      },
    },
    [Blocks.Reverb]: {
      type: ReverbType.Room,
      enabled: true,
      params: {
        Level: 50,
        Decay: 50,
        Tone: 50,
      },
    },
    [Blocks.Delay]: {
      type: DelayType.AnalogDelay,
      enabled: true,
      params: {
        Intensity: 50,
        Rate: 50,
        Echo: 50,
      },
    },
  };

  return chain;
}

interface TmpIf {
  [Blocks.Noisegate]: NoiseGateType | null;
  [Blocks.Compressor]: CompressorType | null;
  [Blocks.Modulation]: ModulationType | null;
  [Blocks.Effect]: EffectType | null;
  [Blocks.Amplifier]: AmplifierType | null;
  [Blocks.Cabinet]: CabinetType | null;
  [Blocks.Eq]: EqType | null;
  [Blocks.Reverb]: ReverbType | null;
  [Blocks.Delay]: DelayType | null;
}

export function createEmptyChain(types: TmpIf): Chain {
  const createTypeParams = (
    block: Blocks,
    type: string | null
  ): ChainItem<string, string> => {
    const blockConfig = config.blocks[block];
    const typeConfig = blockConfig.types.find((t) => t.label === type);

    if (!type) {
      const defaultType = blockConfig.types[0];
      if (!defaultType) {
        throw new Error(`No default type found for block ${block}`);
      }

      return {
        type: defaultType.label,
        enabled: false,
        params: defaultType.params.reduce<Record<string, number>>(
          (acc, param) => {
            acc[param.label] = 0;
            return acc;
          },
          {}
        ),
      };
    }

    if (!typeConfig) {
      throw new Error(`Type ${type} not found in block ${block}`);
    }

    const chainItem: ChainItem<string, string> = {
      type: type,
      enabled: true,
      params: typeConfig.params.reduce<Record<string, number>>((acc, param) => {
        acc[param.label] = 0;
        return acc;
      }, {}),
    };

    return chainItem;
  };

  return {
    // @ts-expect-error TODO: fix this
    [Blocks.Noisegate]: createTypeParams(
      Blocks.Noisegate,
      types[Blocks.Noisegate]
    ),
    // @ts-expect-error TODO: fix this
    [Blocks.Compressor]: createTypeParams(
      Blocks.Compressor,
      types[Blocks.Compressor]
    ),
    // @ts-expect-error TODO: fix this
    [Blocks.Modulation]: createTypeParams(
      Blocks.Modulation,
      types[Blocks.Modulation]
    ),
    // @ts-expect-error TODO: fix this
    [Blocks.Effect]: createTypeParams(Blocks.Effect, types[Blocks.Effect]),
    // @ts-expect-error TODO: fix this
    [Blocks.Amplifier]: createTypeParams(
      Blocks.Amplifier,
      types[Blocks.Amplifier]
    ),
    // @ts-expect-error TODO: fix this
    [Blocks.Cabinet]: createTypeParams(Blocks.Cabinet, types[Blocks.Cabinet]),
    // @ts-expect-error TODO: fix this
    [Blocks.Eq]: createTypeParams(Blocks.Eq, types[Blocks.Eq]),
    // @ts-expect-error TODO: fix this
    [Blocks.Reverb]: createTypeParams(Blocks.Reverb, types[Blocks.Reverb]),
    // @ts-expect-error TODO: fix this
    [Blocks.Delay]: createTypeParams(Blocks.Delay, types[Blocks.Delay]),
  };
}
