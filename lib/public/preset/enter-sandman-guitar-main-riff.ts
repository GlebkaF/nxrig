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

const preset: Preset = {
  id: "gen_meh7i6j2_8cr4dyzia",
  description:
    "Punchy, aggressive, tight palm-muted chugs with pronounced midrange, moderate high-end clarity, and strong low-end presence. The tone is saturated but not overly compressed, with percussive attack and moderate sustain.",
  chain: {
    noisegate: {
      type: NoiseGateType.NoiseGate,
      enabled: true,
      params: {
        Sensitivity: 50,
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
        Drive: 25,
        Tone: 60,
      },
    },
    amplifier: {
      type: AmplifierType.Slo100,
      enabled: true,
      params: {
        Gain: 70,
        Master: 60,
        Bass: 65,
        Middle: 40,
        Treble: 65,
        Presence: 60,
      },
    },
    cabinet: {
      type: CabinetType.RECT412,
      enabled: true,
      params: {
        Level: 55,
        LowCut: 40,
        HighCut: 60,
      },
    },
    eq: {
      type: EqType.TenBand,
      enabled: true,
      params: {
        "31": 54,
        "62": 56,
        "125": 54,
        "250": 47,
        "500": 44,
        "1000": 46,
        "2000": 52,
        "4000": 58,
        "8000": 62,
        "16000": 59,
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
  pickup: {
    type: "humbucker",
    tone: 10,
    position: "bridge",
  },
  slug: "enter-sandman-guitar-main-riff",
  tabsUrl: "https://www.songsterr.com/a/wsa/metallica-enter-sandman-tab-s19",
  origin: {
    artist: metallica,
    song: "Enter Sandman",
    part: "Main Riff",
    imageUrl: "/images/cover/metallica/the-black-album.jpg",
  },
};

export default preset;
