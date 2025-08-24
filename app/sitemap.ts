import { MetadataRoute } from "next";
import { presets } from "lib/public/presets";

import { createArtistLink, createPresetLink } from "lib/utils/urls";
import uniq from "lodash/uniq";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nxrig.com";

  // Статические страницы
  const staticPages = [baseUrl + "/"];
  const artistPages = presets.map(
    (preset) => baseUrl + createArtistLink(preset)
  );
  const presetPages = presets.map(
    (preset) => baseUrl + createPresetLink(preset)
  );

  const urls = uniq([...staticPages, ...artistPages, ...presetPages]);

  return urls.map((url) => ({
    url,
  }));
}
