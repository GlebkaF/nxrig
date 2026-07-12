import { describe, expect, it } from "vitest";
import { presets } from "./presets";
import { findPresetByRoute } from "./find-preset";

describe("public preset routes", () => {
  it("keeps every artist/slug route unique", () => {
    const routes = presets.map(
      (preset) => `${preset.origin.artist.slug}/${preset.slug}`,
    );

    expect(new Set(routes).size).toBe(routes.length);
  });

  it("does not resolve a preset under another artist", () => {
    const preset = presets[0];
    expect(preset).toBeDefined();

    if (!preset) return;

    expect(
      findPresetByRoute(presets, "wrong-artist", preset.slug),
    ).toBeUndefined();
    expect(
      findPresetByRoute(presets, preset.origin.artist.slug, preset.slug)?.id,
    ).toBe(preset.id);
  });
});
