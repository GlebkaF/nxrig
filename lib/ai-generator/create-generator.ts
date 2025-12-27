import { Chain } from "../core/interface";
import OpenAI from "openai";
import { createOpenAIClient } from "lib/ai-generator/helpers/create-openai-client";
import {
  BlockTypesConfig,
  createEmptyChain,
} from "lib/core/helpers/create-chain";
import { generationDb } from "../jsondb";

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
  preferred_pickup: string;
}

interface RealRig {
  pedalboard: string[];
  amplifier: string;
  cabinet: string;
  settings: unknown;
}

class ChainGenerator {
  constructor(private openai: OpenAI) {}

  async generate(
    prompt: string,
    songsterrUrl?: string,
    songsterrMetadata?: {
      artist: string;
      title: string;
      trackType: string;
      trackName?: string;
      suggestedPart: string;
    },
  ): Promise<string> {
    const proDescription = await this.createProDescription(prompt);
    const realRig = await this.createRealRig(proDescription);
    const emptyChain = await this.createEmptyChain(realRig);
    const finalChain = await this.createFinalChain(emptyChain, proDescription);

    console.log(proDescription);
    console.log(realRig);

    // Сохраняем результаты в базу данных
    const now = new Date().toISOString();

    const dataToSave: {
      timestamp: string;
      originalPrompt: string;
      proDescription: ProDescription;
      realRig: RealRig;
      finalChain: Chain;
      versions: Array<{ chain: Chain; prompt: string; timestamp: string }>;
      songsterrData?: {
        url: string;
        artist: string;
        title: string;
        trackType: string;
        trackName?: string;
        suggestedPart: string;
      };
    } = {
      timestamp: now,
      originalPrompt: prompt,
      proDescription,
      realRig,
      finalChain,
      versions: [
        {
          chain: finalChain,
          prompt,
          timestamp: now,
        },
      ],
    };

    if (songsterrUrl && songsterrMetadata) {
      dataToSave.songsterrData = {
        url: songsterrUrl,
        artist: songsterrMetadata.artist,
        title: songsterrMetadata.title,
        trackType: songsterrMetadata.trackType,
        suggestedPart: songsterrMetadata.suggestedPart,
        ...(songsterrMetadata.trackName
          ? { trackName: songsterrMetadata.trackName }
          : {}),
      };
    }

    const generationId = await this.saveToDatabase(dataToSave);

    return generationId;
  }

  private async createProDescription(prompt: string): Promise<ProDescription> {
    const completion = await this.createJsonCompletion(
      createProDescriptionSystemPrompt(),
      prompt,
    );

    return completion as ProDescription;
  }

  private async createEmptyChain(realRig: RealRig): Promise<Chain> {
    const completion = await this.createJsonCompletion(
      createRealRigToBlocksSystemPrompt(),
      JSON.stringify(realRig),
    );

    const config = completion as BlockTypesConfig;

    // console.log(completion)
    const emptyChain = createEmptyChain(config);

    return Promise.resolve(emptyChain);
  }

  private async createRealRig(
    proDescription: ProDescription,
  ): Promise<RealRig> {
    const completion = await this.createJsonCompletion(
      createRealRigSystemPrompt(),
      JSON.stringify(proDescription),
    );

    return completion as RealRig;
  }

  private async createFinalChain(
    emptyChain: Chain,
    proDescription: ProDescription,
  ): Promise<Chain> {
    const completion = await this.createJsonCompletion(
      createProperChainSystemPrompt(
        emptyChain,
        JSON.stringify(proDescription, null, 2),
      ),
      "",
    );

    return completion as Chain;
  }

  private async createJsonCompletion(
    systemPrompt: string,
    userPrompt: string,
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

  private async saveToDatabase(result: {
    timestamp: string;
    originalPrompt: string;
    proDescription: ProDescription;
    realRig: RealRig;
    finalChain: Chain;
    versions: Array<{ chain: Chain; prompt: string; timestamp: string }>;
    songsterrData?: {
      url: string;
      artist: string;
      title: string;
      trackType: string;
      trackName?: string;
      suggestedPart: string;
    };
  }): Promise<string> {
    try {
      const generationId = await generationDb.addGeneration(result);
      return generationId;
    } catch (error) {
      console.error("❌ Ошибка при сохранении в базу данных:", error);
      throw error;
    }
  }
}

export const createGenerator = async (): Promise<ChainGenerator> => {
  const client = await createOpenAIClient();
  return new ChainGenerator(client);
};
