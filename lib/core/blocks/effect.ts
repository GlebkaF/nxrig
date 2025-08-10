import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig } from "lib/core/interface";

// EFX: {
//   types: {
//     "RC Boost": {
//       realName: "RC Boost",
//       params: {
//         EFX_Para2: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//         EFX_Para1: { label: "Gain", unit: "%", min: 0, max: 100 }, // default: 35, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Bass", unit: "%", min: 0, max: 100 }, // default: 35, formatter: ValueFormatters.percentageMPPro
//         EFX_Para4: { label: "Treble", unit: "%", min: 0, max: 100 }, // default: 70, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "AC Boost": {
//       realName: "AC Boost",
//       params: {
//         EFX_Para2: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//         EFX_Para1: { label: "Gain", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Bass", unit: "%", min: 0, max: 100 }, // default: 35, formatter: ValueFormatters.percentageMPPro
//         EFX_Para4: { label: "Treble", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Dist One": {
//       realName: "Dist One",
//       params: {
//         EFX_Para1: { label: "Level", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Drive", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 55, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "T Screamer": {
//       realName: "T Screamer",
//       params: {
//         EFX_Para3: { label: "Level", unit: "%", min: 0, max: 100 }, // default: 55, formatter: ValueFormatters.percentageMPPro
//         EFX_Para1: { label: "Drive", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Blues Drive": {
//       realName: "Blues Drive",
//       params: {
//         EFX_Para1: { label: "Level", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Gain", unit: "%", min: 0, max: 100 }, // default: 65, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Morning Drive": {
//       realName: "Morning Drive",
//       params: {
//         EFX_Para1: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Drive", unit: "%", min: 0, max: 100 }, // default: 70, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 65, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Eat Dist": {
//       realName: "Eat Dist",
//       params: {
//         EFX_Para3: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//         EFX_Para1: { label: "Distortion", unit: "%", min: 0, max: 100 }, // default: 65, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Filter", unit: "%", min: 0, max: 100 }, // default: 70, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Red Dirt": {
//       realName: "Red Dirt",
//       params: {
//         EFX_Para3: { label: "Level", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         EFX_Para1: { label: "Drive", unit: "%", min: 0, max: 100 }, // default: 65, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     Crunch: {
//       realName: "Crunch",
//       params: {
//         EFX_Para1: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 25, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Gain", unit: "%", min: 0, max: 100 }, // default: 45, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Muff Fuzz": {
//       realName: "Muff Fuzz",
//       params: {
//         EFX_Para1: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Sustain", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     Katana: {
//       realName: "Katana",
//       params: {
//         EFX_Para2: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 45, formatter: ValueFormatters.percentageMPPro
//         EFX_Para1: { label: "Boost", unit: "%", min: 0, max: 100 }, // default: 0, formatter: ValueFormatters.boostModePro
//       },
//     },
//     "ST Singer": {
//       realName: "ST Singer",
//       params: {
//         EFX_Para1: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         EFX_Para2: { label: "Gain", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Filter", unit: "%", min: 0, max: 100 }, // default: 40, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Touch Wah": {
//       realName: "Touch Wah",
//       params: {
//         EFX_Para1: { label: "Type", unit: "%", min: 0, max: 100 }, // default: 1, formatter: ValueFormatters.touchWahFormatterLiteMk2
//         EFX_Para2: { label: "Wow", unit: "%", min: 0, max: 100 }, // default: 35, formatter: ValueFormatters.percentageMPPro
//         EFX_Para3: { label: "Sense", unit: "%", min: 0, max: 100 }, // default: 90, formatter: ValueFormatters.percentageMPPro
//         EFX_Para5: { label: "Level", unit: "%", min: 0, max: 100 }, // default: 100, formatter: ValueFormatters.percentageMPPro
//         EFX_Para4: { label: "Up/Down Switch", unit: "%", min: 0, max: 100 }, // default: 0, formatter: ValueFormatters.touchWahDirectionFormatterPro
//       },
//     },
//   },
// },

enum Type {
  DistortionPlus = "Distortion+",
  RCBoost = "RC Boost",
  ACBoost = "AC Boost",
  DistOne = "Dist One",
  TScreamer = "T Screamer",
  BluesDrive = "Blues Drive",
  MorningDrive = "Morning Drive",
  EatDist = "Eat Dist",
  RedDirt = "Red Dirt",
  Crunch = "Crunch",
  MuffFuzz = "Muff Fuzz",
  Katana = "Katana",
  STSinger = "ST Singer",
  TouchWah = "Touch Wah",
}

const TYPES: Record<Type, number> = {
  [Type.DistortionPlus]: 1,
  [Type.RCBoost]: 2,
  [Type.ACBoost]: 3,
  [Type.DistOne]: 4,
  [Type.TScreamer]: 5,
  [Type.BluesDrive]: 6,
  [Type.MorningDrive]: 7,
  [Type.EatDist]: 8,
  [Type.RedDirt]: 9,
  [Type.Crunch]: 10,
  [Type.MuffFuzz]: 11,
  [Type.Katana]: 12,
  [Type.STSinger]: 13,
  [Type.TouchWah]: 14,
};

export const effect: BlockConfig = {
  types: [
    {
      label: Type.DistortionPlus,
      realName: "Distortion+",
      encodeType: TYPES[Type.DistortionPlus],
      params: [
        {
          label: "Output",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Sensitivity",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    // TODO: add other types
  ],
};
