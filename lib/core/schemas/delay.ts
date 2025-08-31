import { z } from "zod";
import { DelayType, DelayParams as DelayParamsImpl } from "../blocks/delay";

// Схема для delay с точной проверкой соответствия типа и параметров
export const delaySchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(DelayType.AnalogDelay),
      enabled: z.boolean(),
      params: z
        .object({
          Intensity: z.number(),
          Rate: z.number(),
          Echo: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(DelayType.DigitalDelay),
      enabled: z.boolean(),
      params: z
        .object({
          "E.Level": z.number(),
          Feedback: z.number(),
          Time: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(DelayType.ModDelay),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Time: z.number(),
          Repeat: z.number(),
          Mod: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(DelayType.TapeEcho),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Time: z.number(),
          Repeat: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(DelayType.PanDelay),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Time: z.number(),
          Repeat: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(DelayType.PhiDelay),
      enabled: z.boolean(),
      params: z
        .object({
          Time: z.number(),
          Repeat: z.number(),
          Mix: z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as DelayParamsImpl);
