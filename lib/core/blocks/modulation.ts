import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

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
  encoderHeadIndex: NuxMp3PresetIndex.Head_iMOD,
  types: [
    {
      label: ModulationType.CE1,
      realName: "CE-1",
      encodeType: TYPES[ModulationType.CE1],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
        },
      ],
    },
    {
      label: ModulationType.CE2,
      realName: "CE-2",
      encodeType: TYPES[ModulationType.CE2],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },

    {
      label: ModulationType.STChorus,
      realName: "ST Chorus",
      encodeType: TYPES[ModulationType.STChorus],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Width",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },

    {
      label: ModulationType.Vibrato,
      realName: "Vibrato",
      encodeType: TYPES[ModulationType.Vibrato],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },

    {
      label: ModulationType.Detune,
      realName: "Detune",
      encodeType: TYPES[ModulationType.Detune],
      params: [
        {
          label: "Shift-L",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Shift-R",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Mix",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.Flanger,
      realName: "Flanger",
      encodeType: TYPES[ModulationType.Flanger],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Width",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Feedback",
          encodeIndex: NuxMp3PresetIndex.MOD_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.Phase90,
      realName: "Phase 90",
      encodeType: TYPES[ModulationType.Phase90],
      params: [
        {
          label: "Speed",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.Phase100,
      realName: "Phase 100",
      encodeType: TYPES[ModulationType.Phase100],
      params: [
        {
          label: "Speed",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.SCF,
      realName: "S.C.F.",
      encodeType: TYPES[ModulationType.SCF],
      params: [
        {
          label: "Speed",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Width",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.MOD_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Mode",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // Chorus, P.M., Flanger
          // formatter: ValueFormatters.scfMode
        },
      ],
    },
    {
      label: ModulationType.UVibe,
      realName: "U-Vibe",
      encodeType: TYPES[ModulationType.UVibe],
      params: [
        {
          label: "Speed",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Volume",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Intensity",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Mode",
          encodeIndex: NuxMp3PresetIndex.MOD_Para4,
          // Chorus, Vibratto
          // formatter: ValueFormatters.vibeModePro
        },
      ],
    },
    {
      label: ModulationType.Tremolo,
      realName: "Tremolo",
      encodeType: TYPES[ModulationType.Tremolo],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.Rotary,
      realName: "Rotary",
      encodeType: TYPES[ModulationType.Rotary],
      params: [
        {
          label: "Speed",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Balance",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.SCH1,
      realName: "SCH-1",
      encodeType: TYPES[ModulationType.SCH1],
      params: [
        {
          label: "Rate",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: ModulationType.MonoOctave,
      realName: "Mono Octave",
      encodeType: TYPES[ModulationType.MonoOctave],
      params: [
        {
          label: "Sub",
          encodeIndex: NuxMp3PresetIndex.MOD_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Dry",
          encodeIndex: NuxMp3PresetIndex.MOD_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Up",
          encodeIndex: NuxMp3PresetIndex.MOD_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
  ],
};
