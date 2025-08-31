import { z } from "zod";
import { EqType, EqParams as EqParamsImpl } from "../blocks/eq";

// Схема для eq с точной проверкой соответствия типа и параметров
export const eqSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(EqType.SixBand),
      enabled: z.boolean(),
      params: z
        .object({
          "100": z.number(),
          "220": z.number(),
          "500": z.number(),
          "1200": z.number(),
          "2600": z.number(),
          "6400": z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EqType.TenBand),
      enabled: z.boolean(),
      params: z
        .object({
          Vol: z.number(),
          "31": z.number(),
          "62": z.number(),
          "125": z.number(),
          "250": z.number(),
          "500": z.number(),
          "1000": z.number(),
          "2000": z.number(),
          "4000": z.number(),
          "8000": z.number(),
          "16000": z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as EqParamsImpl);
