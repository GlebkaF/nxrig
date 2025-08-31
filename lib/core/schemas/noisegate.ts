import { z } from "zod";
import {
  NoiseGateType,
  NoisegateParams as NoisegateParamsImpl,
} from "../blocks/noisegate";

// Схема для noisegate с точной проверкой соответствия типа и параметров
export const noisegateSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(NoiseGateType.NoiseGate),
      enabled: z.boolean(),
      params: z
        .object({
          Sensitivity: z.number(),
          Decay: z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as NoisegateParamsImpl);
