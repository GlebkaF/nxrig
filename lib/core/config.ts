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

interface ChainConfig {
  [key: string]: BlockConfig;
}

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
