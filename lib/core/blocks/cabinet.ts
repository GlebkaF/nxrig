import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem, TypeParamConfig } from "lib/core/interface";

export enum CabinetType {
  JZ120 = "JZ120",
  DR112 = "DR112",
  TR212 = "TR212",
  HIWIRE412 = "HIWIRE412",
  CALI112 = "CALI 112",
  A112 = "A112",
  GB412 = "GB412",
  M1960AX = "M1960AX",
  M1960AV = "M1960AV",
  M1960TV = "M1960TV",
  SLO412 = "SLO412",
  FIREMAN412 = "FIREMAN 412",
  RECT412 = "RECT 412",
  DIE412 = "DIE412",
  MATCH212 = "MATCH212",
  UBER412 = "UBER412",
  BS410 = "BS410",
  A212 = "A212",
  M1960AHW = "M1960AHW",
  M1936 = "M1936",
  BUDDA112 = "BUDDA112",
  Z212 = "Z212",
  SUPERVERB410 = "SUPERVERB410",
  VIBROKING310 = "VIBROKING310",
  AGL_DB810 = "AGL_DB810",
  AMP_SV212 = "AMP_SV212",
  AMP_SV410 = "AMP_SV410",
  AMP_SV810 = "AMP_SV810",
  BASSGUY410 = "BASSGUY410",
  EDEN410 = "EDEN410",
  MKB410 = "MKB410",
  G_HBIRD = "G-HBIRD",
  G_J15 = "G-J15",
  M_D45 = "M-D45",
}
const TYPES: Record<CabinetType, number> = {
  [CabinetType.JZ120]: 1,
  [CabinetType.DR112]: 2,
  [CabinetType.TR212]: 3,
  [CabinetType.HIWIRE412]: 4,
  [CabinetType.CALI112]: 5,
  [CabinetType.A112]: 6,
  [CabinetType.GB412]: 7,
  [CabinetType.M1960AX]: 8,
  [CabinetType.M1960AV]: 9,
  [CabinetType.M1960TV]: 10,
  [CabinetType.SLO412]: 11,
  [CabinetType.FIREMAN412]: 12,
  [CabinetType.RECT412]: 13,
  [CabinetType.DIE412]: 14,
  [CabinetType.MATCH212]: 15,
  [CabinetType.UBER412]: 16,
  [CabinetType.BS410]: 17,
  [CabinetType.A212]: 18,
  [CabinetType.M1960AHW]: 19,
  [CabinetType.M1936]: 20,
  [CabinetType.BUDDA112]: 21,
  [CabinetType.Z212]: 22,
  [CabinetType.SUPERVERB410]: 23,
  [CabinetType.VIBROKING310]: 24,
  [CabinetType.AGL_DB810]: 25,
  [CabinetType.AMP_SV212]: 26,
  [CabinetType.AMP_SV410]: 27,
  [CabinetType.AMP_SV810]: 28,
  [CabinetType.BASSGUY410]: 29,
  [CabinetType.EDEN410]: 30,
  [CabinetType.MKB410]: 31,
  [CabinetType.G_HBIRD]: 32,
  [CabinetType.G_J15]: 33,
  [CabinetType.M_D45]: 34,
};

export type CabinetParams = 
  | ChainItem<CabinetType.JZ120, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.DR112, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.TR212, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.HIWIRE412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.CALI112, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.A112, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.GB412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.M1960AX, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.M1960AV, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.M1960TV, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.SLO412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.FIREMAN412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.RECT412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.DIE412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.MATCH212, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.UBER412, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.BS410, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.A212, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.M1960AHW, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.M1936, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.BUDDA112, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.Z212, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.SUPERVERB410, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.VIBROKING310, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.AGL_DB810, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.AMP_SV212, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.AMP_SV410, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.AMP_SV810, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.BASSGUY410, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.EDEN410, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.MKB410, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.G_HBIRD, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.G_J15, "Level" | "LowCut" | "HighCut">
  | ChainItem<CabinetType.M_D45, "Level" | "LowCut" | "HighCut">;

const cabParams: TypeParamConfig[] = [
  {
    label: "Level",
    encodeIndex: NuxMp3PresetIndex.CAB_Para4,
    // formatter: ValueFormatters.percentageMPPro
  },
  {
    label: "LowCut",
    encodeIndex: NuxMp3PresetIndex.CAB_Para5,
    // formatter: low cut hz
  },
  {
    label: "HighCut",
    encodeIndex: NuxMp3PresetIndex.CAB_Para6,
    // formatter: high cut hz
  },
];

