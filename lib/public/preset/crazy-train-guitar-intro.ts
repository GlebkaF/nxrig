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
import ozzyOsborn from "lib/public/artist/ozzy-osborn";

const preset: Preset = {
  id: "gen_meh7yxtq_istxg3la5",
  description:
    "Bright, aggressive, tight, with pronounced attack and clarity; features a saturated but controlled distortion, moderate sustain, and enough midrange cut to slice through a mix. There's minimal ambience, keeping the riff precise and punchy.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 50,
        Decay: 35,
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
      enabled: true,
      params: {
        Output: 55,
        Sensitivity: 68,
      },
    },
    amplifier: {
      type: AmplifierType.Brit800,
      enabled: true,
      params: {
        Gain: 72,
        Master: 62,
        Bass: 44,
        Middle: 62,
        Treble: 69,
        Presence: 58,
      },
    },
    cabinet: {
      type: CabinetType.M1960AV,
      enabled: true,
      params: {
        Level: 55,
        LowCut: 58,
        HighCut: 46,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 42,
        "62": 44,
        "125": 49,
        "250": 50,
        "500": 57,
        "1000": 63,
        "2000": 68,
        "4000": 61,
        "8000": 48,
        "16000": 44,
        Vol: 52,
      },
    },
    reverb: {
      type: ReverbType.Room,
      enabled: false,
      params: {
        Level: 50,
        Decay: 50,
        Tone: 50,
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
    type: "humbucker",
    tone: 10,
    position: "bridge",
  },
  slug: "crazy-train-guitar-intro",
  tabsUrl:
    "https://www.songsterr.com/a/wsa/ozzy-osbourne-crazy-train-tab-s61178",
  origin: {
    artist: ozzyOsborn,
    song: "Crazy Train",
    part: "Intro",
    imageUrl: "/images/cover/ozzy-osbourne/crazy-train.webp",
  },
};

export default preset;
