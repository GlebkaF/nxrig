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
import nirvana from "lib/public/artist/nirvana";

const preset: Preset = {
  id: "gen_menvyq0h_j1ohwnij6",
  description:
    "Clean, watery, slightly dark and chorus-heavy tone with moderate sustain. The sound is mellow, lacks high-end brightness, and has a swirling, modulated character. Not aggressive or compressed; has a laid-back, loose feel.",
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
      type: ModulationType.CE2,
      enabled: true,
      params: {
        Rate: 45,
        Depth: 80,
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
        Master: 60,
        Bass: 62,
        Middle: 56,
        Treble: 36,
        Bright: 40,
      },
    },
    cabinet: {
      type: CabinetType.TR212,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 45,
        HighCut: 32,
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
      type: ReverbType.Spring,
      enabled: true,
      params: {
        Level: 36,
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
  pickup: {
    type: "single",
    tone: 4,
    position: "neck",
  },
  slug: "come-as-you-are-guitar-intro",
  tabsUrl: "https://www.songsterr.com/a/wsa/nirvana-come-as-you-are-tab-s14",
  origin: {
    artist: nirvana,
    song: "Come As You Are",
    part: "Intro",
    imageUrl: "/images/cover/nirvana/nevermind.webp",
  },
};

export default preset;
