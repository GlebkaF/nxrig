import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

export enum ReverbType {
  Room = "Room",
  Hall = "Hall",
  Plate = "Plate",
  Spring = "Spring",
  Shimmer = "Shimmer",
  Damp = "Damp",
}

const TYPES: Record<ReverbType, number> = {
  [ReverbType.Room]: 1,
  [ReverbType.Hall]: 2,
  [ReverbType.Plate]: 3,
  [ReverbType.Spring]: 4,
  [ReverbType.Shimmer]: 5,
  [ReverbType.Damp]: 6,
};

export type ReverbParams =
  | ChainItem<ReverbType.Room, "Level" | "Decay" | "Tone">
  | ChainItem<ReverbType.Hall, "Level" | "Decay" | "PreDelay" | "Liveliness">
  | ChainItem<ReverbType.Plate, "Level" | "Decay">
  | ChainItem<ReverbType.Spring, "Level" | "Decay">
  | ChainItem<ReverbType.Shimmer, "Mix" | "Decay" | "Shimmer">
  | ChainItem<ReverbType.Damp, "Mix" | "Depth">;

export const reverb: BlockConfig = {
  encoderHeadIndex: NuxMp3PresetIndex.Head_iRVB,
  types: [
    {
      label: ReverbType.Room,
      realName: "Room",
      encodeType: TYPES[ReverbType.Room],
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
      label: ReverbType.Hall,
      realName: "Hall",
      encodeType: TYPES[ReverbType.Hall],
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
          label: "PreDelay",
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
      label: ReverbType.Plate,
      realName: "Plate",
      encodeType: TYPES[ReverbType.Plate],
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
      label: ReverbType.Spring,
      realName: "Spring",
      encodeType: TYPES[ReverbType.Spring],
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
      label: ReverbType.Shimmer,
      realName: "Shimmer",
      encodeType: TYPES[ReverbType.Shimmer],
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
      label: ReverbType.Damp,
      realName: "Damp",
      encodeType: TYPES[ReverbType.Damp],
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
