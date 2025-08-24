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
import bulletForMyValentine from "lib/public/artist/bullet-for-my-valentine";
const preset: Preset = {
  id: "gen_meftgp5v_1uj3ojci1",
  description:
    "Aggressive, high-gain, tight low end, percussive attack, moderately scooped mids, bright but controlled highs, clear note separation, substantial sustain, minimal noise.",
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
      type: CompressorType.StudioComp,
      enabled: true,
      params: {
        Gain: 48,
        Threshold: 42,
        Ratio: 35,
        Release: 30,
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
        Level: 68,
        Drive: 15,
        Tone: 68,
      },
    },
    amplifier: {
      type: AmplifierType.DualRect,
      enabled: true,
      params: {
        Gain: 80,
        Master: 60,
        Bass: 55,
        Middle: 38,
        Treble: 68,
        Presence: 65,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 55,
        LowCut: 62,
        HighCut: 58,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 38,
        "62": 44,
        "125": 46,
        "250": 48,
        "500": 40,
        "1000": 42,
        "2000": 48,
        "4000": 54,
        "8000": 53,
        "16000": 48,
        Vol: 53,
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
  slug: "waking-the-demon-guitar-main-riff",
  origin: {
    artist: bulletForMyValentine,
    song: "Waking the Demon",
    part: "Main Riff",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/25/Bullet_for_My_Valentine_-_Waking_The_Demon.jpg",
  },
};

export default preset;
