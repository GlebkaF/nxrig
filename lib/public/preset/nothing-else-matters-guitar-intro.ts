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
import metallica from "lib/public/artist/metallica";

const preset: Preset = {
  id: "gen_meh734a9_vn6pc6u9f",
  description:
    "Warm, clean, and articulate tone with a smooth, rounded attack and moderate sustain. The sound is open and slightly bright, but with a mellow character. There is minimal distortion or breakup, and the dynamics are preserved for expressive fingerpicking. Subtle ambience enhances the atmosphere.",
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
      enabled: true,
      params: {
        Level: 52,
        Sustain: 38,
        Clipping: 35,
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
        Master: 58,
        Bass: 43,
        Middle: 52,
        Treble: 62,
        Bright: 55,
      },
    },
    cabinet: {
      type: CabinetType.TR212,
      enabled: true,
      params: {
        Level: 53,
        LowCut: 57,
        HighCut: 54,
      },
    },
    eq: {
      type: EqType.SixBand,
      enabled: false,
      params: {
        "100": 50,
        "220": 50,
        "500": 50,
        "1200": 50,
        "2600": 50,
        "6400": 50,
      },
    },
    reverb: {
      type: ReverbType.Plate,
      enabled: true,
      params: {
        Level: 42,
        Decay: 35,
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
  pickup: {
    type: "single",
    tone: 7,
    position: "neck",
  },
  slug: "nothing-else-matters-guitar-intro",
  origin: {
    artist: metallica,
    song: "Nothing Else Matters",
    part: "Intro",
    imageUrl: "/images/cover/metallica/the-black-album.jpg",
  },
};

export default preset;
