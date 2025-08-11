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
    {
      label: EffectType.RCBoost,
      realName: "RC Boost",
      encodeType: TYPES[EffectType.RCBoost],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Bass",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Treble",
          encodeIndex: NuxMp3PresetIndex.EFX_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.ACBoost,
      realName: "AC Boost",
      encodeType: TYPES[EffectType.ACBoost],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Bass",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Treble",
          encodeIndex: NuxMp3PresetIndex.EFX_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.DistOne,
      realName: "Dist One",
      encodeType: TYPES[EffectType.DistOne],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Drive",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.TScreamer,
      realName: "T Screamer",
      encodeType: TYPES[EffectType.TScreamer],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Drive",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.BluesDrive,
      realName: "Blues Drive",
      encodeType: TYPES[EffectType.BluesDrive],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
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
    {
      label: EffectType.EatDist,
      realName: "Eat Dist",
      encodeType: TYPES[EffectType.EatDist],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Distortion",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Filter",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.RedDirt,
      realName: "Red Dirt",
      encodeType: TYPES[EffectType.RedDirt],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Drive",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.Crunch,
      realName: "Crunch",
      encodeType: TYPES[EffectType.Crunch],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.MuffFuzz,
      realName: "Muff Fuzz",
      encodeType: TYPES[EffectType.MuffFuzz],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Sustain",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.Katana,
      realName: "Katana",
      encodeType: TYPES[EffectType.Katana],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Boost",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // on off
          // formatter: ValueFormatters.boostModePro
        },
      ],
    },
    {
      label: EffectType.STSinger,
      realName: "ST Singer",
      encodeType: TYPES[EffectType.STSinger],
      params: [
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Filter",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: EffectType.TouchWah,
      realName: "Touch Wah",
      encodeType: TYPES[EffectType.TouchWah],
      params: [
        {
          label: "Type",
          encodeIndex: NuxMp3PresetIndex.EFX_Para1,
          // cry VX Full Talk
          // formatter: ValueFormatters.touchWahFormatterLiteMk2
        },
        {
          label: "Wow",
          encodeIndex: NuxMp3PresetIndex.EFX_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Sense",
          encodeIndex: NuxMp3PresetIndex.EFX_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.EFX_Para5,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Up/Down Switch",
          encodeIndex: NuxMp3PresetIndex.EFX_Para4,
          // down up
          // formatter: ValueFormatters.touchWahDirectionFormatterPro
        },
      ],
    },
  ],
};
