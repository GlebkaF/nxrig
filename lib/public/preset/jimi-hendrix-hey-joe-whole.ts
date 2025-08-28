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
import jimiHendrix from "lib/public/artist/jimi-hendrix";

const preset: Preset = {
  id: "hey-joe-whole-song",
  description:
    "Warm, slightly overdriven, dynamic, expressive tone with vintage character. Smooth highs, rounded low end, and a touch of ambient depth. Responsive to playing dynamics and volume knob changes, with subtle modulation and a roomy feel.",
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
      type: ModulationType.UVibe,
      enabled: true,
      params: {
        Speed: 38,
        Volume: 53,
        Intensity: 65,
        Mode: 30,
      },
    },
    effect: {
      type: EffectType.MuffFuzz,
      enabled: true,
      params: {
        Volume: 55,
        Sustain: 73,
        Tone: 62,
      },
    },
    amplifier: {
      type: AmplifierType.Plexi100,
      enabled: true,
      params: {
        Gain: 32,
        Master: 68,
        Bass: 46,
        Middle: 65,
        Treble: 60,
        Presence: 55,
      },
    },
    cabinet: {
      type: CabinetType.M1960AV,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 45,
        HighCut: 56,
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
        Level: 28,
        Decay: 40,
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
  slug: "hey-joe-whole-song",
  tabsUrl: "https://www.songsterr.com/a/wsa/jimi-hendrix-hey-joe-tab-s22556",
  origin: {
    artist: jimiHendrix,
    song: "Hey Joe",
    part: "Whole Song",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/73/Jimi_Hendrix_-_Hey_Joe.jpg",
  },
};

export default preset;
