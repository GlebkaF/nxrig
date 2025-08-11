import { noisegate } from "lib/core/blocks/noisegate";
import { compressor } from "./blocks/compressor";
import { Blocks, ChainConfig } from "./interface";
import { modulation } from "lib/core/blocks/modulation";
import { effect } from "lib/core/blocks/effect";
import { amplifier } from "lib/core/blocks/amplifier";
import { eq } from "lib/core/blocks/eq";
import { cabinet } from "lib/core/blocks/cabinet";
import { reverb } from "lib/core/blocks/reverb";
import { delay } from "lib/core/blocks/delay";
import { NuxMp3PresetIndex } from "./const";

// Это конфиг nux mp3
export const config: ChainConfig = {
  encoder: {
    masterIndex: NuxMp3PresetIndex.MASTER,
    linkStartIndex: NuxMp3PresetIndex.LINK1,
    chainOrder: [
      NuxMp3PresetIndex.Head_iNG,
      NuxMp3PresetIndex.Head_iCMP,
      NuxMp3PresetIndex.Head_iMOD,
      NuxMp3PresetIndex.Head_iEFX,
      NuxMp3PresetIndex.Head_iAMP,
      NuxMp3PresetIndex.Head_iCAB,
      NuxMp3PresetIndex.Head_iEQ,
      NuxMp3PresetIndex.Head_iDLY,
      NuxMp3PresetIndex.Head_iRVB,
    ],
  },
  blocks: {
    [Blocks.Noisegate]: noisegate,
    [Blocks.Compressor]: compressor,
    [Blocks.Modulation]: modulation,
    [Blocks.Effect]: effect,
    [Blocks.Amplifier]: amplifier,
    [Blocks.Cabinet]: cabinet,
    [Blocks.Eq]: eq,
    [Blocks.Reverb]: reverb,
    [Blocks.Delay]: delay,
  },
};
