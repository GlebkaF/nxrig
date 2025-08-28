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
  import redHotChiliPeppers from "lib/public/artist/red-hot-chili-peppers";

const preset: Preset = {
  id: "scar-tissue-guitar-intro",
  description:
    "Clean, chimey, slightly compressed tone with mild warmth and clarity. Subtle sparkle on top, moderate sustain, and a natural dynamic response. The sound is intimate and expressive, with delicate attack and no harshness.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
        "enabled": false,
        "params": {
          "Sensitivity": 50,
          "Decay": 50
        }
      },
      "compressor": {
        "type": CompressorType.KComp,
        "enabled": true,
        "params": {
          "Level": 54,
          "Sustain": 38,
          "Clipping": 45
        }
      },
      "modulation": {
        "type": ModulationType.CE1,
        "enabled": false,
        "params": {
          "Rate": 50,
          "Depth": 50,
          "Intensity": 50
        }
      },
      "effect": {
        "type": EffectType.DistortionPlus,
        "enabled": false,
        "params": {
          "Output": 50,
          "Sensitivity": 50
        }
      },
      "amplifier": {
        "type": AmplifierType.TwinReverb,
        "enabled": true,
        "params": {
          "Gain": 42,
          "Master": 54,
          "Bass": 48,
          "Middle": 42,
          "Treble": 63,
          "Bright": 60
        }
      },
      "cabinet": {
        "type": CabinetType.TR212,
        "enabled": true,
        "params": {
          "Level": 52,
          "LowCut": 54,
          "HighCut": 57
        }
      },
      "eq": {
        "type": EqType.SixBand,
        "enabled": false,
        "params": {
          "100": 50,
          "220": 50,
          "500": 50,
          "1200": 50,
          "2600": 50,
          "6400": 50
        }
      },
      "reverb": {
        "type": ReverbType.Spring,
        "enabled": true,
        "params": {
          "Level": 59,
          "Decay": 44
        }
      },
      "delay": {
        "type": DelayType.AnalogDelay,
        "enabled": false,
        "params": {
          "Intensity": 50,
          "Rate": 50,
          "Echo": 50
        }
      }
    },
  pickup: {
    type: "single",
    tone: 7,
    position: "neck",
  },
  slug: "scar-tissue-guitar-intro",
  tabsUrl: "https://www.songsterr.com/a/wsa/red-hot-chili-peppers-scar-tissue-tab-s49",
  origin: {
    artist: redHotChiliPeppers,
    song: "Scar Tissue",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/96/Scartissue.jpg",
  },
};

export default preset;
