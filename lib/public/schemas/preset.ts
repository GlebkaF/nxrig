import { z } from "zod";
import { artistSchema } from "./artist";
import { pickupSchema } from "./pickup";
import { chainSchema } from "../../core/schemas";

// Схема для Preset
export const presetSchema = z
  .object({
    id: z.string(),
    origin: z
      .object({
        artistId: z.number(),
        song: z.string(),
        part: z.string(),
        imageUrl: z.string().nullable(),
      })
      .strict(),
    description: z.string(),
    chain: chainSchema,
    pickup: pickupSchema,
    slug: z.string(),
    tabsUrl: z.string().optional(),
  })
  .strict();

// Тип для валидированного Preset
export type ValidatedPreset = z.infer<typeof presetSchema>;

// Функция для валидации Preset из JSON
export function validatePreset(preset: unknown): ValidatedPreset {
  return presetSchema.parse(preset);
}

// Схема для полного Preset с Artist объектом
export const presetWithArtistSchema = z
  .object({
    id: z.string(),
    origin: z
      .object({
        artist: artistSchema,
        song: z.string(),
        part: z.string(),
        imageUrl: z.string().nullable(),
      })
      .strict(),
    description: z.string(),
    chain: chainSchema,
    pickup: pickupSchema,
    slug: z.string(),
    tabsUrl: z.string().optional(),
  })
  .strict();

// Тип для валидированного Preset с Artist объектом
export type ValidatedPresetWithArtist = z.infer<typeof presetWithArtistSchema>;

// Функция для валидации полного Preset с Artist объектом
export function validatePresetWithArtist(
  preset: unknown,
): ValidatedPresetWithArtist {
  return presetWithArtistSchema.parse(preset);
}
