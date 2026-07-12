import { Preset } from "./interface";
import { createPresetLink } from "../utils/urls";

export interface PresetCardData {
  id: string;
  artist: string;
  song: string;
  part: string;
  imageUrl: string;
  href: string;
}

export function toPresetCardData(preset: Preset): PresetCardData {
  return {
    id: preset.id,
    artist: preset.origin.artist.title,
    song: preset.origin.song,
    part: preset.origin.part,
    imageUrl: preset.origin.imageUrl ?? "/images/cover/default-cover.webp",
    href: createPresetLink(preset),
  };
}
