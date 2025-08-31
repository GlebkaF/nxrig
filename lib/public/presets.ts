import presetsRaw from "data/presets.json";
import artistsRaw from "data/artists.json";
import { validateChain } from "lib/core/schemas";
import { Preset } from "./interface";

presetsRaw.forEach((preset) => {
  validateChain(preset.chain);
});

export const presets = presetsRaw.map((preset) => {
  const artist = artistsRaw.find(
    (artist) => artist.id === preset.origin.artistId,
  );

  if (!artist) {
    throw new Error(`Artist not found for preset ${preset.id}`);
  }

  const validatedPreset: Preset = {
    id: preset.id,
    origin: {
      artist: artist,
      song: preset.origin.song,
      part: preset.origin.part,
      imageUrl: preset.origin.imageUrl,
    },
    description: preset.description,
    // @ts-expect-error - TODO: fix this
    chain: preset.chain,
    // @ts-expect-error - TODO: fix this
    pickup: preset.pickup,
    slug: preset.slug,
    tabsUrl: preset.tabsUrl,
  };
  return validatedPreset;
});
