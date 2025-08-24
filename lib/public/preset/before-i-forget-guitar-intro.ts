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
import slipknot from "lib/public/artist/slipknot";

const preset: Preset = {
  id: "gen_meftu2kp_9tm4qgcd9",
  title: "Slipknot Before I Forget Intro\n",
  description:
    "Aggressive, tight, percussive, mid-heavy with pronounced attack, thick low end, and controlled high frequencies. Slightly scooped mids for clarity, but enough presence to cut through. High gain, minimal noise, dry and direct with little ambience.",
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
        Drive: 20,
        Tone: 60,
      },
    },
    amplifier: {
      type: AmplifierType.DualRect,
      enabled: true,
      params: {
        Gain: 85,
        Master: 60,
        Bass: 65,
        Middle: 40,
        Treble: 58,
        Presence: 52,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 55,
        LowCut: 60,
        HighCut: 45,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 48,
        "62": 46,
        "125": 48,
        "250": 44,
        "500": 42,
        "1000": 38,
        "2000": 48,
        "4000": 53,
        "8000": 46,
        "16000": 40,
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
  slug: "before-i-forget-guitar-intro",
  origin: {
    artist: slipknot,
    song: "Before I Forget",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/e9/Slipknot_-_Vol._3-_%28The_Subliminal_Verses%29.jpg",
  },
};

export default preset;
