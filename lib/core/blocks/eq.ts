import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig } from "lib/core/interface";

enum Type {
  SixBand = "6-Band",
  TenBand = "10-Band",
}

const TYPES: Record<Type, number> = {
  [Type.SixBand]: 1,
  [Type.TenBand]: 3,
};

export const eq: BlockConfig = {
  types: [
    {
      label: Type.SixBand,
      realName: "6-Band",
      encodeType: TYPES[Type.SixBand],
      params: [
        {
          label: "100",
          encodeIndex: NuxMp3PresetIndex.EQ_Para1,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "220",
          encodeIndex: NuxMp3PresetIndex.EQ_Para2,
          // formatter: ValueFormatters.decibelEQ
        },

        {
          label: "500",
          encodeIndex: NuxMp3PresetIndex.EQ_Para3,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "1.2K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para4,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "2.6K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para5,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "6.4K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para6,
          // formatter: ValueFormatters.decibelEQ
        },
      ],
    },
    {
      label: Type.TenBand,
      realName: "10-Band",
      encodeType: TYPES[Type.TenBand],
      params: [
        {
          label: "Vol",
          encodeIndex: NuxMp3PresetIndex.EQ_Para1,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "31",
          encodeIndex: NuxMp3PresetIndex.EQ_Para2,
          // formatter: ValueFormatters.decibelEQ
        },

        {
          label: "62",
          encodeIndex: NuxMp3PresetIndex.EQ_Para3,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "125",
          encodeIndex: NuxMp3PresetIndex.EQ_Para4,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "250",
          encodeIndex: NuxMp3PresetIndex.EQ_Para5,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "500",
          encodeIndex: NuxMp3PresetIndex.EQ_Para6,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "1K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para7,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "2K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para8,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "4K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para9,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "8K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para10,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "16K",
          encodeIndex: NuxMp3PresetIndex.EQ_Para11,
          // formatter: ValueFormatters.decibelEQ
        },
      ],
    },
  ],
};
