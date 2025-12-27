import { createOpenAIClient } from "../ai-generator/helpers/create-openai-client";
import { smartMapToPart } from "./track-mapping";

/**
 * Рекомендуемые значения для названия части песни (как референсы для AI)
 * Не используется в коде, но служит документацией
 */
// const REFERENCE_PARTS = [
//   "Intro",
//   "Solo",
//   "Main Riff",
//   "Verse",
//   "Chorus",
//   "Outro",
//   "Bridge",
//   "Whole Song",
// ] as const;

/**
 * Генерирует полный промпт для генератора с помощью AI (GPT-4 mini)
 * AI имеет полную свободу формулировки
 * @param data Данные о треке из Songsterr
 * @returns Полный промпт для генератора
 */
export async function generateFullPrompt(data: {
  artist: string;
  title: string;
  trackType: string;
  trackName?: string;
}): Promise<string> {
  try {
    const openai = await createOpenAIClient();

    const prompt = buildFullPromptSystemPrompt(data);
    console.log("🤖 Calling GPT-4 mini for full prompt generation...");

    const completion = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Ты эксперт по гитарным эффектам и звукам. Формулируй промпты четко и кратко для генератора эффектов.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 50,
      },
      {
        timeout: 10000, // 10 секунд
      },
    );

    const response = completion.choices[0]?.message.content?.trim();

    if (!response) {
      throw new Error("Empty response from AI");
    }

    console.log(`🤖 AI generated prompt: "${response}"`);

    // Базовая валидация
    if (!isValidPrompt(response)) {
      throw new Error(`Invalid AI prompt response: "${response}"`);
    }

    return response;
  } catch (error) {
    console.error("❌ AI prompt generation failed:", error);
    throw error; // Без fallback - просто пробрасываем ошибку
  }
}

/**
 * Генерирует название части трека с помощью AI (GPT-4 mini)
 * @param data Данные о треке из Songsterr
 * @returns Название части трека
 * @deprecated Используйте generateFullPrompt() для генерации полного промпта
 */
export async function generateTrackPartName(data: {
  artist: string;
  title: string;
  trackType: string;
  trackName?: string;
}): Promise<string> {
  try {
    const openai = await createOpenAIClient();

    const prompt = buildPrompt(data);
    console.log("🤖 Calling GPT-4 mini for track part classification...");

    const completion = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Ты эксперт в классификации гитарных партий. Определи название части песни на основе контекста. Отвечай кратко и точно (1-3 слова), без дополнительных объяснений.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 20,
      },
      {
        timeout: 10000, // 10 секунд
      },
    );

    const response = completion.choices[0]?.message.content?.trim();

    if (!response) {
      throw new Error("Empty response from AI");
    }

    console.log(`🤖 AI response: "${response}"`);

    // Базовая валидация ответа
    if (isValidResponse(response)) {
      console.log(`✅ AI suggested part: "${response}"`);
      return response;
    }

    // Если ответ невалидный, используем fallback
    console.warn(
      `⚠️ Invalid AI response: "${response}", using fallback mapping`,
    );
    return smartMapToPart(data.trackType, data.trackName);
  } catch (error) {
    console.error("❌ AI generation failed:", error);
    // Fallback к старому маппингу
    const fallbackPart = smartMapToPart(data.trackType, data.trackName);
    console.log(`🔄 Using fallback mapping: "${fallbackPart}"`);
    return fallbackPart;
  }
}

/**
 * Формирует промпт для генерации полного промпта
 */
function buildFullPromptSystemPrompt(data: {
  artist: string;
  title: string;
  trackType: string;
  trackName?: string;
}): string {
  const trackNameInfo = data.trackName
    ? `\n- Название трека: ${data.trackName}`
    : "";

  return `Дана информация о треке:
- Артист: ${data.artist}
- Песня: ${data.title}
- Тип трека: ${data.trackType} (Rhythm/Lead/Solo)${trackNameInfo}

Сформулируй ТОЧНЫЙ И КРАТКИЙ промпт для генератора гитарных эффектов.
Промпт должен описывать звук/стиль этой конкретной гитарной партии.

Примеры хороших промптов:
- "Metallica Enter Sandman Rhythm Guitar Main Riff"
- "AC/DC Back in Black Lead Guitar Opening"
- "Pink Floyd Comfortably Numb Solo Guitar"

Формулируй как хочешь, главное - четко и кратко (максимум 10 слов).
Верни ТОЛЬКО промпт, без кавычек и объяснений.`;
}

/**
 * Формирует промпт для AI (старая версия для generateTrackPartName)
 */
function buildPrompt(data: {
  artist: string;
  title: string;
  trackType: string;
  trackName?: string;
}): string {
  const trackNameInfo = data.trackName
    ? `\n- Название трека: ${data.trackName}`
    : "";

  return `Дана информация о треке из Songsterr:
- Артист: ${data.artist}
- Песня: ${data.title}
- Тип трека: ${data.trackType} (Rhythm/Lead/Solo)${trackNameInfo}

Определи, какая это часть песни. Популярные варианты (можешь использовать другие, если подходит):
"Intro", "Solo", "Main Riff", "Verse", "Chorus", "Outro", "Bridge", "Whole Song", "Pre-Chorus", "Breakdown", "Interlude"

Верни ТОЛЬКО название части (1-3 слова), без объяснений и кавычек.`;
}

/**
 * Валидация полного промпта от AI
 * @param response Ответ от AI
 * @returns true если промпт валидный
 */
function isValidPrompt(response: string): boolean {
  const normalized = response.trim().replace(/["""]/g, "");

  // Проверка на пустой ответ
  if (!normalized || normalized.length === 0) {
    return false;
  }

  // Проверка на разумную длину (3-100 символов)
  if (normalized.length < 3 || normalized.length > 100) {
    return false;
  }

  // Проверка на отсутствие явных ошибок/отказов
  const lowerResponse = normalized.toLowerCase();
  if (
    lowerResponse.includes("sorry") ||
    lowerResponse.includes("cannot") ||
    lowerResponse.includes("unable") ||
    lowerResponse.includes("не могу") ||
    lowerResponse.includes("невозможно")
  ) {
    return false;
  }

  return true;
}

/**
 * Базовая валидация ответа AI (старая версия)
 * @param response Ответ от AI
 * @returns true если ответ разумный, false если нет
 */
function isValidResponse(response: string): boolean {
  const normalized = response.trim().replace(/["""]/g, "");

  // Проверка на пустой ответ
  if (!normalized || normalized.length === 0) {
    return false;
  }

  // Проверка на разумную длину (не более 50 символов)
  if (normalized.length > 50) {
    return false;
  }

  // Проверка на отсутствие предложений (не должно быть точек, вопросов)
  if (
    normalized.includes(".") ||
    normalized.includes("?") ||
    normalized.includes("!")
  ) {
    return false;
  }

  // Проверка на отсутствие явных ошибок/отказов
  const lowerResponse = normalized.toLowerCase();
  if (
    lowerResponse.includes("sorry") ||
    lowerResponse.includes("cannot") ||
    lowerResponse.includes("unable") ||
    lowerResponse.includes("не могу") ||
    lowerResponse.includes("невозможно")
  ) {
    return false;
  }

  return true;
}
