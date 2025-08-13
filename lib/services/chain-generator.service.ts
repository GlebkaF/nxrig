import OpenAI from "openai";
import { Chain } from "../core/interface";
import { createDefaultChain } from "../core/helpers/create-default-chain";

export interface ChainGeneratorConfig {
  apiKey?: string;
  model?: string;
  proxyUrl?: string;
}

export interface GenerationResult {
  chain: Chain;
  isAiGenerated: boolean;
  error?: string;
}

/**
 * Сервис для генерации Chain на основе текстового описания
 */
export class ChainGeneratorService {
  private config: ChainGeneratorConfig;

  constructor(config?: ChainGeneratorConfig) {
    this.config = {
      apiKey: config?.apiKey || process.env.OPENAI_API_KEY,
      model: config?.model || process.env.OPENAI_MODEL || "gpt-4o-mini",
      proxyUrl: config?.proxyUrl || process.env.PROXY_URL,
    };
  }

  /**
   * Генерирует Chain на основе промпта
   * @param prompt - Описание желаемого звука
   * @returns Chain и флаг, был ли он сгенерирован AI
   */
  async generateChain(prompt: string): Promise<GenerationResult> {
    // Если нет API ключа, возвращаем default chain
    if (!this.config.apiKey) {
      console.log("OpenAI API key not found, returning default chain");
      return {
        chain: createDefaultChain(),
        isAiGenerated: false,
      };
    }

    try {
      const aiChain = await this.generateWithAI(prompt);

      if (aiChain) {
        console.log("Successfully generated AI chain");
        return {
          chain: aiChain,
          isAiGenerated: true,
        };
      }
    } catch (error) {
      console.error("Error generating chain with AI:", error);
    }

    // Fallback на default chain
    console.log("Using default chain (AI generation failed)");
    return {
      chain: createDefaultChain(),
      isAiGenerated: false,
    };
  }

