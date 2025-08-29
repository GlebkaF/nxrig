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
import pantera from "lib/public/artist/pantera";

const preset: Preset = {
  id: "pantera-floods-intro-",
  description:
    "The tone is crystal clear, glassy, and atmospheric with rich depth and shimmer. There's a pronounced stereo spread from the chorus, lush delays, and a haunting reverb tail. The attack is crisp but not harsh, and the sustain is natural. Overall, it is a clean, slightly compressed sound with a dramatic, spacious feel.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 48,
        Decay: 60,
      },
    },
    compressor: {
      type: CompressorType.KComp,
      enabled: true,
      params: {
        Level: 53,
        Sustain: 40,
        Clipping: 20,
      },
    },
    modulation: {
      type: ModulationType.STChorus,
      enabled: true,
      params: {
        Rate: 38,
        Width: 80,
        Intensity: 67,
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
        Gain: 35,
        Master: 70,
        Bass: 44,
        Middle: 38,
        Treble: 62,
        Bright: 60,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 53,
        LowCut: 55,
        HighCut: 65,
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
        Level: 68,
        Decay: 74,
      },
    },
    delay: {
      type: DelayType.DigitalDelay,
      enabled: true,
      params: {
        "E.Level": 57,
        Feedback: 52,
        Time: 72,
      },
    },
  },
  pickup: {
    type: "single",
    tone: 10,
    position: "neck",
  },
  slug: "pantera-floods-guitar-intro",
  tabsUrl: "https://www.songsterr.com/a/wsa/pantera-floods-tab-s84836t2",
  origin: {
    artist: pantera,
    song: "Floods",
    part: "Intro",
    imageUrl: "/images/cover/pantera/the-great-southern-thunder.webp",
  },
};

export default preset;
