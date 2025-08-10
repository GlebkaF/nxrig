import { NuxMp3PresetIndex } from "../const";
import { BlockConfig } from "../interface";

enum CompressorType {
  RoseComp = "Rose Comp",
  KComp = "K Comp",
  StudioComp = "Studio Comp",
}

const COMP_TYPES: Record<CompressorType, number> = {
  [CompressorType.RoseComp]: 1,
  [CompressorType.KComp]: 2,
  [CompressorType.StudioComp]: 3,
};

export const compressor: BlockConfig = {
  types: [
    {
      label: CompressorType.KComp,
      realName: "Keeley Compressor",
      encodeType: COMP_TYPES[CompressorType.KComp],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.CMP_Para2,
          // formatter: percent,
        },
        {
          label: "Sustain",
          encodeIndex: NuxMp3PresetIndex.CMP_Para1,
          // formatter: percent,
        },
        {
          label: "Clipping",
          encodeIndex: NuxMp3PresetIndex.CMP_Para3,
          // formatter: percent,
        },
      ],
    },
    {
      label: "Studio Comp",
      realName: "Studio Compressor",
      encodeType: COMP_TYPES[CompressorType.StudioComp],
      params: [
        {
          label: "Gain",
          encodeIndex: NuxMp3PresetIndex.CMP_Para3,
          // formatter: percent,
        },
        {
          label: "Threshold",
          encodeIndex: NuxMp3PresetIndex.CMP_Para1,
          // formatter: percent,
        },
        {
          label: "Ratio",
          encodeIndex: NuxMp3PresetIndex.CMP_Para2,
          // formatter: percent,
        },
        {
          label: "Release",
          encodeIndex: NuxMp3PresetIndex.CMP_Para4,
          // formatter: percent,
        },
      ],
    },
    {
      label: "Rose Comp",
      realName: "Keeley Compressor",
      encodeType: COMP_TYPES[CompressorType.RoseComp],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.CMP_Para2,
          // formatter: percent,
        },
        {
          label: "Sustain",
          encodeIndex: NuxMp3PresetIndex.CMP_Para1,
          // formatter: percent,
        },
      ],
    },
  ],
};
