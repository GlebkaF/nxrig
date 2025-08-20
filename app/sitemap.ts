import { MetadataRoute } from "next";
import { presets } from "lib/public/presets";
import { createSlug } from "lib/utils/create-slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nxrig.com";

  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
    },
  ];

  // Страницы пресетов
  const presetPages = presets.map((preset) => ({
    url: `${baseUrl}/preset/${createSlug(preset.origin.artist)}/${preset.slug}`,
  }));

  return [...staticPages, ...presetPages];
}
