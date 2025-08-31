import { z } from "zod";
import {
  AmplifierType,
  AmplifierParams as AmplifierParamsImpl,
} from "../blocks/amplifier";

// Схема для amplifier с точной проверкой соответствия типа и параметров
export const amplifierSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(AmplifierType.JazzClean),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Bright: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.DeluxeRvb),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.BassMate),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Tweedy),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Tone: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Hiwire),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.CaliCrunch),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.ClassA15),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Treble: z.number(),
          Cut: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.ClassA30),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Treble: z.number(),
          Cut: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Plexi100),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Plexi45),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Brit800),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Amp1987X50),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Slo100),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.FiremanHbe),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.DualRect),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.DieVh4),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.MrZ38),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Treble: z.number(),
          Cut: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.SuperRvb),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Bright: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Agl),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          "Mid Freq": z.number(),
          Middle: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Mld),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          "Mid Freq": z.number(),
          Middle: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.OptimaAir),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Stageman),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.TwinReverb),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Bright: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.VibroKing),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Bright: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Budda),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Treble: z.number(),
          Cut: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.BritBlues),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.MatchD30),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Treble: z.number(),
          Cut: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.Brit2000),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
    z.object({
      type: z.literal(AmplifierType.UberHiGain),
      enabled: z.boolean(),
      params: z
        .object({
          Gain: z.number(),
          Master: z.number(),
          Bass: z.number(),
          Middle: z.number(),
          Treble: z.number(),
          Presence: z.number(),
        })
        .strict(),
    }),
  ])
  .transform((val) => val as AmplifierParamsImpl);
