import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig } from "lib/core/interface";

enum Type {
  Room = "Room",
  Hall = "Hall",
  Plate = "Plate",
  Spring = "Spring",
  Shimmer = "Shimmer",
  Damp = "Damp",
}

const TYPES: Record<Type, number> = {
  [Type.Room]: 1,
  [Type.Hall]: 2,
  [Type.Plate]: 3,
  [Type.Spring]: 4,
  [Type.Shimmer]: 5,
  [Type.Damp]: 6,
};

export const reverb: BlockConfig = {
  types: [
    {
      label: Type.Room,
      realName: "Room Reverb",
      encodeType: TYPES[Type.Room],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.RVB_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Decay",
          encodeIndex: NuxMp3PresetIndex.RVB_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Tone",
          encodeIndex: NuxMp3PresetIndex.RVB_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },

    {
      label: Type.Hall,
      realName: "Hall Reverb",
      encodeType: TYPES[Type.Hall],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.RVB_Para4,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Decay",
          encodeIndex: NuxMp3PresetIndex.RVB_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Pre Delay",
          encodeIndex: NuxMp3PresetIndex.RVB_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Liveliness",
          encodeIndex: NuxMp3PresetIndex.RVB_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: Type.Plate,
      realName: "Plate Reverb",
      encodeType: TYPES[Type.Plate],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.RVB_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Decay",
          encodeIndex: NuxMp3PresetIndex.RVB_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: Type.Spring,
      realName: "Spring Reverb",
      encodeType: TYPES[Type.Spring],
      params: [
        {
          label: "Level",
          encodeIndex: NuxMp3PresetIndex.RVB_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Decay",
          encodeIndex: NuxMp3PresetIndex.RVB_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: Type.Shimmer,
      realName: "Shimmer Reverb",
      encodeType: TYPES[Type.Shimmer],
      params: [
        {
          label: "Mix",
          encodeIndex: NuxMp3PresetIndex.RVB_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Decay",
          encodeIndex: NuxMp3PresetIndex.RVB_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Shimmer",
          encodeIndex: NuxMp3PresetIndex.RVB_Para3,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
    {
      label: Type.Damp,
      realName: "Damp Reverb",
      encodeType: TYPES[Type.Damp],
      params: [
        {
          label: "Mix",
          encodeIndex: NuxMp3PresetIndex.RVB_Para1,
          // formatter: ValueFormatters.percentageMPPro
        },
        {
          label: "Depth",
          encodeIndex: NuxMp3PresetIndex.RVB_Para2,
          // formatter: ValueFormatters.percentageMPPro
        },
      ],
    },
  ],
};
