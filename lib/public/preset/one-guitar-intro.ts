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
  id: "one-guitar-intro",
  description:
    "Crystal clear, glassy clean sound with a shimmering high end, pronounced articulation, and subtle spatial depth. The tone is dynamic with minimal distortion, emphasizing note separation and clarity.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 48,
        Decay: 40,
      },
    },
    compressor: {
      type: CompressorType.KComp,
      enabled: true,
      params: {
        Level: 52,
        Sustain: 38,
        Clipping: 45,
      },
    },
    modulation: {
      type: ModulationType.CE2,
      enabled: true,
      params: {
        Rate: 34,
        Depth: 26,
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
      type: AmplifierType.JazzClean,
      enabled: true,
      params: {
        Gain: 40,
        Master: 60,
        Bass: 44,
        Middle: 42,
        Treble: 67,
        Bright: 63,
      },
    },
    cabinet: {
      type: CabinetType.JZ120,
      enabled: true,
      params: {
        Level: 54,
        LowCut: 60,
        HighCut: 65,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 38,
        "62": 40,
        "125": 44,
        "250": 46,
        "500": 42,
        "1000": 46,
        "2000": 56,
        "4000": 62,
        "8000": 67,
        "16000": 70,
        Vol: 50,
      },
    },
    reverb: {
      type: ReverbType.Plate,
      enabled: true,
      params: {
        Level: 40,
        Decay: 62,
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
    tone: 8,
    position: "neck",
  },
  slug: "one-guitar-intro",
  tabsUrl: "https://www.songsterr.com/a/wsa/metallica-one-tab-s444t4",
  origin: {
    artist: metallica,
    song: "One",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/fb/Metallica_-_One_cover.jpg",
  },
};

export default preset;
