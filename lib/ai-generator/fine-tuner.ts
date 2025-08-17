import OpenAI from "openai";
import { Chain } from "../core/interface";
import { createOpenAIClient } from "lib/ai-generator/helpers/create-openai-client";
import { createFineTuneSystemPrompt } from "lib/ai-generator/prompt/prompts";

const GPT_41_MODEL = "gpt-4.1";

class ChainFineTuner {
  constructor(private openai: OpenAI) {}

  async refine(chain: Chain, feedback: string): Promise<Chain> {
    const completion = await this.openai.chat.completions.create({
      model: GPT_41_MODEL,
      messages: [
        { role: "system", content: createFineTuneSystemPrompt(chain) },
        { role: "user", content: feedback },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message.content;
    if (!responseText) {
      throw new Error("No response from OpenAI");
    }
    return JSON.parse(responseText) as Chain;
  }
}

export const createFineTuner = async (): Promise<ChainFineTuner> => {
  const client = await createOpenAIClient();
  return new ChainFineTuner(client);
};
