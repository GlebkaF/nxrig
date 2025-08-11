import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

// Amp: {
//   types: {
//     "Deluxe Rvb": {
//       realName: "Fender Deluxe Reverb",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Bass Mate": {
//       realName: "Fender Bassman",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     Tweedy: {
//       realName: "Fender Tweed Deluxe",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Tone", unit: "%", min: 0, max: 100 },
//       },
//     },
//     Hiwire: {
//       realName: "Hiwatt DR103",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Cali Crunch": {
//       realName: "Mesa Boogie Mark I",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Class A15": {
//       realName: "Vox AC15",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Cut", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Class A30": {
//       realName: "Vox AC30",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Cut", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Plexi 100": {
//       realName: "Marshall JTM45 100W",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Plexi 45": {
//       realName: "Marshall JTM45 45W",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Brit 800": {
//       realName: "Marshall JCM800",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "1987 X 50": {
//       realName: "Marshall JCM1987X",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "SLO 100": {
//       realName: "Soldano SLO-100",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Fireman HBE": {
//       realName: "Friedman BE-100",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Dual Rect": {
//       realName: "Mesa Boogie Dual Rectifier",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Die VH4": {
//       realName: "Diezel VH4",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Mr. Z38": {
//       realName: "Dr. Z MAZ 38",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Cut", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Super Rvb": {
//       realName: "Fender Super Reverb",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Bright", unit: "bool", min: 0, max: 100 },
//       },
//     },
//     Budda: {
//       realName: "Budda Superdrive",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Cut", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Brit Blues": {
//       realName: "Marshall Bluesbreaker",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Match D30": {
//       realName: "Matchless DC-30",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Cut", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Brit 2000": {
//       realName: "Marshall JCM2000",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Uber HiGain": {
//       realName: "Bogner Uberschall",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Presence", unit: "%", min: 0, max: 100 },
//       },
//     },
//     AGL: {
//       realName: "Aguilar Tone Hammer",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Mid Freq", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//       },
//     },
//     MLD: {
//       realName: "NUX Melvin Lee Davis Preamp",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Mid Freq", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Optima Air": {
//       realName: "NUX Optima Air",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//       },
//     },
//     Stageman: {
//       realName: "NUX Stageman AC-50",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Twin Reverb": {
//       realName: "Fender Twin Reverb",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Bright", unit: "bool", min: 0, max: 100 },
//       },
//     },
//     "Vibro King": {
//       realName: "Fender Vibro‑King",
//       params: {
//         AMP_Para1: { label: "Gain", unit: "%", min: 0, max: 100 },
//         AMP_Para2: { label: "Master", unit: "%", min: 0, max: 100 },
//         AMP_Para3: { label: "Bass", unit: "%", min: 0, max: 100 },
//         AMP_Para4: { label: "Middle", unit: "%", min: 0, max: 100 },
//         AMP_Para5: { label: "Treble", unit: "%", min: 0, max: 100 },
//         AMP_Para6: { label: "Bright", unit: "bool", min: 0, max: 100 },
//       },
//     },
//   },
// },

export enum AmplifierType {
  JazzClean = "Jazz Clean",
  DeluxeRvb = "Deluxe Rvb",
  BassMate = "Bass Mate",
  Tweedy = "Tweedy",
  Hiwire = "Hiwire",
  CaliCrunch = "Cali Crunch",
  ClassA15 = "Class A15",
  ClassA30 = "Class A30",
  Plexi100 = "Plexi 100",
  Plexi45 = "Plexi 45",
  Brit800 = "Brit 800",
  Amp1987X50 = "1987 X 50",
  Slo100 = "SLO 100",
  FiremanHbe = "Fireman HBE",
  DualRect = "Dual Rect",
  DieVh4 = "Die VH4",
  MrZ38 = "Mr. Z38",
  SuperRvb = "Super Rvb",
  Agl = "AGL",
  Mld = "MLD",
  OptimaAir = "Optima Air",
  Stageman = "Stageman",
  TwinReverb = "Twin Reverb",
  VibroKing = "Vibro King",
  Budda = "Budda",
  BritBlues = "Brit Blues",
  MatchD30 = "Match D30",
  Brit2000 = "Brit 2000",
  UberHiGain = "Uber HiGain",
}

const TYPES: Record<AmplifierType, number> = {
  [AmplifierType.JazzClean]: 1,
  [AmplifierType.DeluxeRvb]: 2,
  [AmplifierType.BassMate]: 3,
  [AmplifierType.Tweedy]: 4,
  [AmplifierType.Hiwire]: 6,
  [AmplifierType.CaliCrunch]: 7,
  [AmplifierType.ClassA15]: 8,
  [AmplifierType.ClassA30]: 9,
  [AmplifierType.Plexi100]: 10,
  [AmplifierType.Plexi45]: 11,
  [AmplifierType.Brit800]: 12,
  [AmplifierType.Amp1987X50]: 13,
  [AmplifierType.Slo100]: 14,
  [AmplifierType.FiremanHbe]: 15,
  [AmplifierType.DualRect]: 16,
  [AmplifierType.DieVh4]: 17,
  [AmplifierType.MrZ38]: 20,
  [AmplifierType.SuperRvb]: 21,
  [AmplifierType.Agl]: 26,
  [AmplifierType.Mld]: 27,
  [AmplifierType.OptimaAir]: 28,
  [AmplifierType.Stageman]: 29,
  [AmplifierType.TwinReverb]: 5,
  [AmplifierType.VibroKing]: 18,
  [AmplifierType.Budda]: 19,
  [AmplifierType.BritBlues]: 22,
  [AmplifierType.MatchD30]: 23,
  [AmplifierType.Brit2000]: 24,
  [AmplifierType.UberHiGain]: 25,
};

export type AmplifierParams = ChainItem<
  AmplifierType.JazzClean,
  "Gain" | "Master" | "Bass" | "Middle" | "Treble" | "Bright"
>;

export const amplifier: BlockConfig = {
  encoderHeadIndex: NuxMp3PresetIndex.Head_iAMP,
  types: [
    {
      label: AmplifierType.JazzClean,
      realName: "Jazz Clean",
      encodeType: TYPES[AmplifierType.JazzClean],
      params: [
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.AMP_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Master",
          encodeIndex: NuxMp3PresetIndex.AMP_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Bass",
          encodeIndex: NuxMp3PresetIndex.AMP_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Middle",
          encodeIndex: NuxMp3PresetIndex.AMP_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Treble",
          encodeIndex: NuxMp3PresetIndex.AMP_Para5,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Bright",
          encodeIndex: NuxMp3PresetIndex.AMP_Para6,
          // formatter: toggle
        },
      ],
    },
    // TODO: add other types
  ],
};
