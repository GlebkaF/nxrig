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
  id: "pantera-floods-guitar-solo",
  description:
    "Expressive, singing lead tone with plenty of sustain and clarity. The sound is thick and saturated with smooth distortion, yet dynamic enough to respond to pick attack. There is pronounced midrange presence for note definition, a touch of warmth, and a wide, ambient spatial effect from delay and reverb. The tone is fluid for legato and bends, with controlled feedback and minimal noise.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 47,
        Decay: 58,
      },
    },
    compressor: {
      type: CompressorType.KComp,
      enabled: true,
      params: {
        Level: 52,
        Sustain: 62,
        Clipping: 48,
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
      type: EffectType.TScreamer,
      enabled: true,
      params: {
        Level: 71,
        Drive: 32,
        Tone: 64,
      },
    },
    amplifier: {
      type: AmplifierType.DualRect,
      enabled: true,
      params: {
        Gain: 86,
        Master: 58,
        Bass: 51,
        Middle: 66,
        Treble: 46,
        Presence: 43,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 54,
        LowCut: 44,
        HighCut: 42,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 43,
        "62": 47,
        "125": 51,
        "250": 54,
        "500": 62,
        "1000": 69,
        "2000": 72,
        "4000": 65,
        "8000": 46,
        "16000": 41,
        Vol: 53,
      },
    },
    reverb: {
      type: ReverbType.Plate,
      enabled: true,
      params: {
        Level: 57,
        Decay: 66,
      },
    },
    delay: {
      type: DelayType.AnalogDelay,
      enabled: true,
      params: {
        Intensity: 40,
        Rate: 39,
        Echo: 59,
      },
    },
  },
  pickup: {
    type: "humbucker",
    tone: 10,
    position: "bridge",
  },
  slug: "pantera-floods-guitar-solo",
  tabsUrl: "https://www.songsterr.com/a/wsa/pantera-floods-tab-s84836",
  origin: {
    artist: pantera,
    song: "Floods",
    part: "Solo",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/ru/d/dc/PANTERA_%E2%80%94_TGST.jpg",
  },
};

export default preset;
