// Экспорт всех схем для удобного импорта
export { artistSchema, type ValidatedArtist, validateArtist } from "./artist";

export { pickupSchema, type ValidatedPickup, validatePickup } from "./pickup";

export {
  presetSchema,
  presetWithArtistSchema,
  type ValidatedPreset,
  type ValidatedPresetWithArtist,
  validatePreset,
  validatePresetWithArtist,
} from "./preset";
