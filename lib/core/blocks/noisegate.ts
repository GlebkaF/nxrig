import { NuxMp3PresetIndex } from "../const";
import { BlockConfig } from "../interface";

enum NoiseGateType {
  NoiseGate = "Noise Gate",
}

const NOISE_GATE_TYPES: Record<NoiseGateType, number> = {
  [NoiseGateType.NoiseGate]: 1,
};

type NoiseGateParams = "Sensitivity" | "Decay";

export const noisegate: BlockConfig = {
  types: [
    {
      label: NoiseGateType.NoiseGate,
      realName: "Noise Gate",
      encodeType: NOISE_GATE_TYPES[NoiseGateType.NoiseGate],
      params: [
        {
          label: "Sensitivity" as NoiseGateParams,
          encodeIndex: NuxMp3PresetIndex.NG_Para1,
        },
        {
          label: "Decay" as NoiseGateParams,
          encodeIndex: NuxMp3PresetIndex.NG_Para2,
        },
      ],
    },
  ],
};
