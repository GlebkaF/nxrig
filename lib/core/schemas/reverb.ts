import { z } from "zod";
import { ReverbType, ReverbParams as ReverbParamsImpl } from "../blocks/reverb";

// Схема для reverb с точной проверкой соответствия типа и параметров
export const reverbSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(ReverbType.Room),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Decay: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ReverbType.Hall),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Decay: z.number(),
          PreDelay: z.number(),
          Liveliness: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ReverbType.Plate),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Decay: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ReverbType.Spring),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Decay: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ReverbType.Shimmer),
      enabled: z.boolean(),
      params: z
        .object({
          Mix: z.number(),
          Decay: z.number(),
          Shimmer: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ReverbType.Damp),
      enabled: z.boolean(),
      params: z
        .object({
          Mix: z.number(),
          Depth: z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as ReverbParamsImpl);
