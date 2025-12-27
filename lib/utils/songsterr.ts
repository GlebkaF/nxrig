/**
 * Утилиты для работы с Songsterr API
 */

interface SongsterrTrack {
  partId: number;
  name: string;
  title: string;
  instrument: string;
  instrumentId: number;
  views: number;
  difficulty: number;
  isGuitar: boolean;
  isBassGuitar: boolean;
  isDrums: boolean;
}

interface SongsterrSongData {
  id?: number;
  title: string;
  artist: string;
  tracks?: SongsterrTrack[];
  popularTrackGuitar?: number;
}

/**
 * Извлекает ID песни и опциональный ID трека из URL Songsterr
 * @param url URL вида https://www.songsterr.com/a/wsa/song-tab-s1352 или s1352t2
 * @returns Объект с songId и trackId (если указан)
 */
export function extractSongsterrId(
  url: string,
): { songId: string; trackId: number | null } | null {
  try {
    // Паттерн для извлечения songId и опционального trackId
    // Формат: -s{songId} или -s{songId}t{trackId}
    const match = url.match(/-s(\d+)(?:t(\d+))?/);
    if (!match || !match[1]) return null;

    return {
      songId: match[1],
      trackId: match[2] ? parseInt(match[2], 10) : null,
    };
  } catch (error) {
    console.error("Error extracting Songsterr ID:", error);
    return null;
  }
}

/**
 * Получает данные о песне из HTML страницы Songsterr (включая треки)
 * @param songId ID песни
 * @returns Данные о песне с треками
 */
