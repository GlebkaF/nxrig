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
import acDc from "lib/public/artist/ac-dc";

const preset: Preset = {
  id: "gen_meh81zzg_llzmwnnp5",
  description:
    "Punchy, mid-focused, crunchy rhythm tone with strong attack and clarity; moderate gain for articulation; bright but not harsh, dynamic and responsive to picking; tight low end with ringing chords.",
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
      type: EffectType.RCBoost,
      enabled: true,
      params: {
        Volume: 55,
        Gain: 28,
        Bass: 46,
        Treble: 58,
      },
    },
    amplifier: {
      type: AmplifierType.Plexi100,
      enabled: true,
      params: {
        Gain: 54,
        Master: 68,
        Bass: 44,
        Middle: 61,
        Treble: 57,
        Presence: 53,
      },
    },
    cabinet: {
      type: CabinetType.M1960AX,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 54,
        HighCut: 58,
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
  slug: "back-in-black-guitar-intro",
  tabsUrl: "https://www.songsterr.com/a/wsa/ac-dc-back-in-black-tab-s1024",
  origin: {
    artist: acDc,
    song: "Back in Black",
    part: "Intro",
    imageUrl: "/images/cover/acdc/back-in-black.png",
  },
};

export default preset;
