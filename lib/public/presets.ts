import presetsRaw from "data/presets.json";
import artistsRaw from "data/artists.json";
import { validatePresetWithArtist } from "./schemas";

export const presets = presetsRaw.map((preset) => {
  const artist = artistsRaw.find(
    (artist) => artist.id === preset.origin.artistId,
  );

  if (!artist) {
    throw new Error(`Artist not found for preset ${preset.id}`);
  }

  // Создаем объект с полным artist для валидации
  const presetWithArtist = {
    id: preset.id,
    origin: {
      artist: artist,
      song: preset.origin.song,
      part: preset.origin.part,
      imageUrl: preset.origin.imageUrl,
    },
    description: preset.description,
    chain: preset.chain,
    pickup: preset.pickup,
    slug: preset.slug,
    tabsUrl: preset.tabsUrl,
  };

  // Валидируем весь preset с помощью Zod схемы
  const validatedPreset = validatePresetWithArtist(presetWithArtist);

  return validatedPreset;
});
