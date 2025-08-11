import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

export enum EffectType {
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

export type EffectParams = ChainItem<
  EffectType.DistortionPlus,
  "Output" | "Sensitivity"
>;

const TYPES: Record<EffectType, number> = {
  [EffectType.DistortionPlus]: 1,
  [EffectType.RCBoost]: 2,
  [EffectType.ACBoost]: 3,
  [EffectType.DistOne]: 4,
  [EffectType.TScreamer]: 5,
  [EffectType.BluesDrive]: 6,
  [EffectType.MorningDrive]: 7,
  [EffectType.EatDist]: 8,
  [EffectType.RedDirt]: 9,
  [EffectType.Crunch]: 10,
  [EffectType.MuffFuzz]: 11,
  [EffectType.Katana]: 12,
  [EffectType.STSinger]: 13,
  [EffectType.TouchWah]: 14,
};

export const effect: BlockConfig = {
  encoderHeadIndex: NuxMp3PresetIndex.Head_iEFX,
  types: [
    {
      label: EffectType.DistortionPlus,
      realName: "Distortion+",
      encodeType: TYPES[EffectType.DistortionPlus],
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

    {
      label: EffectType.MorningDrive,
      realName: "Morning Drive",
      encodeType: TYPES[EffectType.MorningDrive],
      params: [
        { label: "Volume", encodeIndex: NuxMp3PresetIndex.EFX_Para1 },
        { label: "Drive", encodeIndex: NuxMp3PresetIndex.EFX_Para2 },
        { label: "Tone", encodeIndex: NuxMp3PresetIndex.EFX_Para3 },
      ],
    },

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
    // TODO: add other types
  ],
};