export const cabinet: BlockConfig = {
  encoderHeadIndex: NuxMp3PresetIndex.Head_iCAB,
  types: [
    {
      label: CabinetType.JZ120,
      realName: "Roland JC-120 2x12",
      encodeType: TYPES[CabinetType.JZ120],
      params: cabParams,
    },
    {
      label: CabinetType.DR112,
      realName: "Fender Deluxe Reverb 1x12",
      encodeType: TYPES[CabinetType.DR112],
      params: cabParams,
    },
    {
      label: CabinetType.TR212,
      realName: "Fender Twin Reverb 2x12",
      encodeType: TYPES[CabinetType.TR212],
      params: cabParams,
    },
    {
      label: CabinetType.HIWIRE412,
      realName: "Hiwatt 4x12",
      encodeType: TYPES[CabinetType.HIWIRE412],
      params: cabParams,
    },
    {
      label: CabinetType.CALI112,
      realName: "Mesa/Boogie 1x12",
      encodeType: TYPES[CabinetType.CALI112],
      params: cabParams,
    },
    {
      label: CabinetType.A112,
      realName: "American 1x12 (Open Back)",
      encodeType: TYPES[CabinetType.A112],
      params: cabParams,
    },
    {
      label: CabinetType.GB412,
      realName: "Celestion Greenback 4x12",
      encodeType: TYPES[CabinetType.GB412],
      params: cabParams,
    },
    {
      label: CabinetType.M1960AX,
      realName: "Marshall 1960AX 4x12",
      encodeType: TYPES[CabinetType.M1960AX],
      params: cabParams,
    },
    {
      label: CabinetType.M1960AV,
      realName: "Marshall 1960AV 4x12",
      encodeType: TYPES[CabinetType.M1960AV],
      params: cabParams,
    },
    {
      label: CabinetType.M1960TV,
      realName: "Marshall 1960TV 4x12",
      encodeType: TYPES[CabinetType.M1960TV],
      params: cabParams,
    },
    {
      label: CabinetType.SLO412,
      realName: "Soldano 4x12",
      encodeType: TYPES[CabinetType.SLO412],
      params: cabParams,
    },
    {
      label: CabinetType.FIREMAN412,
      realName: "Friedman 4x12",
      encodeType: TYPES[CabinetType.FIREMAN412],
      params: cabParams,
    },
    {
      label: CabinetType.RECT412,
      realName: "Mesa Boogie Rectifier 4x12",
      encodeType: TYPES[CabinetType.RECT412],
      params: cabParams,
    },
    {
      label: CabinetType.DIE412,
      realName: "Diezel 4x12",
      encodeType: TYPES[CabinetType.DIE412],
      params: cabParams,
    },
    {
      label: CabinetType.MATCH212,
      realName: "Matchless 2x12",
      encodeType: TYPES[CabinetType.MATCH212],
      params: cabParams,
    },
    {
      label: CabinetType.UBER412,
      realName: "Bogner Uberkab 4x12",
      encodeType: TYPES[CabinetType.UBER412],
      params: cabParams,
    },
    {
      label: CabinetType.BS410,
      realName: "Fender Bassman 4x10",
      encodeType: TYPES[CabinetType.BS410],
      params: cabParams,
    },
    {
      label: CabinetType.A212,
      realName: "American 2x12 (Open Back)",
      encodeType: TYPES[CabinetType.A212],
      params: cabParams,
    },
    {
      label: CabinetType.M1960AHW,
      realName: "Marshall 1960AHW 4x12",
      encodeType: TYPES[CabinetType.M1960AHW],
      params: cabParams,
    },
    {
      label: CabinetType.M1936,
      realName: "Marshall 1936 2x12",
      encodeType: TYPES[CabinetType.M1936],
      params: cabParams,
    },
    {
      label: CabinetType.BUDDA112,
      realName: "Budda 1x12",
      encodeType: TYPES[CabinetType.BUDDA112],
      params: cabParams,
    },
    {
      label: CabinetType.Z212,
      realName: "Dr. Z 2x12",
      encodeType: TYPES[CabinetType.Z212],
      params: cabParams,
    },
    {
      label: CabinetType.SUPERVERB410,
      realName: "Fender Super Reverb 4x10",
      encodeType: TYPES[CabinetType.SUPERVERB410],
      params: cabParams,
    },
    {
      label: CabinetType.VIBROKING310,
      realName: "Fender Vibro‑King 3x10",
      encodeType: TYPES[CabinetType.VIBROKING310],
      params: cabParams,
    },
    {
      label: CabinetType.AGL_DB810,
      realName: "Aguilar DB810 8x10",
      encodeType: TYPES[CabinetType.AGL_DB810],
      params: cabParams,
    },
    {
      label: CabinetType.AMP_SV212,
      realName: "Ampeg SVT 2x12",
      encodeType: TYPES[CabinetType.AMP_SV212],
      params: cabParams,
    },
    {
      label: CabinetType.AMP_SV410,
      realName: "Ampeg SVT 4x10",
      encodeType: TYPES[CabinetType.AMP_SV410],
      params: cabParams,
    },
    {
      label: CabinetType.AMP_SV810,
      realName: "Ampeg SVT 8x10",
      encodeType: TYPES[CabinetType.AMP_SV810],
      params: cabParams,
    },
    {
      label: CabinetType.BASSGUY410,
      realName: "Fender Bassman 4x10",
      encodeType: TYPES[CabinetType.BASSGUY410],
      params: cabParams,
    },
    {
      label: CabinetType.EDEN410,
      realName: "Eden 4x10",
      encodeType: TYPES[CabinetType.EDEN410],
      params: cabParams,
    },
    {
      label: CabinetType.MKB410,
      realName: "Markbass 4x10",
      encodeType: TYPES[CabinetType.MKB410],
      params: cabParams,
    },
    {
      label: CabinetType.G_HBIRD,
      realName: "Gibson Hummingbird (Acoustic IR)",
      encodeType: TYPES[CabinetType.G_HBIRD],
      params: cabParams,
    },
    {
      label: CabinetType.G_J15,
      realName: "Gibson J‑15 (Acoustic IR)",
      encodeType: TYPES[CabinetType.G_J15],
      params: cabParams,
    },
    {
      label: CabinetType.M_D45,
      realName: "Martin D‑45 (Acoustic IR)",
      encodeType: TYPES[CabinetType.M_D45],
      params: cabParams,
    },
  ],
};
