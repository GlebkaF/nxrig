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
import lynyrdSkynyrd from "lib/public/artist/lynyrd-skynyrd";

const preset: Preset = {
  id: "gen_menwg6dy_bc27mjc3s",
  description:
    "Bright, jangly, and clean with a touch of warmth. The tone has a crisp attack, clear note separation, and slight chime. There’s minimal distortion—just enough edge for presence—while retaining clarity and dynamics.",
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
        Sustain: 38,
        Clipping: 25,
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
      type: EffectType.BluesDrive,
      enabled: true,
      params: {
        Level: 51,
        Gain: 23,
        Tone: 65,
      },
    },
    amplifier: {
      type: AmplifierType.TwinReverb,
      enabled: true,
      params: {
        Gain: 44,
        Master: 58,
        Bass: 42,
        Middle: 61,
        Treble: 69,
        Bright: 65,
      },
    },
    cabinet: {
      type: CabinetType.TR212,
      enabled: true,
      params: {
        Level: 52,
        LowCut: 43,
        HighCut: 66,
      },
    },
    eq: {
      type: EqType.SixBand,
      enabled: false,
      params: {
        "100": 50,
        "220": 50,
        "500": 50,
        "1200": 50,
        "2600": 50,
        "6400": 50,
      },
    },
    reverb: {
      type: ReverbType.Spring,
      enabled: true,
      params: {
        Level: 38,
        Decay: 41,
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
    type: "single",
    tone: 8,
    position: "bridge",
  },
  slug: "sweet-home-alabama-guitar-intro",
  origin: {
    artist: lynyrdSkynyrd,
    song: "Sweet Home Alabama",
    part: "Intro",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/e4/Skynyrd-Sweet-Home-Alabama.jpg",
  },
  tabsUrl:
    "https://www.songsterr.com/a/wsa/lynyrd-skynyrd-sweet-home-alabama-tab-s58984",
};

export default preset;
