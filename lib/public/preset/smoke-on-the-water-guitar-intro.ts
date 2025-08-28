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
import deepPurple from "lib/public/artist/deep-purple";

const preset: Preset = {
  id: "smoke-on-the-water-guitar-intro",
  description:
    "Raw, mid-focused, crunchy tone with moderate gain. The sound is punchy and slightly gritty, with good note separation, minimal effects, and a vintage flavor. The attack is clear but not overly sharp, with moderate sustain and a touch of warmth.",
    "chain": {
      "noisegate": {
        "type": NoiseGateType.NoiseGate,
        "enabled": false,
        "params": {
          "Sensitivity": 50,
          "Decay": 50
        }
      },
      "compressor": {
        "type": CompressorType.KComp,
        "enabled": false,
        "params": {
          "Level": 50,
          "Sustain": 50,
          "Clipping": 50
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
        "type": EffectType.TScreamer,
        "enabled": true,
        "params": {
          "Level": 55,
          "Drive": 32,
          "Tone": 48
        }
      },
      "amplifier": {
        "type": AmplifierType.Plexi100,
        "enabled": true,
        "params": {
          "Gain": 58,
          "Master": 62,
          "Bass": 38,
          "Middle": 64,
          "Treble": 58,
          "Presence": 54
        }
      },
      "cabinet": {
        "type": CabinetType.M1960AV,
        "enabled": true,
        "params": {
          "Level": 55,
          "LowCut": 60,
          "HighCut": 45
        }
      },
      "eq": {
        "type": EqType.SixBand,
        "enabled": false,
        "params": {
          "100": 46,
          "220": 48,
          "500": 50,
          "1200": 52,
          "2600": 52,
          "6400": 54
        }
      },
      "reverb": {
        "type": ReverbType.Spring,
        "enabled": true,
        "params": {
          "Level": 24,
          "Decay": 34
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
    type: "humbucker",
    tone: 7,
    position: "bridge",
  },
  slug: "smoke-on-the-water-guitar-intro",
  tabsUrl:
    "https://www.songsterr.com/a/wsa/deep-purple-smoke-on-the-water-tab-s329",
  origin: {
    artist: deepPurple,
    song: "Smoke On The Water",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/ae/Smoke_on_the_Water_cover.jpg",
  },
};

export default preset;
