import { MetadataRoute } from "next";
import { presets } from "lib/public/presets";
import { blogPosts } from "../data/blog-posts";
import { createArtistLink, createPresetLink } from "lib/utils/urls";
import uniq from "lodash/uniq";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nxrig.com";

  // Получаем последнюю дату обновления среди всех пресетов для главной страницы
  const latestPresetUpdate = presets.reduce((latest, preset) => {
    const presetDate = new Date(preset.updatedAt);
    return presetDate > latest ? presetDate : latest;
  }, new Date(0));

  // Группируем пресеты по артистам для получения последней даты обновления по артисту
  const artistLastUpdates = presets.reduce<Record<string, Date>>(
    (acc, preset) => {
      const artistUrl = baseUrl + createArtistLink(preset);
      const presetDate = new Date(preset.updatedAt);

      if (!acc[artistUrl] || presetDate > acc[artistUrl]) {
        acc[artistUrl] = presetDate;
      }

      return acc;
    },
    {},
  );

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Главная страница - последний updatedAt среди всех пресетов
  sitemapEntries.push({
    url: baseUrl + "/",
    lastModified: latestPresetUpdate,
  });

  // Страница каталога пресетов - последний updatedAt среди всех пресетов
  sitemapEntries.push({
    url: baseUrl + "/preset/",
    lastModified: latestPresetUpdate,
  });

  // Страницы артистов - последний updatedAt среди пресетов артиста
  const uniqueArtistUrls = uniq(
    presets.map((preset) => baseUrl + createArtistLink(preset)),
  );
  uniqueArtistUrls.forEach((artistUrl) => {
    const lastModified = artistLastUpdates[artistUrl];
    if (lastModified) {
      sitemapEntries.push({
        url: artistUrl,
        lastModified: lastModified,
      });
    }
  });

  // Страницы пресетов - updatedAt конкретного пресета
  presets.forEach((preset) => {
    sitemapEntries.push({
      url: baseUrl + createPresetLink(preset),
      lastModified: new Date(preset.updatedAt),
    });
  });

  // Страница блога
  const latestBlogUpdate = blogPosts.reduce((latest, post) => {
    const postDate = new Date(post.date);
    return postDate > latest ? postDate : latest;
  }, new Date(0));

  sitemapEntries.push({
    url: baseUrl + "/blog/",
    lastModified: latestBlogUpdate,
  });

  // Страницы блог-постов
  blogPosts.forEach((post) => {
    sitemapEntries.push({
      url: baseUrl + `/blog/${post.slug}/`,
      lastModified: new Date(post.date),
    });
  });

  return sitemapEntries;
}
