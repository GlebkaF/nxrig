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
import enterShikari from "lib/public/artist/enter-shikari";

const preset: Preset = {
  id: "gen_meftp13j_wgpgnsr26",
  description:
    "Very percussive, tight, mid-gain distortion with pronounced attack and clarity. Dry, staccato, and articulate for rapid palm-muted rhythms. Bright top-end for cutting through the mix, but with enough body for fullness.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 55,
        Decay: 20,
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
      type: EffectType.DistOne,
      enabled: true,
      params: {
        Level: 58,
        Drive: 54,
        Tone: 68,
      },
    },
    amplifier: {
      type: AmplifierType.DualRect,
      enabled: true,
      params: {
        Gain: 42,
        Master: 60,
        Bass: 44,
        Middle: 61,
        Treble: 71,
        Presence: 68,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 53,
        LowCut: 60,
        HighCut: 68,
      },
    },
    eq: {
      type: EqType.SixBand,
      enabled: true,
      params: {
        "100": 40,
        "220": 45,
        "500": 50,
        "1200": 60,
        "2600": 65,
        "6400": 60,
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
  slug: "sorry-youre-not-a-winner-guitar-intro",
  origin: {
    artist: enterShikari,
    song: "Sorry You're Not A Winner",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/6e/Taketotheskies2.jpg",
  },
};

export default preset;
