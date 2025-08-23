import { Preset } from "lib/public/interface";
import { createSlug } from "lib/utils/create-slug";

export const createPresetLink = (preset: Preset): string => {
  return `/preset/${createSlug(preset.origin.artist)}/${preset.slug}`;
};

export const createArtistLink = (preset: Preset): string => {
  return `/preset/${createSlug(preset.origin.artist)}`;
};
