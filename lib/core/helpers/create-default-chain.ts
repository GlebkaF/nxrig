import { ModulationParams, ModulationType } from "../blocks/modulation";
import { CompressorParams, CompressorType } from "../blocks/compressor";
import { NoisegateParams, NoiseGateType } from "../blocks/noisegate";
import { ReverbType } from "../blocks/reverb";
import { Blocks } from "../interface";
import { EffectType, EffectParams } from "../blocks/effect";
import { AmplifierParams, AmplifierType } from "../blocks/amplifier";
import { CabinetParams, CabinetType } from "../blocks/cabinet";
import { EqParams, EqType } from "../blocks/eq";
import { ReverbParams } from "../blocks/reverb";
import { DelayParams, DelayType } from "../blocks/delay";

type Chain = {
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
