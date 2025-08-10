import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

// Mod: {
//   types: {
//     "CE-2": {
//       realName: "CE-2",
//       params: {
//         MOD_Para1: { label: "Rate", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Depth", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "ST Chorus": {
//       realName: "ST Chorus",
//       params: {
//         MOD_Para3: { label: "Rate", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Width", unit: "%", min: 0, max: 100 }, // default: 36, formatter: ValueFormatters.percentageMPPro
//         MOD_Para1: { label: "Intensity", unit: "%", min: 0, max: 100 }, // default: 74, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     Vibrato: {
//       realName: "Vibrato",
//       params: {
//         MOD_Para1: { label: "Rate", unit: "%", min: 0, max: 100 }, // default: 56, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Depth", unit: "%", min: 0, max: 100 }, // default: 68, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     Detune: {
//       realName: "Detune",
//       params: {
//         MOD_Para1: { label: "Shift-L", unit: "%", min: 0, max: 100 }, // default: 54, formatter: ValueFormatters.percentageMPPro
//         MOD_Para3: { label: "Shift-R", unit: "%", min: 0, max: 100 }, // default: 0, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Mix", unit: "%", min: 0, max: 100 }, // default: 80, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     Flanger: {
//       realName: "Flanger",
//       params: {
//         MOD_Para2: { label: "Rate", unit: "%", min: 0, max: 100 }, // default: 59, formatter: ValueFormatters.percentageMPPro
//         MOD_Para3: { label: "Width", unit: "%", min: 0, max: 100 }, // default: 63, formatter: ValueFormatters.percentageMPPro
//         MOD_Para1: { label: "Level", unit: "%", min: 0, max: 100 }, // default: 59, formatter: ValueFormatters.percentageMPPro
//         MOD_Para4: { label: "Feedback", unit: "%", min: 0, max: 100 }, // default: 63, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Phase 90": {
//       realName: "Phase 90",
//       params: {
//         MOD_Para1: { label: "Speed", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Phase 100": {
//       realName: "Phase 100",
//       params: {
//         MOD_Para2: { label: "Speed", unit: "%", min: 0, max: 100 }, // default: 39, formatter: ValueFormatters.percentageMPPro
//         MOD_Para1: { label: "Intensity", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "S.C.F.": {
//       realName: "S.C.F.",
//       params: {
//         MOD_Para1: { label: "Speed", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Width", unit: "%", min: 0, max: 100 }, // default: 70, formatter: ValueFormatters.percentageMPPro
//         MOD_Para4: { label: "Intensity", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//         MOD_Para3: { label: "Mode", unit: "%", min: 0, max: 100 }, // default: 1, formatter: ValueFormatters.scfMode
//       },
//     },
//     "U-Vibe": {
//       realName: "U-Vibe",
//       params: {
//         MOD_Para1: { label: "Speed", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Volume", unit: "%", min: 0, max: 100 }, // default: 80, formatter: ValueFormatters.percentageMPPro
//         MOD_Para3: { label: "Intensity", unit: "%", min: 0, max: 100 }, // default: 80, formatter: ValueFormatters.percentageMPPro
//         MOD_Para4: { label: "Mode", unit: "%", min: 0, max: 100 }, // default: 0, formatter: ValueFormatters.vibeModePro
//       },
//     },
//     Tremolo: {
//       realName: "Tremolo",
//       params: {
//         MOD_Para1: { label: "Rate", unit: "%", min: 0, max: 100 }, // default: 70, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Depth", unit: "%", min: 0, max: 100 }, // default: 15, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     Rotary: {
//       realName: "Rotary",
//       params: {
//         MOD_Para2: { label: "Speed", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         MOD_Para1: { label: "Balance", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "SCH-1": {
//       realName: "SCH-1",
//       params: {
//         MOD_Para1: { label: "Rate", unit: "%", min: 0, max: 100 }, // default: 30, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Depth", unit: "%", min: 0, max: 100 }, // default: 70, formatter: ValueFormatters.percentageMPPro
//         MOD_Para3: { label: "Tone", unit: "%", min: 0, max: 100 }, // default: 60, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//     "Mono Octave": {
//       realName: "Mono Octave",
//       params: {
//         MOD_Para1: { label: "Sub", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         MOD_Para2: { label: "Dry", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//         MOD_Para3: { label: "Up", unit: "%", min: 0, max: 100 }, // default: 50, formatter: ValueFormatters.percentageMPPro
//       },
//     },
//   },
// },

export enum ModulationType {
  CE1 = "CE-1",
  CE2 = "CE-2",
  STChorus = "ST Chorus",
  Vibrato = "Vibrato",
  Detune = "Detune",
  Flanger = "Flanger",
  Phase90 = "Phase 90",
  Phase100 = "Phase 100",
  SCF = "S.C.F.",
  UVibe = "U-Vibe",
  Tremolo = "Tremolo",
  Rotary = "Rotary",
  SCH1 = "SCH-1",
  MonoOctave = "Mono Octave",
}

export type ModulationParams = ChainItem<
  ModulationType.CE1,
  "Rate" | "Depth" | "Intensity"
>;

const TYPES: Record<ModulationType, number> = {
  [ModulationType.CE1]: 1,
  [ModulationType.CE2]: 2,
  [ModulationType.STChorus]: 3,
  [ModulationType.Vibrato]: 4,
  [ModulationType.Detune]: 5,
  [ModulationType.Flanger]: 6,
  [ModulationType.Phase90]: 7,
  [ModulationType.Phase100]: 8,
  [ModulationType.SCF]: 9,
  [ModulationType.UVibe]: 10,
  [ModulationType.Tremolo]: 11,
  [ModulationType.Rotary]: 12,
  [ModulationType.SCH1]: 13,
  [ModulationType.MonoOctave]: 14,
};

export const modulation: BlockConfig = {
  types: [
    {
      label: ModulationType.CE1,
      realName: "CE-1",
      encodeType: TYPES[ModulationType.CE1],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
        },
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
        },
      ],
    },
    // TODO: add other types
  ],
};
