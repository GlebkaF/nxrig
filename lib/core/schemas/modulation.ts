import { z } from "zod";
import {
  ModulationType,
  ModulationParams as ModulationParamsImpl,
} from "../blocks/modulation";

// Схема для modulation с точной проверкой соответствия типа и параметров
export const modulationSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(ModulationType.CE1),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Depth: z.number(),
          Intensity: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.CE2),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Depth: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.STChorus),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Width: z.number(),
          Intensity: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Vibrato),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Depth: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Detune),
      enabled: z.boolean(),
      params: z
        .object({
          "Shift-L": z.number(),
          "Shift-R": z.number(),
          Mix: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Flanger),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Width: z.number(),
          Level: z.number(),
          Feedback: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Phase90),
      enabled: z.boolean(),
      params: z
        .object({
          Speed: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Phase100),
      enabled: z.boolean(),
      params: z
        .object({
          Speed: z.number(),
          Intensity: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.SCF),
      enabled: z.boolean(),
      params: z
        .object({
          Speed: z.number(),
          Width: z.number(),
          Intensity: z.number(),
          Mode: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.UVibe),
      enabled: z.boolean(),
      params: z
        .object({
          Speed: z.number(),
          Volume: z.number(),
          Intensity: z.number(),
          Mode: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Tremolo),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Depth: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.Rotary),
      enabled: z.boolean(),
      params: z
        .object({
          Speed: z.number(),
          Balance: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.SCH1),
      enabled: z.boolean(),
      params: z
        .object({
          Rate: z.number(),
          Depth: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(ModulationType.MonoOctave),
      enabled: z.boolean(),
      params: z
        .object({
          Sub: z.number(),
          Dry: z.number(),
          Up: z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as ModulationParamsImpl);
