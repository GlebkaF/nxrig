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

// Константы NUX MP3, если появятся другие устройства, то их нужно будет перенести в конфиг
export const NUX_PREFIX = "nux://MightyAmp:" as const;
export const DISABLED_FLAG = 0x40 as const;
export const TYPE_MASK = 0x3f as const;
export const DATA_SIZE = 113 as const;
export const HEADER_SIZE = 2 as const;
export const TOTAL_SIZE = 115 as const; // HEADER_SIZE + DATA_SIZE
export const PRODUCT_ID = 15 as const;
export const VERSION = 1 as const;
export const DEFAULT_MASTER = 50;

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
