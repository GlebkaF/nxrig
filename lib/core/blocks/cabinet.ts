import { NuxMp3PresetIndex } from "lib/core/const";
import { BlockConfig, ChainItem, TypeParamConfig } from "lib/core/interface";

// Cabinet: {
//   types: {

//     DR112: {
//       realName: "Fender Deluxe Reverb 1x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     TR212: {
//       realName: "Fender Twin Reverb 2x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     HIWIRE412: {
//       realName: "Hiwatt 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     "CALI 112": {
//       realName: "Mesa/Boogie 1x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     A112: {
//       realName: "American 1x12 (Open Back)",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     GB412: {
//       realName: "Celestion Greenback 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     M1960AX: {
//       realName: "Marshall 1960AX 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     M1960AV: {
//       realName: "Marshall 1960AV 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     M1960TV: {
//       realName: "Marshall 1960TV 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     SLO412: {
//       realName: "Soldano 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     "FIREMAN 412": {
//       realName: "Friedman 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     "RECT 412": {
//       realName: "Mesa Boogie Rectifier 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     DIE412: {
//       realName: "Diezel 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     MATCH212: {
//       realName: "Matchless 2x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     UBER412: {
//       realName: "Bogner Uberkab 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     BS410: {
//       realName: "Fender Bassman 4x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     A212: {
//       realName: "American 2x12 (Open Back)",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     M1960AHW: {
//       realName: "Marshall 1960AHW 4x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     M1936: {
//       realName: "Marshall 1936 2x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     BUDDA112: {
//       realName: "Budda 1x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     Z212: {
//       realName: "Dr. Z 2x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     SUPERVERB410: {
//       realName: "Fender Super Reverb 4x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     VIBROKING310: {
//       realName: "Fender Vibro‑King 3x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     AGL_DB810: {
//       realName: "Aguilar DB810 8x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     AMP_SV212: {
//       realName: "Ampeg SVT 2x12",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     AMP_SV410: {
//       realName: "Ampeg SVT 4x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     AMP_SV810: {
//       realName: "Ampeg SVT 8x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     BASSGUY410: {
//       realName: "Fender Bassman 4x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     EDEN410: {
//       realName: "Eden 4x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     MKB410: {
//       realName: "Markbass 4x10",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     "G-HBIRD": {
//       realName: "Gibson Hummingbird (Acoustic IR)",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     "G-J15": {
//       realName: "Gibson J‑15 (Acoustic IR)",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },
//     },
//     "M-D45": {
//       realName: "Martin D‑45 (Acoustic IR)",
//       params: {
//         CAB_Para4: { label: "Level", unit: "dB", min: -12, max: 12 },
//         CAB_Para5: { label: "Low Cut", unit: "Hz", min: 20, max: 300 },
//         CAB_Para6: { label: "High Cut", unit: "Hz", min: 5000, max: 20000 },
//       },

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

export type CabinetParams = ChainItem<
  CabinetType.JZ120,
  "Level" | "LowCut" | "HighCut"
>;

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
  types: [
    {
      label: CabinetType.JZ120,
      realName: "Roland JC-120 2x12",
      encodeType: TYPES[CabinetType.JZ120],
      params: cabParams,
    },
    // TODO: add other types
  ],
};
