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
import limpBizkit from "lib/public/artist/limp-bizkit";

const preset: Preset = {
  id: "my-way-clean-guitar-intro",
  description:
    "Clean, glassy, and slightly compressed tone with a pronounced rhythmic delay. Moderate brightness, tight low end, and percussive attack. The delay effect creates a spacious, echoing texture that is central to the intro’s vibe.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
        "enabled": true,
        "params": {
          "Sensitivity": 50,
          "Decay": 40
        }
      },
      "compressor": {
        "type": CompressorType.KComp,
        "enabled": true,
        "params": {
          "Level": 52,
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
        "type": AmplifierType.JazzClean,
        "enabled": true,
        "params": {
          "Gain": 42,
          "Master": 56,
          "Bass": 46,
          "Middle": 54,
          "Treble": 59,
          "Bright": 60
        }
      },
      "cabinet": {
        "type": CabinetType.JZ120,
        "enabled": true,
        "params": {
          "Level": 52,
          "LowCut": 55,
          "HighCut": 52
        }
      },
      "eq": {
        "type": EqType.SixBand,
        "enabled": true,
        "params": {
          "100": 44,
          "220": 47,
          "500": 50,
          "1200": 56,
          "2600": 60,
          "6400": 54
        }
      },
      "reverb": {
        "type": ReverbType.Plate,
        "enabled": true,
        "params": {
          "Level": 40,
          "Decay": 38
        }
      },
      "delay": {
        "type": DelayType.DigitalDelay,
        "enabled": true,
        "params": {
          "E.Level": 58,
          "Feedback": 45,
          "Time": 54
        }
      }
    },
  pickup: {
    type: "single",
    tone: 8,
    position: "neck",
  },
  slug: "my-way-clean-guitar-intro",
  tabsUrl: "https://www.songsterr.com/a/wsa/limp-bizkit-my-way-tab-s11567",
  origin: {
    artist: limpBizkit,
    song: "My Way",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/b1/My_Way_%28Limp_Bizkit_song%29_cover_art.jpg",
  },
};

export default preset;