export async function fetchSongsterrData(
  songId: string,
): Promise<SongsterrSongData> {
  try {
    // Сначала пробуем получить данные через API для базовой информации
    const apiResponse = await fetch(
      `https://www.songsterr.com/api/meta/${songId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error(
        `Songsterr API error: ${String(apiResponse.status)} ${apiResponse.statusText}`,
      );
    }

    const basicData = (await apiResponse.json()) as SongsterrSongData;

    // Теперь получаем HTML страницу для извлечения треков
    const pageUrl = `https://www.songsterr.com/a/wsa/song-tab-s${songId}`;
    const pageResponse = await fetch(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();

      // Извлекаем треки из HTML
      const tracksArrayMatch = html.match(
        /"tracks"\s*:\s*(\[[\s\S]*?\])\s*,\s*"defaultTrack"/,
      );

      if (tracksArrayMatch && tracksArrayMatch[1]) {
        try {
          const tracks = JSON.parse(tracksArrayMatch[1]) as SongsterrTrack[];

          // Ищем popularTrackGuitar
          const popularMatch = html.match(/"popularTrackGuitar"\s*:\s*(\d+)/);
          const popularTrackGuitar =
            popularMatch && popularMatch[1] ? parseInt(popularMatch[1], 10) : 0;

          return {
            ...basicData,
            tracks,
            popularTrackGuitar,
          };
        } catch (parseError) {
          console.warn("Failed to parse tracks from HTML:", parseError);
        }
      }
    }

    // Если не удалось получить треки, возвращаем базовые данные
    return basicData;
  } catch (error) {
    console.error("Error fetching Songsterr data:", error);
    throw new Error(
      `Failed to fetch song data from Songsterr: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Определяет тип гитарного трека из названия инструмента
 * @param instrument Название инструмента из Songsterr
 * @returns Тип трека или null
 */
function detectGuitarType(instrument: string): string | null {
  const lowerInstrument = instrument.toLowerCase();

  if (lowerInstrument.includes("rhythm") || lowerInstrument.includes("ритм")) {
    return "Rhythm";
  }
  if (lowerInstrument.includes("lead") || lowerInstrument.includes("соло")) {
    return "Lead";
  }
  if (lowerInstrument.includes("solo")) {
    return "Solo";
  }
  if (
    lowerInstrument.includes("guitar") ||
    lowerInstrument.includes("гитара")
  ) {
    return "Rhythm"; // по умолчанию считаем ритм-гитарой
  }

  return null;
}

export interface SongsterrPromptResult {
  prompt: string;
  metadata: {
    artist: string;
    title: string;
    trackType: string;
    trackName?: string;
  };
}

/**
 * Формирует финальный промпт с AI-сгенерированной частью трека
 * @param metadata Метаданные трека
 * @param suggestedPart AI-сгенерированное название части
 * @returns Промпт в формате "Artist Song TrackType Guitar SuggestedPart"
 */
export function buildFinalPrompt(
  metadata: {
    artist: string;
    title: string;
    trackType: string;
  },
  suggestedPart: string,
): string {
  return `${metadata.artist} ${metadata.title} ${metadata.trackType} Guitar ${suggestedPart}`;
}

/**
 * Формирует промпт для генератора из данных Songsterr
 * @param songData Данные о песне из Songsterr
 * @param trackType Опциональный тип трека (Rhythm/Solo/Lead). Если не указан, выбирается автоматически
 * @param specificTrackId Опциональный ID конкретного трека (partId из URL)
 * @returns Промпт в формате "Artist Song Part Guitar Detail"
 */
export function buildPromptFromSongsterr(
  songData: SongsterrSongData,
  trackType?: string,
  specificTrackId?: number | null,
): string {
  const artist = songData.artist;
  const title = songData.title;

  // Если trackType не указан, определяем автоматически
  let guitarType = trackType;

  if (!guitarType && songData.tracks && songData.tracks.length > 0) {
    // Фильтруем гитарные треки
    const guitarTracks = songData.tracks.filter((t) => t.isGuitar);

    if (guitarTracks.length > 0) {
      let selectedTrack: SongsterrTrack | undefined;

      // Если указан конкретный trackId из URL, используем его
      if (specificTrackId !== undefined && specificTrackId !== null) {
        selectedTrack = guitarTracks.find((t) => t.partId === specificTrackId);
        if (selectedTrack) {
          console.log(
            `🎯 Выбран конкретный трек из URL (partId=${String(specificTrackId)}): "${selectedTrack.title}"`,
          );
        }
      }

      // Если трек не найден или не указан, берем самый популярный
      if (!selectedTrack) {
        // popularTrackGuitar - это partId самого популярного трека, а не индекс
        const popularPartId =
          songData.popularTrackGuitar !== undefined
            ? songData.popularTrackGuitar
            : (guitarTracks[0]?.partId ?? 0);

        selectedTrack = guitarTracks.find((t) => t.partId === popularPartId);

        // Если не нашли по popularPartId, берем с максимальными просмотрами
        if (!selectedTrack) {
          selectedTrack = guitarTracks.reduce((prev, current) =>
            current.views > prev.views ? current : prev,
          );
        }

        console.log(
          `⭐ Автоматически выбран самый популярный трек: "${selectedTrack.title}" (${String(selectedTrack.views)} просмотров)`,
        );
      }

      // Определяем тип трека по его названию
      const trackName = selectedTrack.title.toLowerCase();

      if (trackName.includes("lead")) {
        guitarType = "Lead";
      } else if (trackName.includes("solo")) {
        guitarType = "Solo";
      } else if (trackName.includes("rhythm")) {
        guitarType = "Rhythm";
      } else if (trackName.includes("background")) {
        guitarType = "Rhythm";
      } else {
        // Определяем по позиции или дефолт
        guitarType = selectedTrack.partId <= 1 ? "Rhythm" : "Lead";
      }

      console.log(`   Определенный тип: ${guitarType}`);
    }
  }

  // По умолчанию используем Rhythm
  if (!guitarType) {
    guitarType = "Rhythm";
  }

  // Формируем промпт в формате: "Artist Song Part Guitar Detail"
  // Например: "Metallica Enter Sandman Rhythm Guitar Main Riff"
  const prompt = `${artist} ${title} ${guitarType} Guitar Main Riff`;

  return prompt;
}

/**
 * Формирует промпт и метаданные для генератора из данных Songsterr
 * @param songData Данные о песне из Songsterr
 * @param trackType Опциональный тип трека (Rhythm/Solo/Lead)
 * @param specificTrackId Опциональный ID конкретного трека (partId из URL)
 * @returns Объект с промптом и метаданными
 */
export function buildPromptWithMetadata(
  songData: SongsterrSongData,
  trackType?: string,
  specificTrackId?: number | null,
): SongsterrPromptResult {
  const artist = songData.artist;
  const title = songData.title;

  // Если trackType не указан, определяем автоматически
  let guitarType = trackType;
  let selectedTrackName: string | undefined;

  if (!guitarType && songData.tracks && songData.tracks.length > 0) {
    // Фильтруем гитарные треки
    const guitarTracks = songData.tracks.filter((t) => t.isGuitar);

    if (guitarTracks.length > 0) {
      let selectedTrack: SongsterrTrack | undefined;

      // Если указан конкретный trackId из URL, используем его
      if (specificTrackId !== undefined && specificTrackId !== null) {
        selectedTrack = guitarTracks.find((t) => t.partId === specificTrackId);
      }

      // Если трек не найден или не указан, берем самый популярный
      if (!selectedTrack) {
        const popularPartId =
          songData.popularTrackGuitar !== undefined
            ? songData.popularTrackGuitar
            : (guitarTracks[0]?.partId ?? 0);

        selectedTrack = guitarTracks.find((t) => t.partId === popularPartId);

        if (!selectedTrack) {
          selectedTrack = guitarTracks.reduce((prev, current) =>
            current.views > prev.views ? current : prev,
          );
        }
      }

      // Сохраняем название трека
      selectedTrackName = selectedTrack.title;

      // Определяем тип трека по его названию
      const trackName = selectedTrack.title.toLowerCase();

      if (trackName.includes("lead")) {
        guitarType = "Lead";
      } else if (trackName.includes("solo")) {
        guitarType = "Solo";
      } else if (trackName.includes("rhythm")) {
        guitarType = "Rhythm";
      } else if (trackName.includes("background")) {
        guitarType = "Rhythm";
      } else {
        guitarType = selectedTrack.partId <= 1 ? "Rhythm" : "Lead";
      }
    }
  }

  // По умолчанию используем Rhythm
  if (!guitarType) {
    guitarType = "Rhythm";
  }

  // Формируем промпт
  const prompt = `${artist} ${title} ${guitarType} Guitar Main Riff`;

  return {
    prompt,
    metadata: {
      artist,
      title,
      trackType: guitarType,
      ...(selectedTrackName ? { trackName: selectedTrackName } : {}),
    },
  };
}

/**
 * Получает список доступных гитарных треков из данных Songsterr
 * @param songData Данные о песне
 * @returns Массив объектов с информацией о гитарных треках
 */
export function getAvailableGuitarTracks(songData: SongsterrSongData): Array<{
  id: number;
  name: string;
  type: string | null;
}> {
  if (!songData.tracks || songData.tracks.length === 0) {
    return [];
  }

  return songData.tracks
    .map((track) => ({
      id: track.partId,
      name: track.name,
      type: detectGuitarType(track.instrument),
    }))
    .filter((track) => track.type !== null);
}
