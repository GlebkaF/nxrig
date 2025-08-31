import { z } from "zod";
import { CabinetParams as CabinetParamsImpl } from "../blocks/cabinet";

// Схема для cabinet - все типы имеют одинаковые параметры
export const cabinetSchema = z
  .object({
    type: z.string(),
    enabled: z.boolean(),
    params: z
      .object({
        Level: z.number(),
        LowCut: z.number(),
        HighCut: z.number(),
      })
      .strict(),
  })
  .transform((val) => val as CabinetParamsImpl);
