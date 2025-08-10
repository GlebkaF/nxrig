import { NuxMp3PresetIndex } from "../const";
import { BlockConfig } from "../interface";

enum NoiseGateType {
  NoiseGate = "Noise Gate",
}

const NOISE_GATE_TYPES: Record<NoiseGateType, number> = {
  [NoiseGateType.NoiseGate]: 1,
};

export const noisegate: BlockConfig = {
  types: [
    {
      label: NoiseGateType.NoiseGate,
      realName: "Noise Gate",
      encodeType: NOISE_GATE_TYPES[NoiseGateType.NoiseGate],
      params: [
        {
          label: "Sensitivity",
          encodeIndex: NuxMp3PresetIndex.NG_Para1,
        },
        {
          label: "Decay",
          encodeIndex: NuxMp3PresetIndex.NG_Para2,
        },
      ],
    },
  ],
};
