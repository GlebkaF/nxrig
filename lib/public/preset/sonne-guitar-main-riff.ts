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
import rammstein from "lib/public/artist/rammstein";

const preset: Preset = {
  id: "gen_mefrrfkk_w8x18ppjc",
  title: "Sonne Rammstein Rhythm Guitar Whole song ",
  description:
    "Heavy, tight, percussive, and aggressive with a thick midrange, pronounced low end, and a slight high-end bite. The tone is focused and modern, cutting through the mix but not overly bright. Palm-muted chugs are punchy and articulate, with minimal noise and maximum clarity.",
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
        Level: 55,
        Drive: 20,
        Tone: 60,
      },
    },
    amplifier: {
      type: AmplifierType.DieVh4,
      enabled: true,
      params: {
        Gain: 75,
        Master: 60,
        Bass: 65,
        Middle: 70,
        Treble: 45,
        Presence: 50,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 55,
        LowCut: 40,
        HighCut: 40,
      },
    },
    eq: {
      type: EqType.SixBand,
      enabled: true,
      params: {
        "100": 40,
        "220": 45,
        "500": 60,
        "1200": 65,
        "2600": 45,
        "6400": 35,
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
  slug: "sonne-guitar-main-riff",
  origin: {
    artist: rammstein,
    song: "Sonne",
    part: "Main Riff",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/41/Sonnesingle.jpg",
  },
};

export default preset;
