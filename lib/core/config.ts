import { noisegate } from "lib/core/blocks/noisegate";
import { compressor } from "./blocks/compressor";
import { BlockConfig, Blocks } from "./interface";
import { modulation } from "lib/core/blocks/modulation";
import { effect } from "lib/core/blocks/effect";
import { amplifier } from "lib/core/blocks/amplifier";
import { eq } from "lib/core/blocks/eq";
import { cabinet } from "lib/core/blocks/cabinet";
import { reverb } from "lib/core/blocks/reverb";
import { delay } from "lib/core/blocks/delay";
import { NuxMp3PresetIndex } from "./const";

interface ChainConfig {
  [key: string]: BlockConfig;
}



// Настройки энкодера
export const encoderConfig: {
  readonly masterIndex: number;
  readonly defaultMasterValue: number;
  readonly chainOrder: readonly number[];
  readonly linkStartIndex: number;
} = {
  // Индекс мастер уровня
  masterIndex: NuxMp3PresetIndex.MASTER,
  // Дефолтное значение мастер уровня
  defaultMasterValue: 50,
  // Порядок блоков в чейне (используем константы вместо магических чисел)
  chainOrder: [
    NuxMp3PresetIndex.Head_iNG,   // 5 - Noisegate
    NuxMp3PresetIndex.Head_iCMP,  // 1 - Compressor  
    NuxMp3PresetIndex.Head_iMOD,  // 6 - Modulation
    NuxMp3PresetIndex.Head_iEFX,  // 2 - Effect
    NuxMp3PresetIndex.Head_iAMP,  // 3 - Amplifier
    NuxMp3PresetIndex.Head_iCAB,  // 9 - Cabinet
    NuxMp3PresetIndex.Head_iEQ,   // 4 - EQ
    NuxMp3PresetIndex.Head_iDLY,  // 8 - Delay
    NuxMp3PresetIndex.Head_iRVB,  // 7 - Reverb
  ] as const,
  // Начальный индекс для LINK полей
  linkStartIndex: NuxMp3PresetIndex.LINK1,
} as const;

export const config: ChainConfig = {
  [Blocks.Noisegate]: noisegate,
  [Blocks.Compressor]: compressor,
  [Blocks.Modulation]: modulation,
  [Blocks.Effect]: effect,
  [Blocks.Amplifier]: amplifier,
  [Blocks.Cabinet]: cabinet,
  [Blocks.Eq]: eq,
  [Blocks.Reverb]: reverb,
  [Blocks.Delay]: delay,
};
