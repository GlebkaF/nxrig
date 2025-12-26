import { NextResponse } from "next/server";
import { createGenerator } from "../../../lib/ai-generator/create-generator";
import {
  extractSongsterrId,
  fetchSongsterrData,
  buildPromptWithMetadata,
} from "../../../lib/utils/songsterr";

// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

interface GenerateFromSongsterrRequest {
  songsterrUrl: string;
  trackType?: string; // "Rhythm" | "Solo" | "Lead"
}

interface GenerateFromSongsterrResponse {
  generationId: string;
  message: string;
  prompt: string;
  songData: {
    artist: string;
    title: string;
  };
}

interface ErrorResponse {
  error: string;
}

/**
 * API endpoint для генерации Chain на основе ссылки Songsterr
 * POST /api/generate-from-songsterr
 * Body: { songsterrUrl: string, trackType?: string }
 */
export async function POST(
  request: Request,
): Promise<NextResponse<GenerateFromSongsterrResponse | ErrorResponse>> {
  try {
    // Получаем данные из тела запроса
    const { songsterrUrl, trackType } =
      (await request.json()) as GenerateFromSongsterrRequest;

    // Валидация входных данных
    if (!songsterrUrl || typeof songsterrUrl !== "string") {
      return NextResponse.json(
        { error: "songsterrUrl is required" },
        { status: 400 },
      );
    }

    // Шаг 1: Извлекаем ID из URL
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

    // Шаг 3: Формируем промпт с метаданными с учетом конкретного trackId из URL
    const promptResult = buildPromptWithMetadata(songData, trackType, trackId);
    console.log(`💡 Generated prompt: "${promptResult.prompt}"`);
    console.log("📊 Metadata:", promptResult.metadata);

    // Шаг 4: Запускаем генератор с сформированным промптом
    const generator = await createGenerator();
    const generationId: string = await generator.generate(
      promptResult.prompt,
      songsterrUrl,
      promptResult.metadata,
    );

    console.log(`✅ Generation created with ID: ${generationId}`);

    // Формируем ответ
    const response: GenerateFromSongsterrResponse = {
      generationId,
      message: "Generation created successfully from Songsterr URL",
      prompt: promptResult.prompt,
      songData: {
        artist: songData.artist,
        title: songData.title,
      },
    };

    // Отправляем ответ
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in generate-from-songsterr API:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
