import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

export enum DelayType {
  DigitalDelay = "Digital Delay",
  AnalogDelay = "Analog Delay",
  ModDelay = "Mod Delay",
  TapeEcho = "Tape Echo",
  PanDelay = "Pan Delay",
  PhiDelay = "Phi Delay",
}

const TYPES: Record<DelayType, number> = {
  [DelayType.AnalogDelay]: 1,
  [DelayType.DigitalDelay]: 2,
  [DelayType.ModDelay]: 3,
  [DelayType.TapeEcho]: 4,
  [DelayType.PanDelay]: 5,
  [DelayType.PhiDelay]: 6,
};

export type DelayParams = 
  | ChainItem<DelayType.AnalogDelay, "Intensity" | "Rate" | "Echo">
  | ChainItem<DelayType.DigitalDelay, "E.Level" | "Feedback" | "Time">
  | ChainItem<DelayType.ModDelay, "Level" | "Time" | "Repeat" | "Mod">
  | ChainItem<DelayType.TapeEcho, "Level" | "Time" | "Repeat">
  | ChainItem<DelayType.PanDelay, "Level" | "Time" | "Repeat">
  | ChainItem<DelayType.PhiDelay, "Time" | "Repeat" | "Mix">;

export const delay: BlockConfig = {
  encoderHeadIndex: NuxMp3PresetIndex.Head_iDLY,
  types: [
    {
      label: DelayType.AnalogDelay,
      realName: "Analog Delay",
      encodeType: TYPES[DelayType.AnalogDelay],
      params: [
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.DLY_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.DLY_Para1,
          // formatter: bmp (от 1490bmp до 149bmp) - здесь и дальше границы не включаются
        },
        {
          label: "Echo",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: DelayType.DigitalDelay,
      realName: "Digital Delay",
      encodeType: TYPES[DelayType.DigitalDelay],
      params: [
        {
          label: "E.Level",
          encodeIndex: NuxMp3PresetIndex.DLY_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Feedback",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Time",
          encodeIndex: NuxMp3PresetIndex.DLY_Para3,
          // formatter: bmp (от 753bmp до 60bmp)
        },
      ],
    },

    {
      label: DelayType.ModDelay,
      realName: "Modulation Delay",
      encodeType: TYPES[DelayType.ModDelay],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Time",
          encodeIndex: NuxMp3PresetIndex.DLY_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Repeat",
          encodeIndex: NuxMp3PresetIndex.DLY_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Mod",
          encodeIndex: NuxMp3PresetIndex.DLY_Para3,
          // formatter: bmp (от 3288bmp до 50bmp)
        },
      ],
    },

    {
      label: DelayType.TapeEcho,
      realName: "Tape Echo",
      encodeType: TYPES[DelayType.TapeEcho],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Time",
          encodeIndex: NuxMp3PresetIndex.DLY_Para1,
          // formatter: bmp (от 1126bmp до 110bmp)
        },
        {
          label: "Repeat",
          encodeIndex: NuxMp3PresetIndex.DLY_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },

    {
      label: DelayType.PanDelay,
      realName: "Pan Delay",
      encodeType: TYPES[DelayType.PanDelay],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.DLY_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Time",
          encodeIndex: NuxMp3PresetIndex.DLY_Para1,
          // formatter: bmp (от 753bmp до 60bmp)
        },
        {
          label: "Repeat",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: DelayType.PhiDelay,
      realName: "Phi Delay",
      encodeType: TYPES[DelayType.PhiDelay],
      params: [
        {
          label: "Time",
          encodeIndex: NuxMp3PresetIndex.DLY_Para1,
          // formatter: bmp (от 753bmp до 60bmp)
        },
        {
          label: "Repeat",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Mix",
          encodeIndex: NuxMp3PresetIndex.DLY_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
  ],
};
