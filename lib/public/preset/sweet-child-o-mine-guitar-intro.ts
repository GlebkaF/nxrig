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
import gunsAndRoses from "lib/public/artist/guns-and-roses";

const preset: Preset = {
  id: "gen_meh7c8l4_gf67b392l",
  title: "Guns and roses sweet child o mine intro\n",
  description:
    "Bright, jangly, articulate, with a singing sustain and mild overdrive. Clear note separation, chimey highs, and a slightly scooped midrange. Not overly aggressive, but with enough bite to cut through the mix.",
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
        Level: 55,
        Sustain: 40,
        Clipping: 15,
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
        Level: 55,
        Drive: 18,
        Tone: 65,
      },
    },
    amplifier: {
      type: AmplifierType.Brit800,
      enabled: true,
      params: {
        Gain: 27,
        Master: 62,
        Bass: 44,
        Middle: 38,
        Treble: 67,
        Presence: 60,
      },
    },
    cabinet: {
      type: CabinetType.M1960AV,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 58,
        HighCut: 65,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 45,
        "62": 48,
        "125": 48,
        "250": 47,
        "500": 41,
        "1000": 37,
        "2000": 52,
        "4000": 62,
        "8000": 67,
        "16000": 65,
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
  slug: "sweet-child-o-mine-guitar-intro",
  origin: {
    artist: gunsAndRoses,
    song: "Sweet Child o Mine",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg",
  },
};

export default preset;
