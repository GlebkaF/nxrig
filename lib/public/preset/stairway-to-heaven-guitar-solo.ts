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
import ledZeppelin from "lib/public/artist/led-zeppelin";

const preset: Preset = {
  id: "gen_meh6yh0e_mpx8o7n8n",
  description:
    "Smooth, singing lead tone with expressive sustain, moderate warmth, clear articulation, and subtle bite without harshness. The sound is dynamic, allowing for expressive playing and note definition, with a touch of ambience.",
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
        Level: 54,
        Sustain: 44,
        Clipping: 36,
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
        Level: 58,
        Drive: 32,
        Tone: 42,
      },
    },
    amplifier: {
      type: AmplifierType.Plexi100,
      enabled: true,
      params: {
        Gain: 61,
        Master: 57,
        Bass: 46,
        Middle: 65,
        Treble: 45,
        Presence: 53,
      },
    },
    cabinet: {
      type: CabinetType.M1960AX,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 50,
        HighCut: 44,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 48,
        "62": 48,
        "125": 50,
        "250": 52,
        "500": 58,
        "1000": 62,
        "2000": 60,
        "4000": 55,
        "8000": 45,
        "16000": 41,
        Vol: 51,
      },
    },
    reverb: {
      type: ReverbType.Plate,
      enabled: true,
      params: {
        Level: 32,
        Decay: 38,
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
    tone: 7,
    position: "neck",
  },
  slug: "stairway-to-heaven-guitar-solo",
  origin: {
    artist: ledZeppelin,
    song: "Stairway to Heaven",
    part: "Solo",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Stairway_to_Heaven_by_Led_Zeppelin_US_promotional_single.png",
  },
  tabsUrl:
    "https://www.songsterr.com/a/wsa/led-zeppelin-stairway-to-heaven-tab-s27t4",
};

export default preset;
