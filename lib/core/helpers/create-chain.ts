import { ModulationType } from "../blocks/modulation";
import { CompressorType } from "../blocks/compressor";
import { NoiseGateType } from "../blocks/noisegate";
import { ReverbType } from "../blocks/reverb";
import { Blocks, Chain } from "../interface";
import { EffectType } from "../blocks/effect";
import { AmplifierType } from "../blocks/amplifier";
import { CabinetType } from "../blocks/cabinet";
import { EqType } from "../blocks/eq";
import { DelayType } from "../blocks/delay";
import { config } from "lib/core/config";

export interface BlockTypesConfig {
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

export function createDefaultChain(): Chain {
  return createEmptyChain({
    [Blocks.Noisegate]: NoiseGateType.NoiseGate,
    [Blocks.Compressor]: CompressorType.KComp,
    [Blocks.Modulation]: ModulationType.CE1,
    [Blocks.Effect]: EffectType.DistortionPlus,
    [Blocks.Amplifier]: AmplifierType.JazzClean,
    [Blocks.Cabinet]: CabinetType.JZ120,
    [Blocks.Eq]: EqType.SixBand,
    [Blocks.Reverb]: ReverbType.Room,
    [Blocks.Delay]: DelayType.AnalogDelay,
  });
}

export function createEmptyChain(types: BlockTypesConfig): Chain {
  const createTypeParams = <T extends Blocks>(
    block: T,
    type: string | null
  ): Chain[T] => {
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
            acc[param.label] = 50;
            return acc;
          },
          {}
        ),
      } as Chain[T];
    }

    if (!typeConfig) {
      throw new Error(`Type ${type} not found in block ${block}`);
    }

    return {
      type: type,
      enabled: true,
      params: typeConfig.params.reduce<Record<string, number>>((acc, param) => {
        acc[param.label] = 50;
        return acc;
      }, {}),
    } as Chain[T];
  };

  return {
    [Blocks.Noisegate]: createTypeParams(
      Blocks.Noisegate,
      types[Blocks.Noisegate]
    ),
    [Blocks.Compressor]: createTypeParams(
      Blocks.Compressor,
      types[Blocks.Compressor]
    ),
    [Blocks.Modulation]: createTypeParams(
      Blocks.Modulation,
      types[Blocks.Modulation]
    ),
    [Blocks.Effect]: createTypeParams(Blocks.Effect, types[Blocks.Effect]),
    [Blocks.Amplifier]: createTypeParams(
      Blocks.Amplifier,
      types[Blocks.Amplifier]
    ),
    [Blocks.Cabinet]: createTypeParams(Blocks.Cabinet, types[Blocks.Cabinet]),
    [Blocks.Eq]: createTypeParams(Blocks.Eq, types[Blocks.Eq]),
    [Blocks.Reverb]: createTypeParams(Blocks.Reverb, types[Blocks.Reverb]),
    [Blocks.Delay]: createTypeParams(Blocks.Delay, types[Blocks.Delay]),
  };
}
