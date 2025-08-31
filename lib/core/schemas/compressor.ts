import { z } from "zod";
import {
  CompressorType,
  CompressorParams as CompressorParamsImpl,
} from "../blocks/compressor";

// Схема для compressor с точной проверкой соответствия типа и параметров
export const compressorSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(CompressorType.KComp),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Sustain: z.number(),
          Clipping: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(CompressorType.StudioComp),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Threshold: z.number(),
          Ratio: z.number(),
          Release: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(CompressorType.RoseComp),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Sustain: z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as CompressorParamsImpl);
