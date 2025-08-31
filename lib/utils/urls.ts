import { Preset } from "lib/public/interface";
import { createSlug } from "./create-slug";

export const createPresetLink = (preset: Preset): string => {
  return `/preset/${preset.origin.artist.slug}/${preset.slug}/`;
};

export const createArtistLink = (preset: Preset): string => {
  return `/preset/${preset.origin.artist.slug}/`;
};

export const createPresetSlug = (preset: Preset): string => {
  return createPresetSlugBase(preset.origin.song, preset.origin.part);
};

export const createPresetSlugBase = (song: string, part: string): string => {
  return `${createSlug(song)}-guitar-${createSlug(part)}`;
};
