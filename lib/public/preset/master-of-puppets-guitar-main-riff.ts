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

// Простой хелпер для проверки соответствия имени файла и slug

const preset: Preset = {
  id: "gen_meh65m2y_npavw2gjd",
  description:
    "Aggressive, tight, highly articulate, mid-scooped, palm-muted chug with lots of attack, saturated but not muddy, precise and powerful, with clear pick definition and minimal ambience.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 55,
        Decay: 35,
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
      type: EffectType.TScreamer,
      enabled: true,
      params: {
        Level: 70,
        Drive: 10,
        Tone: 70,
      },
    },
    amplifier: {
      type: AmplifierType.DualRect,
      enabled: true,
      params: {
        Gain: 80,
        Master: 60,
        Bass: 65,
        Middle: 25,
        Treble: 75,
        Presence: 70,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 60,
        LowCut: 40,
        HighCut: 55,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 70,
        "62": 75,
        "125": 65,
        "250": 55,
        "500": 30,
        "1000": 25,
        "2000": 30,
        "4000": 65,
        "8000": 70,
        "16000": 60,
        Vol: 50,
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
  slug: "master-of-puppets-guitar-main-riff",
  origin: {
    artist: metallica,
    song: "Master Of Puppets",
    part: "Main Riff",
    imageUrl: "/images/cover/metallica/master-of-puppets.webp",
  },
};

export default preset;
