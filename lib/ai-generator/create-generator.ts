// import { createDefaultChain } from "lib/core/helpers/create-default-chain";
import { Chain } from "../core/interface";
import OpenAI from "openai";
import { createOpenAIClient } from "lib/ai-generator/helpers/create-openai-client";
import {
  BlockTypesConfig,
  createEmptyChain,
} from "lib/core/helpers/create-chain";
import fs from "fs/promises";
import path from "path";

import {
  createProDescriptionSystemPrompt,
  createRealRigSystemPrompt,
  createRealRigToBlocksSystemPrompt,
  createProperChainSystemPrompt,
} from "lib/ai-generator/prompt/prompts";

const GPT_41_MODEL = "gpt-4.1";

interface ProDescription {
  genre: string;
  sound_description: string;
  guitar_rig_description: string;
  references: string[];
  additional_info: string;
}

interface RealRig {
  pedalboard: string[];
  amplifier: string;
  cabinet: string;
  settings: unknown;
}

interface GeneratorResult {
  timestamp: string;
  originalPrompt: string;
  proDescription: ProDescription;
  realRig: RealRig;

  finalChain: Chain;
}

class ChainGenerator {
  constructor(private openai: OpenAI) {}

  async generate(prompt: string): Promise<Chain> {
    const proDescription = await this.createProDescription(prompt);
    const realRig = await this.createRealRig(proDescription);
    const emptyChain = await this.createEmptyChain(realRig);
    const finalChain = await this.createFinalChain(emptyChain, proDescription);

    console.log(proDescription);
    console.log(realRig);

    // Сохраняем результаты в файл
    await this.saveResults({
      timestamp: new Date().toISOString(),
      originalPrompt: prompt,
      proDescription,
      realRig,
      finalChain,
    });

    return finalChain;
  }

  private async createProDescription(prompt: string): Promise<ProDescription> {
    const completion = await this.createJsonCompletion(
      createProDescriptionSystemPrompt(),
      prompt
    );

    return completion as ProDescription;
  }

  private async createEmptyChain(realRig: RealRig): Promise<Chain> {
    const completion = await this.createJsonCompletion(
      createRealRigToBlocksSystemPrompt(),
      JSON.stringify(realRig)
    );

    const config = completion as BlockTypesConfig;

    // console.log(completion);

    // const noisegate = completion.noisegate
    //   ? parseEnum(NoiseGateType, completion.noisegate)
    //   : null;
    // const effect = completion.effect
    //   ? parseEnum(EffectType, completion.effect)
    //   : null;
    // const amplifier = completion.amplifier
    //   ? parseEnum(AmplifierType, completion.amplifier)
    //   : null;
    // const cabinet = completion.cabinet
    //   ? parseEnum(CabinetType, completion.cabinet)
    //   : null;
    // const eq = completion.eq ? parseEnum(EqType, completion.eq) : null;

    const emptyChain = createEmptyChain(config);

    return Promise.resolve(emptyChain);
  }

  private async createRealRig(
    proDescription: ProDescription
  ): Promise<RealRig> {
    const completion = await this.createJsonCompletion(
      createRealRigSystemPrompt(),
      JSON.stringify(proDescription)
    );

    return completion as RealRig;
  }

  private async createFinalChain(
    emptyChain: Chain,
    proDescription: ProDescription
  ): Promise<Chain> {
    const completion = await this.createJsonCompletion(
      createProperChainSystemPrompt(
        emptyChain,
        JSON.stringify(proDescription, null, 2)
      ),
      ""
    );

    return completion as Chain;
  }

  private async createJsonCompletion(
    systemPrompt: string,
    userPrompt: string
  ): Promise<unknown> {
    const completion = await this.openai.chat.completions.create({
      model: GPT_41_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message.content;
    if (!responseText) {
      throw new Error("No response from OpenAI");
    }

    return JSON.parse(responseText) as unknown;
  }

  private async saveResults(result: GeneratorResult): Promise<void> {
    try {
      // Создаём директорию для результатов, если её нет
      const resultsDir = path.join(process.cwd(), "generator-results");
      await fs.mkdir(resultsDir, { recursive: true });

      // Формируем имя файла с временной меткой
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, -5); // Убираем миллисекунды и Z
      const filename = `chain-generation-${timestamp}.json`;
      const filepath = path.join(resultsDir, filename);

      // Сохраняем результаты в файл
      await fs.writeFile(filepath, JSON.stringify(result, null, 2), "utf-8");

      console.log(`\n✅ Результаты сохранены в: ${filepath}`);
    } catch (error) {
      console.error("❌ Ошибка при сохранении результатов:", error);
      // Не прерываем выполнение, если сохранение не удалось
    }
  }
}

export const createGenerator = async (): Promise<ChainGenerator> => {
  const client = await createOpenAIClient();
  return new ChainGenerator(client);
};
