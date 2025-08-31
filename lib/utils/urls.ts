import { Preset } from "lib/public/interface";
import { createSlug } from "./create-slug";

export const createPresetLink = (preset: Preset): string => {
  return `/preset/${preset.origin.artist.slug}/${preset.slug}/`;
};

export const createArtistLink = (preset: Preset): string => {
  return `/preset/${preset.origin.artist.slug}/`;
};

export const createPresetSlug = (preset: Preset): string => {
  return `${createSlug(preset.origin.song)}-guitar-${createSlug(
    preset.origin.part,
  )}`;
};