  /**
   * Внутренний метод для генерации через OpenAI
   */
  private async generateWithAI(prompt: string): Promise<Chain | null> {
    const openai = await this.createOpenAIClient();
    const systemPrompt = this.createSystemPrompt();

    console.log("Calling OpenAI API...");
    console.log("Using model:", this.config.model);

    const completion = await openai.chat.completions.create({
      model: this.config.model!,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Create a guitar effects chain for: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      console.log("No response from OpenAI");
      return null;
    }

    // Парсим и валидируем ответ
    const chain = this.parseResponse(responseText);
    if (!chain) {
      return null;
    }

    // Корректируем типы
    this.correctTypes(chain);

    // Валидируем структуру
    if (!this.validateChain(chain)) {
      return null;
    }

    return chain;
  }

  /**
   * Создаёт клиент OpenAI с настройками прокси
   */
  private async createOpenAIClient(): Promise<OpenAI> {
    const { HttpsProxyAgent } = await import("https-proxy-agent");
    const fetch = (await import("node-fetch")).default;

    console.log("Using proxy:", this.config.proxyUrl);
    const proxyAgent = new HttpsProxyAgent(this.config.proxyUrl!);

    return new OpenAI({
      apiKey: this.config.apiKey!,
      fetch: async (url: string, init?: any) => {
        console.log("Making request through proxy to:", url);
        return fetch(url, {
          ...init,
          agent: proxyAgent,
        });
      },
    });
  }

  /**
   * Создаёт системный промпт для OpenAI
   */
  private createSystemPrompt(): string {
    return `You are a guitar effects chain expert. Generate a JSON configuration for a guitar effects chain based on the user's description.

You MUST return a complete JSON object with ALL 9 blocks (even if disabled). The root object MUST contain these exact keys:

{
  "noisegate": { "type": "Noise Gate", "enabled": true/false, "params": { "Sensitivity": 0-100, "Decay": 0-100 } },
  "compressor": { "type": "K Comp", "enabled": true/false, "params": { "Level": 0-100, "Sustain": 0-100, "Clipping": 0-100 } },
  "modulation": { "type": "CE-1", "enabled": true/false, "params": { "Rate": 0-100, "Depth": 0-100, "Intensity": 0-100 } },
  "effect": { "type": "Distortion+", "enabled": true/false, "params": { "Output": 0-100, "Sensitivity": 0-100 } },
  "amplifier": { "type": "Jazz Clean", "enabled": true/false, "params": { "Gain": 0-100, "Master": 0-100, "Bass": 0-100, "Middle": 0-100, "Treble": 0-100, "Bright": 0-100 } },
  "cabinet": { "type": "JZ120", "enabled": true/false, "params": { "Level": 0-100, "LowCut": 0-100, "HighCut": 0-100 } },
  "eq": { "type": "6-Band", "enabled": true/false, "params": { "100": 0-100, "220": 0-100, "500": 0-100, "1200": 0-100, "2600": 0-100, "6400": 0-100 } },
  "reverb": { "type": "Room", "enabled": true/false, "params": { "Level": 0-100, "Decay": 0-100, "Tone": 0-100 } },
  "delay": { "type": "Analog Delay", "enabled": true/false, "params": { "Intensity": 0-100, "Rate": 0-100, "Echo": 0-100 } }
}

Available types and their parameters (use EXACT type names):
- noisegate: "Noise Gate" (Sensitivity, Decay)
- compressor: "K Comp" or "Compressor" (Level, Sustain, Clipping)
- modulation: "CE-1", "Phaser", "Tremolo", "Vibrato" (Rate, Depth, Intensity)
- effect: "Distortion+", "Overdrive", "Fuzz", "Metal Zone" (Output, Sensitivity)
- amplifier: "Jazz Clean", "Twin Reverb", "British Stack", "Modern" (Gain, Master, Bass, Middle, Treble, Bright)
- cabinet: "JZ120", "Twin 2x12", "Marshall 4x12", "Mesa 4x12" (Level, LowCut, HighCut)
- eq: "6-Band" (100, 220, 500, 1200, 2600, 6400)
- reverb: "Room", "Hall", "Spring", "Plate" (Level, Decay, Tone)
- delay: "Analog Delay", "Digital Delay", "Tape Echo" (Intensity, Rate, Echo)

Return ONLY valid JSON, no explanations.`;
  }

  /**
   * Парсит ответ от OpenAI, очищая от markdown
   */
  private parseResponse(responseText: string): Chain | null {
    console.log("Raw OpenAI response:", responseText);

    // Очищаем от markdown форматирования
    let cleanedResponse = responseText;
    if (responseText.includes("```json")) {
      cleanedResponse = responseText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "");
      console.log("Cleaned markdown formatting from response");
    } else if (responseText.includes("```")) {
      cleanedResponse = responseText.replace(/```\s*/g, "");
      console.log("Cleaned code blocks from response");
    }

    try {
      const chain = JSON.parse(cleanedResponse) as Chain;
      console.log("Successfully parsed AI response");
      return chain;
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.log("Response that failed to parse:", cleanedResponse);
      return null;
    }
  }

  /**
   * Корректирует типы эффектов, которые GPT может вернуть в неправильном формате
   */
  private correctTypes(chain: Chain): void {
    const typeCorrections: Record<string, string> = {
      NoiseGate: "Noise Gate",
      KComp: "K Comp",
      "K Comp/Compressor": "K Comp",
      "KComp/Compressor": "K Comp",
      CE1: "CE-1",
      DistortionPlus: "Distortion+",
      "Distortion Plus": "Distortion+",
      MetalZone: "Metal Zone",
      JazzClean: "Jazz Clean",
      TwinReverb: "Twin Reverb",
      BritishStack: "British Stack",
      Twin212: "Twin 2x12",
      "Twin 212": "Twin 2x12",
      Marshall412: "Marshall 4x12",
      "Marshall 412": "Marshall 4x12",
      Mesa412: "Mesa 4x12",
      "Mesa 412": "Mesa 4x12",
      SixBand: "6-Band",
      "6Band": "6-Band",
      AnalogDelay: "Analog Delay",
      DigitalDelay: "Digital Delay",
      TapeEcho: "Tape Echo",
    };

    Object.keys(chain).forEach((block) => {
      const blockData = (chain as any)[block];
      if (blockData?.type && typeCorrections[blockData.type]) {
        console.log(
          `Correcting type: ${blockData.type} -> ${typeCorrections[blockData.type]}`
        );
        blockData.type = typeCorrections[blockData.type];
      }
    });
  }

  /**
   * Валидирует структуру Chain
   */
  private validateChain(chain: any): boolean {
    const requiredBlocks = [
      "noisegate",
      "compressor",
      "modulation",
      "effect",
      "amplifier",
      "cabinet",
      "eq",
      "reverb",
      "delay",
    ];

    const hasAllBlocks = requiredBlocks.every((block) => block in chain);

    if (!hasAllBlocks) {
      console.log("AI response missing required blocks");
      console.log("Found blocks:", Object.keys(chain));
      console.log(
        "Missing blocks:",
        requiredBlocks.filter((block) => !(block in chain))
      );
      return false;
    }

    console.log("AI Chain validated successfully");
    return true;
  }
}
