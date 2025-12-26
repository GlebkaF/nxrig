/**
 * Утилиты для маппинга типа трека в часть песни
 */

/**
 * Базовый маппинг типа трека в часть песни
 * @param trackType Тип трека: "Rhythm", "Lead", "Solo"
 * @returns Название части песни для базы пресетов
 */
export function mapTrackTypeToPart(trackType: string): string {
  switch (trackType) {
    case "Solo":
      return "Solo";
    case "Rhythm":
    case "Lead":
      return "Main Riff";
    default:
      return "Main Riff";
  }
}

/**
 * Умный маппинг с анализом названия трека
 * @param trackType Тип трека: "Rhythm", "Lead", "Solo"
 * @param trackName Полное название трека (например: "Angus Young | Gibson SG Standard | Lead Guitar")
 * @returns Название части песни с учетом контекста
 */
export function smartMapToPart(trackType: string, trackName?: string): string {
  if (!trackName) {
    return mapTrackTypeToPart(trackType);
  }

  const lower = trackName.toLowerCase();

  // Приоритет: явные упоминания в названии трека
  if (lower.includes("intro")) return "Intro";
  if (lower.includes("outro")) return "Outro";
  if (lower.includes("solo")) return "Solo";
  if (lower.includes("verse")) return "Verse";
  if (lower.includes("chorus")) return "Chorus";
  if (lower.includes("bridge")) return "Bridge";
  if (lower.includes("riff")) return "Main Riff";

  // Fallback к базовому маппингу по типу трека
  return mapTrackTypeToPart(trackType);
}

/**
 * Список рекомендуемых значений для поля "part" (по частоте использования в базе)
 */
export const RECOMMENDED_PARTS = [
  "Intro", // 25 - самое популярное
  "Solo", // 18
  "Main Riff", // 13
  "Verse",
  "Chorus",
  "Outro",
  "Whole Song",
  "Bridge",
] as const;

export type RecommendedPart = (typeof RECOMMENDED_PARTS)[number];
