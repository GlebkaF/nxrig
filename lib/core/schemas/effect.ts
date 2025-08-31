import { z } from "zod";
import { EffectType, EffectParams as EffectParamsImpl } from "../blocks/effect";

// Схема для effect с точной проверкой соответствия типа и параметров
export const effectSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(EffectType.DistortionPlus),
      enabled: z.boolean(),
      params: z
        .object({
          Output: z.number(),
          Sensitivity: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.RCBoost),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Gain: z.number(),
          Bass: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.ACBoost),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Gain: z.number(),
          Bass: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.DistOne),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Drive: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.TScreamer),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Drive: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.BluesDrive),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Gain: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.MorningDrive),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Drive: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.EatDist),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Distortion: z.number(),
          Filter: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.RedDirt),
      enabled: z.boolean(),
      params: z
        .object({
          Level: z.number(),
          Drive: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.Crunch),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Gain: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.MuffFuzz),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Sustain: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.Katana),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Boost: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.STSinger),
      enabled: z.boolean(),
      params: z
        .object({
          Volume: z.number(),
          Gain: z.number(),
          Filter: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(EffectType.TouchWah),
      enabled: z.boolean(),
      params: z
        .object({
          Type: z.number(),
          Wow: z.number(),
          Sense: z.number(),
          Level: z.number(),
          "Up/Down Switch": z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as EffectParamsImpl);
