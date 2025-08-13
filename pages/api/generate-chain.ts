import { NextApiRequest, NextApiResponse } from "next";
import { encodeChain } from "../../lib/core/encoder";
import { Chain } from "../../lib/core/interface";
import { ChainGeneratorService } from "../../lib/services/chain-generator.service";

interface GenerateChainRequest {
  prompt: string;
}

interface GenerateChainResponse {
  chain: Chain;
  aiChain?: Chain; // Chain сгенерированный AI (для отладки)
  qrCode: string;
  rawBytes: number[];
  aiGenerated?: boolean; // Флаг, показывающий, был ли использован AI
}

interface ErrorResponse {
  error: string;
}

/**
 * API endpoint для генерации Chain на основе текстового описания
 * POST /api/generate-chain
 * Body: { prompt: string }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateChainResponse | ErrorResponse>
): Promise<void> {
  // Проверяем метод запроса
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Получаем prompt из тела запроса
    const { prompt } = req.body as GenerateChainRequest;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    console.log("Received prompt:", prompt);

    // Создаём сервис генератора
    const generator = new ChainGeneratorService();

    // Генерируем chain
    const result = await generator.generateChain(prompt);

    // Энкодим chain в QR код
    const encoded = encodeChain(result.chain);

    // Формируем ответ
    const response: GenerateChainResponse = {
      chain: result.chain,
      qrCode: encoded.qrCode,
      rawBytes: [...encoded.rawBytes],
      aiGenerated: result.isAiGenerated,
    };

    // Если был сгенерирован AI chain, добавляем его для отладки
    if (result.isAiGenerated) {
      response.aiChain = result.chain;
    }

    // Отправляем ответ
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in generate-chain API:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
