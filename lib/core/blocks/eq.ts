import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem } from "lib/core/interface";

export enum EqType {
  SixBand = "6-Band",
  TenBand = "10-Band",
}

const TYPES: Record<EqType, number> = {
  [EqType.SixBand]: 1,
  [EqType.TenBand]: 3,
};

export type EqParams =
  | ChainItem<EqType.SixBand, "100" | "220" | "500" | "1200" | "2600" | "6400">
  | ChainItem<
      EqType.TenBand,
      | "Vol"
      | "31"
      | "62"
      | "125"
      | "250"
      | "500"
      | "1000"
      | "2000"
      | "4000"
      | "8000"
      | "16000"
    >;

export const eq: BlockConfig = {
  types: [
    {
      label: EqType.SixBand,
      realName: "6-Band",
      encodeType: TYPES[EqType.SixBand],
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
          label: "1200",
          encodeIndex: NuxMp3PresetIndex.EQ_Para4,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "2600",
          encodeIndex: NuxMp3PresetIndex.EQ_Para5,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "6400",
          encodeIndex: NuxMp3PresetIndex.EQ_Para6,
          // formatter: ValueFormatters.decibelEQ
        },
      ],
    },
    {
      label: EqType.TenBand,
      realName: "10-Band",
      encodeType: TYPES[EqType.TenBand],
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
          label: "1000",
          encodeIndex: NuxMp3PresetIndex.EQ_Para7,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "2000",
          encodeIndex: NuxMp3PresetIndex.EQ_Para8,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "4000",
          encodeIndex: NuxMp3PresetIndex.EQ_Para9,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "8000",
          encodeIndex: NuxMp3PresetIndex.EQ_Para10,
          // formatter: ValueFormatters.decibelEQ
        },
        {
          label: "16000",
          encodeIndex: NuxMp3PresetIndex.EQ_Para11,
          // formatter: ValueFormatters.decibelEQ
        },
      ],
    },
  ],
};
