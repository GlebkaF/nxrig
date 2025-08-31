import { z } from "zod";

// Схема для Artist
export const artistSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
  })
  .strict();

// Тип для валидированного Artist
export type ValidatedArtist = z.infer<typeof artistSchema>;

// Функция для валидации Artist
export function validateArtist(artist: unknown): ValidatedArtist {
  return artistSchema.parse(artist);
}
