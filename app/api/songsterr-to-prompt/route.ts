import { NextResponse } from "next/server";
import {
  extractSongsterrId,
  fetchSongsterrData,
  buildPromptWithMetadata,
} from "../../../lib/utils/songsterr";
import { generateFullPrompt } from "../../../lib/utils/track-name-generator";

// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

interface SongsterrToPromptRequest {
  songsterrUrl: string;
  trackType?: string; // "Rhythm" | "Solo" | "Lead"
}

interface SongsterrToPromptResponse {
  prompt: string;
  metadata: {
    url: string;
    artist: string;
    title: string;
    trackType: string;
    trackName?: string;
    suggestedPart: string;
  };
}

interface ErrorResponse {
  error: string;
}

/**
 * API endpoint для генерации промпта из ссылки Songsterr
 * POST /api/songsterr-to-prompt
 * Body: { songsterrUrl: string, trackType?: string }
 */
export async function POST(
  request: Request,
): Promise<NextResponse<SongsterrToPromptResponse | ErrorResponse>> {
  try {
    // Получаем данные из тела запроса
    const { songsterrUrl, trackType } =
      (await request.json()) as SongsterrToPromptRequest;

    // Валидация входных данных
    if (!songsterrUrl || typeof songsterrUrl !== "string") {
      return NextResponse.json(
        { error: "songsterrUrl is required" },
        { status: 400 },
      );
    }

    console.log(`🎸 Generating prompt from Songsterr URL: ${songsterrUrl}`);

    // Шаг 1: Извлекаем songId и trackId из URL
    const extracted = extractSongsterrId(songsterrUrl);
    if (!extracted) {
      return NextResponse.json(
        {
          error:
            "Invalid Songsterr URL format. Expected format: https://www.songsterr.com/a/wsa/...-s{songId} or -s{songId}t{trackId}",
        },
        { status: 400 },
      );
    }

    const { songId, trackId } = extracted;
    console.log(
      `📝 Extracted Songsterr ID: ${songId}${trackId !== null ? `, Track: ${String(trackId)}` : ""}`,
    );

    // Шаг 2: Получаем данные о песне из Songsterr API
    let songData;
    try {
      songData = await fetchSongsterrData(songId);
      console.log(
        `🎵 Fetched song data: ${songData.artist} - ${songData.title}`,
      );
    } catch (error) {
      return NextResponse.json(
        {
          error: `Failed to fetch song data from Songsterr: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
        { status: 500 },
      );
    }

    // Шаг 3: Получаем метаданные с учетом конкретного trackId из URL
    const promptResult = buildPromptWithMetadata(songData, trackType, trackId);
    console.log("📊 Metadata:", promptResult.metadata);

    // Шаг 4: Генерируем полный промпт через AI с полной свободой
    const trackNameData: {
      artist: string;
      title: string;
      trackType: string;
      trackName?: string;
    } = {
      artist: promptResult.metadata.artist,
      title: promptResult.metadata.title,
      trackType: promptResult.metadata.trackType,
      ...(promptResult.metadata.trackName
        ? { trackName: promptResult.metadata.trackName }
        : {}),
    };
    const finalPrompt = await generateFullPrompt(trackNameData);
    console.log(`💡 AI generated full prompt: "${finalPrompt}"`);

    // Извлекаем suggestedPart из промпта (простая эвристика для обратной совместимости)
    const words = finalPrompt.split(" ");
    const suggestedPart = words.slice(-3).join(" "); // последние 3 слова

    // Формируем ответ
    const response: SongsterrToPromptResponse = {
      prompt: finalPrompt,
      metadata: {
        url: songsterrUrl,
        artist: promptResult.metadata.artist,
        title: promptResult.metadata.title,
        trackType: promptResult.metadata.trackType,
        suggestedPart,
        ...(promptResult.metadata.trackName
          ? { trackName: promptResult.metadata.trackName }
          : {}),
      },
    };

    console.log(`✅ Prompt generated successfully`);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating prompt from Songsterr:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
