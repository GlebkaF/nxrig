import { z } from "zod";
import { Blocks, Chain } from "../interface";
import { noisegateSchema } from "./noisegate";
import { compressorSchema } from "./compressor";
import { modulationSchema } from "./modulation";
import { effectSchema } from "./effect";
import { amplifierSchema } from "./amplifier";
import { cabinetSchema } from "./cabinet";
import { eqSchema } from "./eq";
import { reverbSchema } from "./reverb";
import { delaySchema } from "./delay";

// Основная схема Chain - объединяет все блоки эффектов
export const chainSchema = z.object({
  [Blocks.Noisegate]: noisegateSchema,
  [Blocks.Compressor]: compressorSchema,
  [Blocks.Modulation]: modulationSchema,
  [Blocks.Effect]: effectSchema,
  [Blocks.Amplifier]: amplifierSchema,
  [Blocks.Cabinet]: cabinetSchema,
  [Blocks.Eq]: eqSchema,
  [Blocks.Reverb]: reverbSchema,
  [Blocks.Delay]: delaySchema,
});

// Тип для валидированного Chain
export type ValidatedChain = z.infer<typeof chainSchema>;

// Функция для валидации Chain
export function validateChain(chain: unknown): Chain {
  chainSchema.parse(chain);
  return chain as Chain;
}
