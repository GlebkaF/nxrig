import { NextApiRequest, NextApiResponse } from "next";
import { createDefaultChain } from "../../lib/core/helpers/create-default-chain";
import { encodeChain } from "../../lib/core/encoder";
import { Chain } from "../../lib/core/interface";

interface GenerateChainRequest {
  prompt: string;
}

interface GenerateChainResponse {
  chain: Chain;
  qrCode: string;
  rawBytes: number[];
}

interface ErrorResponse {
  error: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateChainResponse | ErrorResponse>
): void {
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

    // В этой итерации всегда возвращаем default chain
    // В будущем здесь будет интеграция с OpenAI
    console.log("Received prompt:", prompt);

    // Создаём default chain
    const chain = createDefaultChain();

    // Энкодим chain в QR код
    const encoded = encodeChain(chain);

    // Отправляем ответ
    res.status(200).json({
      chain,
      qrCode: encoded.qrCode,
      rawBytes: [...encoded.rawBytes],
    });
  } catch (error) {
    console.error("Error generating chain:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
