import { MetadataRoute } from "next";
import { presets } from "lib/public/presets";
import { createSlug } from "lib/utils/create-slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nxrig.com/";
  const lastModified = new Date("2025-08-21");

  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // Страницы артистов
  const artists = Array.from(
    new Set(presets.map((preset) => preset.origin.artist))
  );
  const artistPages = artists.map((artist) => ({
    url: `${baseUrl}preset/${createSlug(artist)}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Страницы пресетов
  const presetPages = presets.map((preset) => ({
    url: `${baseUrl}preset/${createSlug(preset.origin.artist)}/${preset.slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...artistPages, ...presetPages];
}
