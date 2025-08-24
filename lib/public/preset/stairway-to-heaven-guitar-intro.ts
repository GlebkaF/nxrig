import { Preset } from "lib/public/interface";
import { NoiseGateType } from "lib/core/blocks/noisegate";
import { CompressorType } from "lib/core/blocks/compressor";
import { ModulationType } from "lib/core/blocks/modulation";
import { EffectType } from "lib/core/blocks/effect";
import { AmplifierType } from "lib/core/blocks/amplifier";
import { CabinetType } from "lib/core/blocks/cabinet";
import { EqType } from "lib/core/blocks/eq";
import { ReverbType } from "lib/core/blocks/reverb";
import { DelayType } from "lib/core/blocks/delay";
import ledZeppelin from "lib/public/artist/led-zeppelin";

const preset: Preset = {
  id: "gen_meh6v9ds_y8jhmhs8n",
  description:
    "Delicate, shimmering, clean tone with warmth and clarity. High dynamics for expressive fingerpicking, with a smooth, airy presence. No distortion or aggressive attack; the sound is intimate and natural.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: false,
      params: {
        Sensitivity: 50,
        Decay: 50,
      },
    },
    compressor: {
      type: CompressorType.KComp,
      enabled: false,
      params: {
        Level: 50,
        Sustain: 50,
        Clipping: 50,
      },
    },
    modulation: {
      type: ModulationType.CE1,
      enabled: false,
      params: {
        Rate: 50,
        Depth: 50,
        Intensity: 50,
      },
    },
    effect: {
      type: EffectType.DistortionPlus,
      enabled: false,
      params: {
        Output: 50,
        Sensitivity: 50,
      },
    },
    amplifier: {
      type: AmplifierType.TwinReverb,
      enabled: true,
      params: {
        Gain: 38,
        Master: 65,
        Bass: 42,
        Middle: 54,
        Treble: 61,
        Bright: 58,
      },
    },
    cabinet: {
      type: CabinetType.TR212,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 60,
        HighCut: 48,
      },
    },
    eq: {
      type: EqType.SixBand,
      enabled: true,
      params: {
        "100": 43,
        "220": 47,
        "500": 51,
        "1200": 57,
        "2600": 61,
        "6400": 54,
      },
    },
    reverb: {
      type: ReverbType.Plate,
      enabled: true,
      params: {
        Level: 28,
        Decay: 32,
      },
    },
    delay: {
      type: DelayType.AnalogDelay,
      enabled: false,
      params: {
        Intensity: 50,
        Rate: 50,
        Echo: 50,
      },
    },
  },
  slug: "stairway-to-heaven-guitar-intro",
  origin: {
    artist: ledZeppelin,
    song: "Stairway to Heaven",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Stairway_to_Heaven_by_Led_Zeppelin_US_promotional_single.png",
  },
};

export default preset;
