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
  id: "pantera-floods-outro-solo",
  description:
    "Extremely expressive lead tone with rich sustain, strong midrange presence, singing quality, and smooth high end. The tone is thick yet articulate, with fluid legato and pinch harmonics, enhanced by ambient effects and a touch of stereo width.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 50,
        Decay: 60,
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
      type: ModulationType.STChorus,
      enabled: true,
      params: {
        Rate: 28,
        Width: 65,
        Intensity: 42,
      },
    },
    effect: {
      type: EffectType.TScreamer,
      enabled: true,
      params: {
        Level: 68,
        Drive: 22,
        Tone: 46,
      },
    },
    amplifier: {
      type: AmplifierType.UberHiGain,
      enabled: true,
      params: {
        Gain: 82,
        Master: 54,
        Bass: 38,
        Middle: 73,
        Treble: 57,
        Presence: 53,
      },
    },
    cabinet: {
      type: CabinetType.UBER412,
      enabled: true,
      params: {
        Level: 55,
        LowCut: 62,
        HighCut: 43,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 40,
        "62": 44,
        "125": 48,
        "250": 48,
        "500": 55,
        "1000": 64,
        "2000": 64,
        "4000": 59,
        "8000": 48,
        "16000": 41,
        Vol: 53,
      },
    },
    reverb: {
      type: ReverbType.Plate,
      enabled: true,
      params: {
        Level: 38,
        Decay: 62,
      },
    },
    delay: {
      type: DelayType.DigitalDelay,
      enabled: true,
      params: {
        "E.Level": 34,
        Feedback: 38,
        Time: 56,
      },
    },
  },
  pickup: {
    type: "humbucker",
    tone: 6,
    position: "bridge",
  },
  slug: "pantera-floods-outro-solo",
  tabsUrl: "https://www.songsterr.com/a/wsa/pantera-floods-tab-s84836t4",
  origin: {
    artist: pantera,
    song: "Floods",
    part: "Outro Solo",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/ru/d/dc/PANTERA_%E2%80%94_TGST.jpg",
  },
};

export default preset;
