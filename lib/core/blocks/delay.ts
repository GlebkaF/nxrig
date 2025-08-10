import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";
// Delay: {
//   types: {
//     "Digital Delay": {
//       params: {
//         DLY_Para1: { label: "E.Level", unit: "%", min: 0, max: 100 },
//         DLY_Para2: { label: "F.Back", unit: "%", min: 0, max: 100 },
//         DLY_Para3: { label: "D.Time", unit: "ms", min: 61, max: 752 },
//       },
//     },

//     "Mod Delay": {
//       params: {
//         DLY_Para2: { label: "Level", unit: "%", min: 0, max: 100 },
//         DLY_Para1: { label: "Time", unit: "ms", min: 61, max: 752 },
//         DLY_Para4: { label: "Repeat", unit: "%", min: 0, max: 100 },
//         DLY_Para3: { label: "Mod", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Tape Echo": {
//       params: {
//         DLY_Para2: { label: "Level", unit: "%", min: 0, max: 100 },
//         DLY_Para1: { label: "Time", unit: "ms", min: 61, max: 752 },
//         DLY_Para3: { label: "Repeat", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Pan Delay": {
//       params: {
//         DLY_Para3: { label: "Level", unit: "%", min: 0, max: 100 },
//         DLY_Para1: { label: "Time", unit: "ms", min: 61, max: 752 },
//         DLY_Para2: { label: "Repeat", unit: "%", min: 0, max: 100 },
//       },
//     },
//     "Phi Delay": {
//       params: {
//         DLY_Para1: { label: "Time", unit: "ms", min: 61, max: 752 },
//         DLY_Para2: { label: "Repeat", unit: "%", min: 0, max: 100 },
//         DLY_Para3: { label: "Mix", unit: "%", min: 0, max: 100 },
//       },
//     },
//   },
// },

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

export type DelayParams = ChainItem<
  DelayType.AnalogDelay,
  "Intensity" | "Rate" | "Echo"
>;

export const delay: BlockConfig = {
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
          // formatter: bmp (от 1489bmp до 150bmp)
        },
        {
          label: "Echo",
          encodeIndex: NuxMp3PresetIndex.DLY_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    // TODO: add other types
  ],
};
