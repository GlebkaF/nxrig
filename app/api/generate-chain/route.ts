import { NextResponse } from "next/server";
import { createGenerator } from "../../../lib/ai-generator/create-generator";
// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

interface GenerateChainRequest {
  prompt: string;
}

interface GenerateChainResponse {
  generationId: string;
  message: string;
}

interface ErrorResponse {
  error: string;
}

/**
 * API endpoint для генерации Chain на основе текстового описания
 * POST /api/generate-chain
 * Body: { prompt: string }
 */
export async function POST(
  request: Request
): Promise<NextResponse<GenerateChainResponse | ErrorResponse>> {
  try {
    // Получаем prompt из тела запроса
    const { prompt } = (await request.json()) as GenerateChainRequest;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const generator = await createGenerator();
    const generationId = await generator.generate(prompt);

    // Формируем ответ
    const response: GenerateChainResponse = {
      generationId,
      message: "Generation created successfully",
    };

    // Отправляем ответ
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in generate-chain API:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
