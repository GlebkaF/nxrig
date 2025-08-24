import { Preset } from "lib/public/interface";

export const createPresetLink = (preset: Preset): string => {
  return `/preset/${preset.origin.artist.slug}/${preset.slug}/`;
};

export const createArtistLink = (preset: Preset): string => {
  return `/preset/${preset.origin.artist.slug}/`;
};

export const createPresetSlug = (preset: Preset): string => {
  return `${createSlug(preset.origin.song)}-guitar-${createSlug(
    preset.origin.part
  )}`;
};

export const createSlug = (text: string): string => {
  return encodeURIComponent(
    text
      .toLowerCase()
      .replace(/['']/g, "") // Удаляем апострофы
      .replace(/[^a-z0-9]+/g, "-") // Заменяем все не-буквы/цифры на дефис
      .replace(/^-+|-+$/g, "") // Убираем дефисы в начале и конце
  );
};
