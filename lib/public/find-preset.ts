import { Preset } from "./interface";

export function findPresetByRoute(
  presets: readonly Preset[],
  artistSlug: string,
  presetSlug: string,
): Preset | undefined {
  return presets.find(
    (preset) =>
      preset.origin.artist.slug === artistSlug && preset.slug === presetSlug,
  );
}
